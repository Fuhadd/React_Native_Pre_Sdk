import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Circle, Flow} from 'react-native-animated-spinkit';
import {CustomColors, DynamicColors} from '../../constants/CustomColors';
import {HorizontalSpacer} from '../../components/Spacer';
import {InitViewModel} from './InitViewModel';
import {useMiscStore} from '../../store/miscStore';
import globalObject from '../../store/globalObject';
import {PaymentOption, TransactionType} from '../../utils/enums';
import {SemiBoldText} from '../../components/CustomText';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/navigatorStackList';

interface StartupScreenProps {}

type StartupScreenRouteProps = RouteProp<RootStackParamList, 'StartupScreen'>;

const StartupScreen: React.FC<StartupScreenProps> = () => {
  const viewModel = InitViewModel();
  // const viewModel = InitViewModel();
  const route = useRoute<StartupScreenRouteProps>();
  const {showLoadingText} = route.params;
  // const {showLoadingText} = route.params;
  // const miscGlobal = useMiscStore((state: any) => state);

  // useEffect(() => {
  //   const initialise = async () => {
  //     if (globalObject.transactionType == TransactionType.inspection) {
  //       await viewModel.initialiseInspectionSdk();
  //     } else if (globalObject.transactionType == TransactionType.claim) {
  //       await viewModel.initialiseClaimSdk();
  //     } else if (
  //       globalObject.transactionType == TransactionType.continuePurchase
  //     ) {
  //       await viewModel.initialiseContinuePurchaseSdk();
  //     } else {
  //       await viewModel.initialiseSdk();
  //     }
  //   };

  //   initialise();
  // }, []);

  const setupAndInitialize = async () => {
    // First set all the global values
    // globalObject.setPublicKey(apikey);
    // globalObject.setPolicyId(policyId ?? null);
    // globalObject.setPolicyNumber(policyNumber ?? null);
    // globalObject.setEmail(email ?? null);
    // globalObject.setInspectionEmail(email ?? null);
    // globalObject.setReference(referenceNumber ?? null);
    // globalObject.setTransactionType(
    //   transactionType ?? TransactionType.purchase,
    // );
    // globalObject.setPaymentOption(paymentOption ?? PaymentOption.gateway);

    // console.log('apikey');
    // console.log(apikey);
    // console.log(apikey);
    // console.log(apikey);
    // console.log(apikey);
    // console.log(apikey);

    // Then initialize the SDK based on transaction type
    try {
      if (globalObject.transactionType === TransactionType.inspection) {
        await viewModel.initialiseInspectionSdk();
      } else if (globalObject.transactionType === TransactionType.claim) {
        await viewModel.initialiseClaimSdk();
      } else if (
        globalObject.transactionType === TransactionType.continuePurchase
      ) {
        await viewModel.initialiseContinuePurchaseSdk();
      } else if (
        globalObject.transactionType === TransactionType.manage
      ) {
        await viewModel.initialiseManageSdk();
      } 
      else if (
        globalObject.transactionType === TransactionType.renewal
      ) {
        await viewModel.initialiseRenewalSdk();
      } 
      else {
        await viewModel.initialiseSdk();
      }
    } catch (error) {
      console.error('Failed to initialize SDK:', error);
      // Handle error appropriately
    }
  };

  useEffect(
    () => {
      // const setupAndInitialize = async () => {
      //   // First set all the global values
      //   globalObject.setPublicKey(apikey);
      //   globalObject.setPolicyId(policyId ?? null);
      //   globalObject.setPolicyNumber(policyNumber ?? null);
      //   globalObject.setEmail(email ?? null);
      //   globalObject.setInspectionEmail(email ?? null);
      //   globalObject.setReference(referenceNumber ?? null);
      //   globalObject.setTransactionType(
      //     transactionType ?? TransactionType.purchase,
      //   );
      //   globalObject.setPaymentOption(paymentOption ?? PaymentOption.gateway);

      //   console.log('apikey');
      //   console.log(apikey);
      //   console.log(apikey);
      //   console.log(apikey);
      //   console.log(apikey);
      //   console.log(apikey);

      //   // Then initialize the SDK based on transaction type
      //   try {
      //     if (globalObject.transactionType === TransactionType.inspection) {
      //       await viewModel.initialiseInspectionSdk();
      //     } else if (globalObject.transactionType === TransactionType.claim) {
      //       await viewModel.initialiseClaimSdk();
      //     } else if (
      //       globalObject.transactionType === TransactionType.continuePurchase
      //     ) {
      //       await viewModel.initialiseContinuePurchaseSdk();
      //     } else {
      //       await viewModel.initialiseSdk();
      //     }
      //   } catch (error) {
      //     console.error('Failed to initialize SDK:', error);
      //     // Handle error appropriately
      //   }
      // };

      setupAndInitialize();
    },
    [
      // apikey,
      // policyId,
      // policyNumber,
      // referenceNumber,
      // email,
      // transactionType,
      // paymentOption,
    ],
  );

  return (
    <View style={styles.center}>
      <View style={styles.column}>
        <View style={styles.padding}>
          <Circle size={35} color={DynamicColors().primaryBrandColor} />
        </View>

        {/* {showLoadingText && ( */}

        <View style={styles.loadingTextContainer}>
          <SemiBoldText title="Welcome" fontSize={16} />
          <HorizontalSpacer width={10} />
          <Flow size={20} color="black" />
        </View>
        {/* // ) */}
        {/* } */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  padding: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  loadingTextContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
