import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';

import {CustomColors, DynamicColors} from '../../constants/CustomColors';
import {useGlobalStore} from '../../store/globalStore';
import {ProductCategory, TransactionType} from '../../utils/enums';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/navigatorStackList';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../components/CustomText';
import {ClaimModel} from '../../models/ClaimModel';
import globalObject from '../../store/globalObject';
import PoweredByFooter from '../../components/PoweredByFooter';

export interface InspectionInitScreenProps {
  claim: ClaimModel | null;
  productCategory: ProductCategory | null;
}

type InspectionInitScreenRouteProps = RouteProp<
  RootStackParamList,
  'InspectionInitScreen'
>;

const InspectionInitScreen: React.FC<InspectionInitScreenProps> = () => {
  const route = useRoute<InspectionInitScreenRouteProps>();
  const {claim, productCategory} = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const transactionType = useGlobalStore((state: any) => state.transactionType);
  const [isChecked, setIsChecked] = useState(false);

  const closeSDK = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar showHelp={true} showLogo={true} showBackButton={false} />
      <View style={styles.scrollView}>
        <View />

        <View style={styles.content}>
          <View style={styles.spacer40} />
          <View style={styles.imageContainer}>
            {globalObject.businessDetails == null ||
            !globalObject.businessDetails.sdkBannerPurchase ? (
              <Image
                source={require('../../assets/images/inspection_welcome.webp')}
                style={styles.bannerImage}
              />
            ) : (
              <Image
                source={{uri: globalObject.businessDetails.sdkBannerPurchase}}
                style={styles.bannerImage}
              />
            )}
          </View>

          <View style={styles.spacer30} />
          <SemiBoldText
            title={
              globalObject.businessDetails
                ?.sdkWelcomeScreenHeaderPreInspection ?? 'Inspection Portal'
            }
            fontSize={21}
            color={CustomColors.blackTextColor}
          />
          <View style={styles.spacer15} />

          <RegularText
            title={
              globalObject.businessDetails?.sdkWelcomeScreenBodyPreInspection ??
              'Welcome to the Inspection Portal! Here, you can seamlessly carry out both Pre-loss and Post-loss inspections for your vehicle.'
            }
            fontSize={15}
            color={CustomColors.blackTextColor}
            textAlign="center"
          />

          <View style={{flex: 0.2}} />

          {/* <View style={styles.spacer20} /> */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsChecked(!isChecked)}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{
                true: DynamicColors().primaryBrandColor,
                false: CustomColors.checkBoxBorderColor,
              }}
            />

            <Text
              style={[
                customTextStyles.regular,
                {fontSize: 14, color: CustomColors.blackTextColor},
              ]}>
              I have Read and Understand this{' '}
              <Text
                style={[
                  customTextStyles.regular,
                  {fontSize: 14, color: DynamicColors().primaryBrandColor},
                ]}
                onPress={() => {
                  /* Show Privacy Policy */
                }}>
                Privacy.
              </Text>
            </Text>
          </TouchableOpacity>

          {/* </View> */}

          <View style={styles.spacer30} />
          <CustomButton
            title="Continue"
            onPress={
              isChecked
                ? () => {
                    navigation.navigate(
                      productCategory === ProductCategory.gadget
                        ? 'GadgetInspectionPageView'
                        : 'CarInspectionPageView',
                    );
                  }
                : undefined
            }
          />

          {/* <View style={styles.spacer10} /> */}
          <PoweredByFooter />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  scrollView: {
    // height: '100%',
    flex: 1,
    padding: 20,
  },
  spacer10: {
    height: 10,
  },
  spacer15: {
    height: 15,
  },
  spacer20: {
    height: 20,
  },
  spacer25: {
    height: 25,
  },
  spacer30: {
    height: 30,
  },
  spacer40: {
    height: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: CustomColors.backBorderColor,
  },
  bannerImage: {
    width: '100%',
    flex: 1,

    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 20,

    textAlign: 'center',
    fontFamily: 'PhantomSans-Regular',
    color: CustomColors.blackTextColor,
  },
  bodyText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'PhantomSans-Medium',
    color: CustomColors.blackTextColor,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 13,
    color: '#000',
    marginLeft: 5,
    fontFamily: 'PhantomSans-Medium',
  },
  privacyText: {
    color: DynamicColors().primaryBrandColor,
  },
});

export default InspectionInitScreen;
