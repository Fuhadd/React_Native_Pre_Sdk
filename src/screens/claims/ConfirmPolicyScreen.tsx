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
  Dimensions,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import CustomAppBar from '../../components/CustomAppBar';
import CustomButton from '../../components/CustomButton';

import {CustomColors, DynamicColors} from '../../constants/CustomColors';
import {useGlobalStore} from '../../store/globalStore';
import {TransactionType} from '../../utils/enums';
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
import globalObject from '../../store/globalObject';
import GenericBottomSheet from '../../bottom_sheets/GenericBottomSheet';
import RepairEstimateWidget from '../claims/components/RepairEstimateWidget';
import PrivacyPolicyContainer from '../../components/PrivacyPolicyContainer';
import {VerticalSpacer} from '../../components/Spacer';
import ValidatedCustomFormTextField from '../../components/ValidatedCustomFormTextField';
import {useForm} from 'react-hook-form';
import {ClaimViewModel} from './ClaimViewModel';


interface ConfirmPolicyScreenProps {
  transactionType: TransactionType;
}

type ConfirmPolicyScreenRouteProps = RouteProp<
  RootStackParamList,
  'ConfirmPolicyScreen'
>;


const ConfirmPolicyScreen: React.FC<ConfirmPolicyScreenProps> = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const route = useRoute<ConfirmPolicyScreenRouteProps>();
  const {transactionType} = route.params;
  const claimVm = ClaimViewModel();

  // const transactionType = useGlobalStore((state: any) => state.transactionType);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [policyNumber, setPolicyNumber] = useState<string | null>(
    globalObject.policyNumber ?? null,
  );
  const [emailAddress, setEmailAddress] = useState<string | null>(
    globalObject.email ?? null,
  );
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation<NavigationProps>();

  const closeSDK = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        showHelp={false}
        showLogo={false}
        showBackButton={true}
        onBackTap={() => {
          navigation.goBack();
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View />

        <View style={styles.content}>
          <VerticalSpacer height={10} />
          <SemiBoldText title={transactionType === 'claim' ? 'Make a claim' : 'Provide Policy Info'} fontSize={21} />
          <VerticalSpacer height={20} />
          <View style={styles.claimContainer}>
            <View style={{paddingRight: 85, paddingLeft: 5}}>
              <RegularText
                title= 
                {
                  transactionType === 'renewal'
                  ? 'Renewing your policy is just a click away! Enter your policy number to start your renewal.'
                  : transactionType === 'manage'
                  ? 'Your plan info is just a few clicks away! Enter your policy number to see your coverage details.'
                  : 'Provide your email address and policy number to confirm your policy details.'
                }
                fontSize={14.5}
              />
              <VerticalSpacer height={20} />

              <RegularText
                title={
                  ' You can find your policy number in your email or on your certificate (e.g., INS-12345678-XY)'
                }
                fontSize={13}
              />
            </View>
            <Image
              source={require('../../assets/images/claim_img.webp')}
              style={styles.planImage}
            />
          </View>
          <View style={{flex: 1, width: '100%'}}>
            <VerticalSpacer height={30} />
            <ValidatedCustomFormTextField
              name={'Policy Number'}
              title={'Policy Number'}
              hintText={'Enter your Policy Number'}
              initialValue={policyNumber ?? ''}
              value={policyNumber ?? ''}
              control={control}
              onChanged={(text: string) => setPolicyNumber(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />

            {/* <VerticalSpacer height={5} /> */}

            <ValidatedCustomFormTextField
              name={'Email Address'}
              title={'Email Address'}
              initialValue={emailAddress ?? ''}
              hintText={'Enter your email Address'}
              value={emailAddress ?? ''}
              control={control}
              onChanged={(text: string) => setEmailAddress(text)}
              minMaxConstraint={'length'}
              minLength={4}
            />
          </View>

          {/* <View style={styles.spacer40} />
           */}
           <View style={{flex:1}} />
          <VerticalSpacer height={50} />
          <CustomButton
            title="Continue"
            isLoading={isLoading}
            onPress={handleSubmit(async () => {
              console.log('first');
              setIsLoading(true);
              await claimVm.getClaimsById(
                emailAddress ?? '',
                policyNumber ?? '',
              );
              setIsLoading(false);
            })}

            // policyNumber && emailAddress
            // ? async () => {
            //     console.log('first');
            //     setIsLoading(true);
            //     await claimVm.getClaimsById(emailAddress, policyNumber);
            //     setIsLoading(false);
            //   }
            // : () =>{
            //   console.log('first');
            // };

            // onPress=(handleSubmit)=>{})
          />

          {/* policyNumber && emailAddress
                ? () => {
                  
                  
                  }
                : undefined */}
          {/* <View style={styles.spacer10} /> */}
          {/* <PoweredByFooter /> */}
        </View>
      </ScrollView>

      <GenericBottomSheet
        title="Privacy Condition"
        isVisible={isModalVisible}
        content={
          <>
            <PrivacyPolicyContainer />
          </>
        }
        modalHeight={600}
        onClose={() => setModalVisible(false)}
        showButtons={false}
        onOkPressed={() => {
          navigation.popToTop();
        }}
      />
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('window'); // Get the device height

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: height,
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
    height: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },

  claimContainer: {
    backgroundColor: CustomColors.backBorderColor,
    padding: 10,
    borderRadius: 5,
    paddingVertical: 20,
    width: '100%',
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

  planImage: {
    height: 85,
    width: 85,
    // flex: 1,
    // alignItems: 'flex-end',
    alignSelf: 'flex-end',
    // justifyContent: 'flex-end',
    resizeMode: 'contain',

    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ConfirmPolicyScreen;
