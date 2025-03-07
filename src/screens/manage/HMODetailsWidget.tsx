import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { StringUtils } from '../../utils/StringUtils';
import CustomImageNetwork from '../../components/CustomImageNetwork';
import { CustomColors } from '../../constants/CustomColors';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { VerticalSpacer } from '../../components/Spacer';

interface HMODetailsWidgetProps {
  plan: PolicyModel | null;
  productDetails: ProductDetailsModel;
  showActionButtons?: boolean;
}

const HMODetailsWidget: React.FC<HMODetailsWidgetProps> = ({
  plan,
  productDetails,
  showActionButtons = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
       
        <CustomImageNetwork imageUrl={plan?.meta?.id_image || ''} height={25} loaderComponent={undefined} />
      </View>
      <VerticalSpacer height={20} />
      <View style={styles.detailsContainer}>
        <Text style={styles.planName}>{plan?.product?.name || ''}</Text>
        <Text style={styles.memberId}>Member ID: {plan?.meta?.hmo_policy_id}</Text>
        <VerticalSpacer height={15} />
        <View style={styles.rowContainer}>
          <Text style={styles.label}>Active Since</Text>
          <Text style={styles.label}>Expiry Date</Text>
        </View>
        <VerticalSpacer height={10} />
        <View style={styles.rowContainer}>
          <Text style={styles.date}>{StringUtils.formatCustomDate(plan?.startDate)}</Text>
          <Text style={styles.date}>{StringUtils.formatCustomDate(plan?.expirationDate)}</Text>
        </View>
      </View>
      <VerticalSpacer height={20} />
      {showActionButtons && (
        <View style={styles.buttonContainer}>
          <CustomButton title="Call a Doctor" buttonColor={CustomColors.dividerGreyColor} />
          <CustomButton title="View Hospital List" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
    // padding: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: CustomColors.whiteColor,
    borderRadius: 10,
    padding: 15,
    borderColor: CustomColors.planBorderColor,
    borderWidth: 1,
  },
  planName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CustomColors.greenTextColor,
  },
  memberId: {
    fontSize: 14,
    color: CustomColors.greyTextColor,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    color: CustomColors.deepActiveTextColor,
  },
  date: {
    fontSize: 13,
    color: CustomColors.greyTextColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default HMODetailsWidget;
