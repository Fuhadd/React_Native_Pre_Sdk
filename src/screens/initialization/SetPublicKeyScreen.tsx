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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../utils/navigatorStackList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface SetPublicKeyScreenProps {
  showLoadingText: boolean;
  apikey: string;
  policyId?: string | null;
  policyNumber?: string | null;
  referenceNumber?: string | null;
  email?: string | null;
  transactionType?: TransactionType | null;
  paymentOption?: PaymentOption | null;
}

type SetPublicKeyScreenRouteProps = RouteProp<
  RootStackParamList,
  'SetPublicKeyScreen'
>;

const SetPublicKeyScreen: React.FC<SetPublicKeyScreenProps> = () => {
  const route = useRoute<SetPublicKeyScreenRouteProps>();

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();
  const {
    showLoadingText,
    apikey,
    policyId,
    policyNumber,
    referenceNumber,
    email,
    transactionType,
    paymentOption,
  } = route.params;

  useEffect(() => {
    // First set all the global values
    globalObject.setPublicKey(apikey);
    globalObject.setPolicyId(policyId ?? null);
    globalObject.setPolicyNumber(policyNumber ?? null);
    globalObject.setEmail(email ?? null);
    globalObject.setInspectionEmail(email ?? null);
    globalObject.setReference(referenceNumber ?? null);
    globalObject.setTransactionType(
      transactionType ?? TransactionType.purchase,
    );
    globalObject.setPaymentOption(paymentOption ?? PaymentOption.gateway);
    navigation.navigate('StartupScreen', {
      showLoadingText: true,
      apikey,
      policyId,
      policyNumber,
      referenceNumber,
      email,
      transactionType,
      paymentOption,
    });
  }, [
    apikey,
    policyId,
    policyNumber,
    referenceNumber,
    email,
    transactionType,
    paymentOption,
  ]);

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

export default SetPublicKeyScreen;
