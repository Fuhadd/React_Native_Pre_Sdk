import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import CustomButton from '../../../../components/CustomButton';
import {CustomColors} from '../../../../constants/CustomColors';
import {VerticalSpacer} from '../../../../components/Spacer';
import {ClaimStore, useClaimStore} from '../../../../store/claimStore';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import {FileData} from '../../../purchase/form/components/CustomImagePicker';
import {ClaimViewModel} from '../../ClaimViewModel';

interface TravelDocumentBaggageDelayScreenProps {
  formKey: any;
}

const TravelDocumentBaggageDelayScreen: React.FC<
  TravelDocumentBaggageDelayScreenProps
> = ({formKey}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  const [luggageCost, setLuggageCost] = useState<string | null>(null);

  // State for handling form fields
  const [amount, setAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [irregularityReport, setIrregularityReport] = useState<FileData | null>(
    null,
  );
  const [irregularityReportError, setIrregularityReportError] = useState<
    string | null
  >(null);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (irregularityReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimBaggageDelayDocumentation(
        parseInt(luggageCost?.replace(',', '') ?? '', 10) ?? 0,
        irregularityReport,
      );
      setIsLoading(true);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'Luggage cost'}
        title={'Luggage cost'}
        hintText={'Luggage cost'}
        isNumber={true}
        isCurrency={true}
        value={luggageCost ?? ''}
        control={control}
        onChanged={(text: string) => {
          setLuggageCost(text);
        }}
        // onChangeText={value => setAmount(Number(value.replace(/,/g, '')))}
        minMaxConstraint={'value'}
        minLength={10}
      />

      <ClaimImagePicker
        fieldName={'Property irregularity report'}
        label={'Property irregularity report'}
        imageData={irregularityReport}
        setImageData={setIrregularityReport}
        error={irregularityReportError}
        setError={setIrregularityReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <VerticalSpacer height={120} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !irregularityReport || !luggageCost
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
});

export default TravelDocumentBaggageDelayScreen;
