import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../../../components/CustomButton';
import {VerticalSpacer} from '../../../../components/Spacer';
import {CustomColors} from '../../../../constants/CustomColors';
import {useClaimStore, ClaimStore} from '../../../../store/claimStore';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import {FileData} from '../../../purchase/form/components/CustomImagePicker';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import {ClaimViewModel} from '../../ClaimViewModel';

interface TravelDocumentMissedDepartureScreenProps {
  formKey: any;
}

const TravelDocumentMissedDepartureScreen: React.FC<
  TravelDocumentMissedDepartureScreenProps
> = ({formKey}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  // State for handling form fields
  const [missedDepartureReason, setMissedDepartureReason] = useState<
    string | null
  >(null);

  const [transporterReport, setTransporterReport] = useState<FileData | null>(
    null,
  );
  const [transporterReportError, setTransporterReportError] = useState<
    string | null
  >(null);

  const [otherReport, setOtherReport] = useState<FileData | null>(null);
  const [otherReportError, setOtherReportError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (transporterReport && otherReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimMissedDepartureDocumentation(
        missedDepartureReason ?? '',
        otherReport,
        transporterReport,
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Tell us the reason for missed departure'}
        hintText={'Tell us the reason for missed departure'}
        maxLines={4}
        value={missedDepartureReason ?? ''}
        control={control}
        onChanged={(text: string) => setMissedDepartureReason(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ClaimImagePicker
        fieldName={'Evidence of cash during the journey'} // '(ATM, receipt, debit alert e.t.c)'
        label={'Evidence of cash during the journey'}
        imageData={transporterReport}
        setImageData={setTransporterReport}
        error={transporterReportError}
        setError={setTransporterReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Evidence from authority handling the private vehicle'}
        label={'Evidence from authority handling the private vehicle'}
        imageData={otherReport}
        setImageData={setOtherReport}
        error={otherReportError}
        setError={setOtherReportError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !missedDepartureReason || !transporterReport || !otherReport
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

export default TravelDocumentMissedDepartureScreen;
