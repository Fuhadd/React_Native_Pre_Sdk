import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { CustomColors } from '../../constants/CustomColors';
import { VerticalSpacer } from '../../components/Spacer';
import ManagePlanExpandableContainer from './ManagePlanExpandableContainer';

interface HowToClaimWidgetProps {
  plan: PolicyModel | null;
  productDetails: ProductDetailsModel;
}

const HowToClaimWidget: React.FC<HowToClaimWidgetProps> = ({
  plan,
  productDetails,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VerticalSpacer height={5} />
      {productDetails.howToClaim ? (
        <View style={styles.expandableContainer}>
          <ManagePlanExpandableContainer
            title="How to claim"
            subTitle={productDetails.howToClaim}
            isExpanded={true}
          />
        </View>
      ) : null}
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

export default HowToClaimWidget;
