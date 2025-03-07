import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ExpandableContainer from '../../components/ExpandableContainer';
import CustomImageNetwork from '../../components/CustomImageNetwork';
import { CustomColors } from '../../constants/CustomColors';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { VerticalSpacer } from '../../components/Spacer';
import { StringUtils } from '../../utils/StringUtils';
import ManagePlanExpandableContainer from './ManagePlanExpandableContainer';
import { SemiBoldText } from '../../components/CustomText';

interface PlanDetailsWidgetProps {
  plan: PolicyModel | null;
  productDetails: ProductDetailsModel;
}

const PlanDetailsWidget: React.FC<PlanDetailsWidgetProps> = ({
  plan,
  productDetails,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VerticalSpacer height={5} />
      <View style={styles.detailsContainer}>
        {/* <Text style={styles.planTitle}>{plan?.product?.name ?? ''}</Text> */}
        <SemiBoldText title={plan?.product?.name ?? ''} fontSize={14} color= {CustomColors.blackTextColor}/>
        <Text style={styles.providerText}>by: {productDetails.provider?.companyName ?? ''}</Text>
        {productDetails.provider?.logo?
        (
          <CustomImageNetwork imageUrl={productDetails.provider.logo} height={15} />
        )
       
        :   (<Text style={styles.providerText}>by: {productDetails.provider?.companyName ?? ''}</Text>)
        }
        <VerticalSpacer height={20} />
        <Text style={styles.priceLabel}>Premium</Text>
        <Text style={styles.price}>{`₦ ${StringUtils.formatPriceWithComma(plan?.marketPrice?.toString() ?? '')}`}</Text>
      </View>
      {productDetails.howItWorks && (
        <ManagePlanExpandableContainer title="How it Works" subTitle={productDetails.howItWorks} />
      )}
      {productDetails.keyBenefits && (
        <ManagePlanExpandableContainer title="About Product" subTitle={productDetails.keyBenefits} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  detailsContainer: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 15,
    borderRadius: 10,
    borderColor: CustomColors.lightWhiteColor,
    borderWidth: 0.2,
  },
  planTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CustomColors.blackTextColor,
  },
  providerText: {
    fontSize: 12,
    color: CustomColors.greyTextColor,
  },
  priceLabel: {
    fontSize: 13,
    color: CustomColors.greyTextColor,
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: CustomColors.mainGreenColor,
  },
});

export default PlanDetailsWidget;

