import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useStore} from 'zustand';
import {format} from 'date-fns';
import {FormStore, useFormStore} from '../../../../store/formStore';
import log from '../../../../utils/logger';
import {customTextStyles, W500Text} from '../../../../components/CustomText';
import {VerticalSpacer} from '../../../../components/Spacer';
import {CustomColors} from '../../../../constants/CustomColors';
import DateIcon from '../../../../assets/icons/date_icon.svg';

interface CustomDatePickerProps {
  fieldName: string;
  label: string;
  description: string;
  min: number;
  customProvider?: any;
  filteredFieldsLength?: number;
  formKey?: any;
  formVM?: any;
  shouldUseGlobalItemPair?: boolean;
  isLastPage?: boolean;
  onDateSelected: (date: string) => void; // New prop for handling date selection
  value?: string; // Optional, passed from Controller to show the current value
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  fieldName,
  label,
  description,
  min,
  customProvider,
  filteredFieldsLength,
  formKey,
  formVM,
  isLastPage = false,
  shouldUseGlobalItemPair = false,
  onDateSelected,
  value,
}) => {
  const [show, setShow] = useState(false);

  const formGlobal = useFormStore((state: FormStore) => state);
  const [debounce, setDebounce] = useState<NodeJS.Timeout | null>(null);

  const today = new Date();
  let maxDate = new Date(3000, 0, 1);
  let minDate = new Date(
    today.getFullYear() - min,
    today.getMonth(),
    today.getDate(),
  );
  let initialDate = today;

  if (
    minDate < today &&
    min > 0 &&
    (fieldName.toLowerCase().includes('birth') ||
      label.toLowerCase().includes('birth'))
  ) {
    initialDate = minDate;
    maxDate = minDate;
    minDate = new Date(1000, 0, 1);
  } else {
    minDate = new Date(1000, 0, 1);
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString();

      if (shouldUseGlobalItemPair) {
        formGlobal.setGlobalItemPair(fieldName, isoDate);
      } else {
        formGlobal.setFormData(fieldName, isoDate);
      }

      onDateSelected(isoDate);
      log.info(isoDate);
      log.debug(formGlobal.formData[fieldName]);
      log.info(JSON.stringify(formGlobal.formData, null, 2));

      // if (debounce) clearTimeout(debounce);
      // setDebounce(
      //   setTimeout(() => {
      //     if (
      //       filteredFieldsLength !== undefined &&
      //       formVM &&
      //       formKey &&
      //       isLastPage
      //     ) {
      //       const isValid = formKey.current?.validate();
      //       if (isValid) {
      //         formVM.fetchProductPrice();
      //       }
      //     }
      //   }, 1000),
      // );
    }
  };

  return (
    <TouchableOpacity onPress={() => setShow(true)} style={styles.container}>
      <W500Text title={label} fontSize={16} color={CustomColors.blackColor} />

      <VerticalSpacer height={9} />

      <View style={styles.datePickerContainer}>
        <Text
          style={
            shouldUseGlobalItemPair
              ? formGlobal.globalItemPair[fieldName]
                ? [
                    customTextStyles.regular,
                    {fontSize: 15, color: CustomColors.blackColor},
                  ]
                : [
                    customTextStyles.regular,
                    {fontSize: 15, color: CustomColors.formHintColor},
                  ]
              : formGlobal.formData[fieldName]
              ? [
                  customTextStyles.regular,
                  {fontSize: 15, color: CustomColors.blackColor},
                ]
              : [
                  customTextStyles.regular,
                  {fontSize: 15, color: CustomColors.formHintColor},
                ]
          }>
          {shouldUseGlobalItemPair
            ? formGlobal.globalItemPair[fieldName]
              ? format(
                  new Date(formGlobal.globalItemPair[fieldName]),
                  'yyyy-MM-dd',
                )
              : description
            : formGlobal.formData[fieldName]
            ? format(new Date(formGlobal.formData[fieldName]), 'yyyy-MM-dd')
            : description}
        </Text>
        <DateIcon width={22} height={22} fill={CustomColors.formHintColor} />
        {/* <Text style={styles.icon}>📅</Text>  */}
      </View>
      {formGlobal.formErrors.get(fieldName) ? (
        <Text style={styles.errorText}>
          {formGlobal.formErrors.get(fieldName)}
        </Text>
      ) : null}

      {show && (
        <DateTimePicker
          value={
            shouldUseGlobalItemPair
              ? formGlobal.globalItemPair[fieldName]
                ? new Date(formGlobal.globalItemPair[fieldName])
                : initialDate
              : formGlobal.formData[fieldName]
              ? new Date(formGlobal.formData[fieldName])
              : initialDate
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={minDate}
          maximumDate={maxDate}
          onChange={handleDateChange}
        />
      )}
      {/* <VerticalSpacer height={10} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderColor: CustomColors.dividerGreyColor,
    borderWidth: 0.8,
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    backgroundColor: CustomColors.backBorderColor,
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
  icon: {
    fontSize: 20,
    color: '#999',
  },
});

export default CustomDatePicker;
