import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CustomColors } from '../../constants/CustomColors';
import ManagePlanExpandableContainer from './ManagePlanExpandableContainer';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { VerticalSpacer } from '../../components/Spacer';

interface BenefitDetailsWidgetProps {
  plan: PolicyModel | null;
  productDetails: ProductDetailsModel;
}

const BenefitDetailsWidget: React.FC<BenefitDetailsWidgetProps> = ({
  plan,
  productDetails,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VerticalSpacer height={5} />
      {productDetails.fullBenefits && (
        <View style={styles.expandableContainer}>
          <ManagePlanExpandableContainer
            title="Benefits"
            subTitle={productDetails.fullBenefits??''}
            isExpanded={true}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  expandableContainer: {
    marginTop: 20,
  },
});

export default BenefitDetailsWidget;
