import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import ClaimImagePicker from '../../components/ClaimImagePicker';
import {VerticalSpacer} from '../../../../components/Spacer';
import CustomButton from '../../../../components/CustomButton';
import {CustomColors} from '../../../../constants/CustomColors';
import {useClaimStore, ClaimStore} from '../../../../store/claimStore';
import ValidatedCustomFormTextField from '../../../../components/ValidatedCustomFormTextField';
import {FileData} from '../../../purchase/form/components/CustomImagePicker';
import {ClaimViewModel} from '../../ClaimViewModel';

interface TravelDocumentLegalExpenseScreenProps {
  formKey: any;
}

const TravelDocumentLegalExpenseScreen: React.FC<
  TravelDocumentLegalExpenseScreenProps
> = ({formKey}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const claimStore = useClaimStore((state: ClaimStore) => state);

  // State for handling form fields
  const [eventDescription, setEventDescription] = useState<string | null>(null);
  const [witnessDetails, setWitnessDetails] = useState<string | null>(null);

  const [writtenSummon, setWrittenSummon] = useState<FileData | null>(null);
  const [writtenSummonError, setWrittenSummonError] = useState<string | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const claimVM = ClaimViewModel();

  const onSubmit = async () => {
    if (writtenSummon) {
      setIsLoading(true);
      await claimVM.submitTravelClaimLegalExpenseDocumentation(
        witnessDetails ?? '',
        eventDescription ?? '',

        writtenSummon,
      );
      setIsLoading(false);
    }
  };

  return (
    <View>
      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Circumstance surrounding event'}
        hintText={'Tell us the circumstances that surrounded this event'}
        maxLines={4}
        value={eventDescription ?? ''}
        control={control}
        onChanged={(text: string) => setEventDescription(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ValidatedCustomFormTextField
        name={'what happened'}
        title={'Witness details discussing how it happened'}
        hintText={'Provide witness details description'}
        maxLines={4}
        value={witnessDetails ?? ''}
        control={control}
        onChanged={(text: string) => setWitnessDetails(text)}
        minMaxConstraint={'length'}
        minLength={4}
      />

      <ClaimImagePicker
        fieldName={'Written summon for third party'}
        label={'Written summon for third party'}
        imageData={writtenSummon}
        setImageData={setWrittenSummon}
        error={writtenSummonError}
        setError={setWrittenSummonError}
        required={true}
      />

      <VerticalSpacer height={20} />

      <CustomButton
        title="Continue"
        isLoading={isLoading}
        onPress={
          !writtenSummon || !witnessDetails || !eventDescription
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

export default TravelDocumentLegalExpenseScreen;
