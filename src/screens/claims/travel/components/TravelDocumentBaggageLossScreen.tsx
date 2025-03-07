import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form'; // Assuming you have a custom RichText component
import ClaimImagePicker from '../../components/ClaimImagePicker';
import {VerticalSpacer} from '../../../../components/Spacer';
import CustomButton from '../../../../components/CustomButton';
import {CustomColors} from '../../../../constants/CustomColors';
import {ClaimStore, useClaimStore} from '../../../../store/claimStore';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import {FileData} from '../../../purchase/form/components/CustomImagePicker';
import {ClaimViewModel} from '../../ClaimViewModel';

interface TravelDocumentBaggageLossScreenProps {
  formKey: any;
}

const TravelDocumentBaggageLossScreen: React.FC<
  TravelDocumentBaggageLossScreenProps
> = ({formKey}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  // State for handling form fields
  const [amount, setAmount] = useState<number | null>(null);
  //   const [otherReport, setOtherReport] = useState<File | null>(null);

  const [luggageCost, setLuggageCost] = useState<string | null>(null);

  const [purchaseReceipt, setPurchaseReceipt] = useState<FileData | null>(null);
  const [purchaseReceiptError, setPurchaseReceiptError] = useState<
    string | null
  >(null);

  const [policeReport, setPoliceReport] = useState<FileData | null>(null);
  const [policeReportError, setPoliceReportError] = useState<string | null>(
    null,
  );

  const [repairEstimate, setRepairEstimate] = useState<FileData | null>(null);
  const [repairEstimateError, setRepairEstimateError] = useState<string | null>(
    null,
  );

  const [otherReport, setOtherReport] = useState<FileData | null>(null);
  const [otherReportError, setOtherReportError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (purchaseReceipt && policeReport && repairEstimate && otherReport) {
      setIsLoading(true);
      await claimVM.submitTravelClaimBaggageLossDocumentation(
        parseInt(luggageCost?.replace(',', '') ?? '', 10) ?? 0,
        purchaseReceipt,
        policeReport,

        repairEstimate,
        otherReport,
      );

      setIsLoading(false);
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
        fieldName={'Evidence of purchase'}
        label={'Evidence of purchase'}
        imageData={purchaseReceipt}
        setImageData={setPurchaseReceipt}
        error={purchaseReceiptError}
        setError={setPurchaseReceiptError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Police report'}
        label={'Police report'}
        imageData={policeReport}
        setImageData={setPoliceReport}
        error={policeReportError}
        setError={setPoliceReportError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Written report from hotel / apartment manager'}
        label={'Written report from hotel / apartment manager'}
        imageData={repairEstimate}
        setImageData={setRepairEstimate}
        error={repairEstimateError}
        setError={setRepairEstimateError}
        required={true}
      />

      <VerticalSpacer height={10} />

      <ClaimImagePicker
        fieldName={'Estimate of repair of damage item'}
        label={'Estimate of repair of damage item'}
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
          !purchaseReceipt ||
          !policeReport ||
          !repairEstimate ||
          !policeReport ||
          !repairEstimate ||
          !otherReport
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

export default TravelDocumentBaggageLossScreen;
