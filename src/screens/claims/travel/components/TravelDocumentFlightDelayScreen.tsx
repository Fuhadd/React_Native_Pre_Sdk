import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomMiniTimePicker from '../../components/CustomMiniTimePicker';
import {VerticalSpacer} from '../../../../components/Spacer';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import CustomButton from '../../../../components/CustomButton';
import {CustomColors} from '../../../../constants/CustomColors';
import {ClaimStore, useClaimStore} from '../../../../store/claimStore';
import {FileData} from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import {ClaimViewModel} from '../../ClaimViewModel';

interface TravelDocumentFlightDelayScreenProps {
  formKey: any;
}

const TravelDocumentFlightDelayScreen: React.FC<
  TravelDocumentFlightDelayScreenProps
> = ({formKey}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  // State for handling form fields
  const [travelDelayReason, setTravelDelayReason] = useState<string | null>(
    null,
  );

  const [departureTime, setDepartureTime] = useState<Date | null>(null);

  const [delayConfirmation, setDelayConfirmation] = useState<FileData | null>(
    null,
  );
  const [delayConfirmationError, setDelayConfirmationError] = useState<
    string | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (departureTime && delayConfirmation) {
      const selectedTimeString = departureTime?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      await claimVM.submitTravelClaimFLightDelayDocumentation(
        travelDelayReason ?? '',
        selectedTimeString,
        delayConfirmation,
      );
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Reason for departure delay'}
        hintText={'Tell us the reason for departure delay'}
        maxLines={4}
        value={travelDelayReason ?? ''}
        control={control}
        onChanged={(text: string) => setTravelDelayReason(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      {/* <CustomMiniTimePicker
        label="Actual time of departure"
        description="--:-- --"
        isTodayMax={true}
        minDate={12}
        selectedTime={departureTime}
        setSelectedTime={setDepartureTime}
        useIsoDateString={true}
      /> */}

      <CustomMiniTimePicker
        label="Actual time of departure"
        description="--:-- --"
        selectedTime={departureTime}
        setSelectedTime={setDepartureTime}
        //   onTimeChange={function (time: {hour: number; minute: number}) {
        //     console.log(typeof time);
        //     // return setSelectedTime(time);
        //   }}
      />

      <VerticalSpacer height={5} />

      <ClaimImagePicker
        fieldName={'Written document from airline or their handling agent'}
        label={'Written document from airline or their handling agent'}
        imageData={delayConfirmation}
        setImageData={setDelayConfirmation}
        error={delayConfirmationError}
        setError={setDelayConfirmationError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !departureTime || !delayConfirmation || !travelDelayReason
            ? undefined
            : handleSubmit(onSubmit)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: CustomColors.blackTextColor,
  },
  input: {
    borderWidth: 1,
    borderColor: CustomColors.greyTextColor,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  richTextMain: {
    fontSize: 14,
    color: CustomColors.backTextColor,
    lineHeight: 20,
  },
  richTextSub: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
});

export default TravelDocumentFlightDelayScreen;
