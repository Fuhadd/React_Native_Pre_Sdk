import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/initialization/WelcomeScreen';
import GridSdkOptionsScreen from './src/screens/initialization/GridSdkOptionsScreen';
import ListSdkOptionsScreen from './src/screens/initialization/ListSdkOptionsScreen';
import {StyleSheet} from 'react-native';
import StartupScreen from './src/screens/initialization/StartupScreen';
import {RootStackParamList} from './src/utils/navigatorStackList';
import GridViewProductListScreen from './src/screens/purchase/product_list/gridview_product_list/GridViewProductListScreen';
import {GridViewProviderListScreen} from './src/screens/purchase/product_list/gridview_product_list/GridViewProviderListScreen';
import {ProductDetailsScreen} from './src/screens/purchase/product_details/ProductDetailsScreen';
import FirstFormScreen from './src/screens/purchase/form/FirstFormScreen';
import PaymentMethodScreen from './src/screens/purchase/payment/PaymentMethodScreen';
import AccountDetailsScreen from './src/screens/purchase/payment/AccountDetailsScreen';
import PlanDetailsScreen from './src/screens/purchase/payment/PlanDetailsScreen';
import PurchaseSuccessScreen from './src/screens/purchase/form/PurchaseSuccessScreen';
import PaymentSuccessScreen from './src/screens/purchase/payment/PaymentSuccessScreen';
import SecondFormScreen from './src/screens/purchase/form/SecondFormScreen';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/components/CustomToast';
import VehicleVerificationScreen from './src/screens/inspection/vehicle/VehicleVerificationScreen';
import InspectionInitScreen from './src/screens/inspection/InspectionInitScreen';
import CarInspectionPageView from './src/screens/inspection/CarInspectionPageView';
import {enableMapSet} from 'immer';
import {Provider} from 'react-redux';
import {store} from './src/store/redux';
import VehicleInspectionSummaryScreen from './src/screens/inspection/vehicle/VehicleInspectionSummaryScreen';
import InputForm from './src/screens/IntroScreen';
import SDKErrorScreen from './src/screens/initialization/SDKErrorScreen';
import InspectionSuccessScreen from './src/screens/inspection/InspectionSuccessScreen';
import GadgetVerificationScreen from './src/screens/inspection/gadget/GadgetVerificationScreen';
import GadgetInspectionPageView from './src/screens/inspection/gadget/GadgetInspectionPageView';
import GadgetInspectionSummaryScreen from './src/screens/inspection/gadget/GadgetInspectionSummaryScreen';
import CustomItemPairWidget from './src/screens/purchase/form/components/CustomItemPair';
import ConfirmPolicyInfoScreen from './src/screens/claims/ConfirmPolicyInfoScreen';
import ClaimFirstFormScreen from './src/screens/claims/ClaimFirstFormScreen';
import ClaimSummaryScreen from './src/screens/claims/ClaimSummaryScreen';
import ClaimSubmittedScreen from './src/screens/claims/ClaimSubmittedScreen';
import TrackClaimsScreen from './src/screens/claims/TrackClaimsScreen';
import SubmitPoliceReportScreen from './src/screens/claims/SubmitPoliceReportScreen';
import RepairEstimateScreen from './src/screens/claims/RepairEstimateScreen';
import OfferSettlementScreen from './src/screens/claims/OfferSettlementScreen';
import AcceptOfferScreen from './src/screens/claims/AcceptOfferScreen';
import ThirdPartyClaimFormScreen from './src/screens/claims/ThirdPartyClaimFormScreen';
import GadgetClaimFirstFormScreen from './src/screens/claims/gadget/GadgetClaimFirstFormScreen';
import GadgetClaimSummaryScreen from './src/screens/claims/gadget/GadgetClaimSummaryScreen';
import GadgetClaimSubmittedScreen from './src/screens/claims/gadget/GadgetClaimSubmittedScreen';
import TrackGadgetClaimsScreen from './src/screens/claims/gadget/TrackGadgetClaimsScreen';
import TravelClaimFirstFormScreen from './src/screens/claims/travel/TravelClaimFirstFormScreen';
import TravelClaimSummaryScreen from './src/screens/claims/travel/TravelClaimSummaryScreen';
import TravelClaimSubmittedScreen from './src/screens/claims/travel/TravelClaimSubmittedScreen';
import TravelDocumentationScreen from './src/screens/claims/travel/TravelDocumentationScreen';
import TrackTravelClaimsScreen from './src/screens/claims/travel/TrackTravelClaimsScreen';
import ListViewProductListScreen from './src/screens/purchase/product_list/listview_product_list/ListViewProductListScreen';
import ListViewProviderListScreen from './src/screens/purchase/product_list/listview_product_list/ListViewProviderListScreen';
import PaymentProcessingScreen from './src/screens/purchase/payment/PaymentProcessingScreen';
import VideoRecorder from './src/screens/GetVideoSizeScreen';
import VideoPlayerScreen from './src/screens/VideoPlayerScreen';
import {PaymentOption, TransactionType} from './src/utils/enums';
import SetPublicKeyScreen from './src/screens/initialization/SetPublicKeyScreen';
import ConfirmPolicyScreen from './src/screens/claims/ConfirmPolicyScreen';
import ManagePlanDetailsScreen from './src/screens/manage/ManagePlanDetailsScreen';

const App = () => {
  // const Stack = createNativeStackNavigator();

  const apikey = 'MCAPUBK_TEST|1acf339a-d36f-47e7-8e1b-fd0b76b61b0c';
  const policyId = '91948903-dd25-41e9-a5a0-09f683dd31bc';
  const policyNumber = '110105102401619';
  const referenceNumber = null;
  const email = 'fuhad@mycovergenius.com';
  const transactionType = TransactionType.purchase;
  const paymentOption = PaymentOption.gateway;
  // const globalStore = useGlobalStore((state: GlobalStore) => state);
  const Stack = createNativeStackNavigator<RootStackParamList>();
  enableMapSet();

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{title: '', headerShown: false}}
          //   initialRouteName="InspectionSuccessScreen">

          initialRouteName="InputForm">
          {/* //  // initialRouteName="CustomItemPairWidget"> */}

          <Stack.Screen name="VideoRecorder" component={VideoRecorder} />

          <Stack.Screen
            name="VideoPlayerScreen"
            component={VideoPlayerScreen}
          />

          <Stack.Screen name="InputForm" component={InputForm} />
          <Stack.Screen name="ManagePlanDetailsScreen" component={ManagePlanDetailsScreen} />

          

          <Stack.Screen
            name="CustomItemPairWidget"
            component={CustomItemPairWidget}
          />
          <Stack.Screen
            name="SetPublicKeyScreen"
            component={SetPublicKeyScreen}
            initialParams={{
              showLoadingText: true,
              apikey,
              policyId,
              policyNumber,
              referenceNumber,
              email,
              transactionType,
              paymentOption,
            }}
          />

          <Stack.Screen
            name="StartupScreen"
            component={StartupScreen}
            initialParams={{
              showLoadingText: true,
              apikey,
              policyId,
              policyNumber,
              referenceNumber,
              email,
              transactionType,
              paymentOption,
            }}
          />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="ConfirmPolicyScreen"
            component={ConfirmPolicyScreen}
          />

          <Stack.Screen
            name="GridSdkOptionsScreen"
            component={GridSdkOptionsScreen}
          />
          <Stack.Screen
            name="GridViewProductListScreen"
            component={GridViewProductListScreen}
          />
          <Stack.Screen
            name="GridViewProviderListScreen"
            component={GridViewProviderListScreen} // Add your screen here
          />
          <Stack.Screen
            name="ListViewProviderListScreen"
            component={ListViewProviderListScreen} // Add your screen here
          />

          <Stack.Screen
            name="ListViewProductListScreen"
            component={ListViewProductListScreen}
          />

          <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
          />
          <Stack.Screen
            name="PaymentSuccessScreen"
            component={PaymentSuccessScreen}
          />
          <Stack.Screen name="SecondFormScreen" component={SecondFormScreen} />

          <Stack.Screen name="FirstFormScreen" component={FirstFormScreen} />

          <Stack.Screen
            name="PaymentMethodScreen"
            component={PaymentMethodScreen}
          />

          <Stack.Screen
            name="AccountDetailsScreen"
            component={AccountDetailsScreen}
          />

          <Stack.Screen
            name="PaymentProcessingScreen"
            component={PaymentProcessingScreen}
          />

          <Stack.Screen
            name="PurchaseSuccessScreen"
            component={PurchaseSuccessScreen}
          />

          <Stack.Screen
            name="PlanDetailsScreen"
            component={PlanDetailsScreen}
          />

          <Stack.Screen
            name="InspectionInitScreen"
            component={InspectionInitScreen}
          />

          <Stack.Screen
            name="CarInspectionPageView"
            component={CarInspectionPageView}
          />

          <Stack.Screen
            name="VehicleVerificationScreen"
            component={VehicleVerificationScreen}
          />

          <Stack.Screen
            name="VehicleInspectionSummaryScreen"
            component={VehicleInspectionSummaryScreen}
          />
          <Stack.Screen
            name="GadgetInspectionSummaryScreen"
            component={GadgetInspectionSummaryScreen}
          />

          <Stack.Screen
            name="InspectionSuccessScreen"
            component={InspectionSuccessScreen}
          />

          <Stack.Screen
            name="GadgetVerificationScreen"
            component={GadgetVerificationScreen}
          />

          <Stack.Screen
            name="GadgetInspectionPageView"
            component={GadgetInspectionPageView}
          />

          <Stack.Screen
            name="ListSdkOptionsScreen"
            component={ListSdkOptionsScreen}
          />
          <Stack.Screen
            name="ConfirmPolicyInfoScreen"
            component={ConfirmPolicyInfoScreen}
          />

          <Stack.Screen
            name="ClaimFirstFormScreen"
            component={ClaimFirstFormScreen}
          />

          <Stack.Screen
            name="ClaimSummaryScreen"
            component={ClaimSummaryScreen}
          />

          <Stack.Screen
            name="ClaimSubmittedScreen"
            component={ClaimSubmittedScreen}
          />

          <Stack.Screen
            name="TrackClaimsScreen"
            component={TrackClaimsScreen}
          />
          <Stack.Screen
            name="SubmitPoliceReportScreen"
            component={SubmitPoliceReportScreen}
          />

          <Stack.Screen
            name="RepairEstimateScreen"
            component={RepairEstimateScreen}
          />
          <Stack.Screen
            name="OfferSettlementScreen"
            component={OfferSettlementScreen}
          />

          <Stack.Screen
            name="AcceptOfferScreen"
            component={AcceptOfferScreen}
          />

          <Stack.Screen
            name="ThirdPartyClaimFormScreen"
            component={ThirdPartyClaimFormScreen}
          />

          <Stack.Screen
            name="GadgetClaimFirstFormScreen"
            component={GadgetClaimFirstFormScreen}
          />
          <Stack.Screen
            name="GadgetClaimSummaryScreen"
            component={GadgetClaimSummaryScreen}
          />

          <Stack.Screen
            name="GadgetClaimSubmittedScreen"
            component={GadgetClaimSubmittedScreen}
          />

          <Stack.Screen
            name="TrackGadgetClaimsScreen"
            component={TrackGadgetClaimsScreen}
          />

          <Stack.Screen
            name="TravelClaimFirstFormScreen"
            component={TravelClaimFirstFormScreen}
          />

          <Stack.Screen
            name="TravelClaimSummaryScreen"
            component={TravelClaimSummaryScreen}
          />
          <Stack.Screen
            name="TravelClaimSubmittedScreen"
            component={TravelClaimSubmittedScreen}
          />
          <Stack.Screen
            name="TravelDocumentationScreen"
            component={TravelDocumentationScreen}
          />
          <Stack.Screen
            name="TravelTrackClaimsScreen"
            component={TrackTravelClaimsScreen}
          />

          <Stack.Screen name="SDKErrorScreen" component={SDKErrorScreen} />
          {/* <Stack.Screen name="SuccessScreen" component={SuccessScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

// initialRouteName="StartupScreen">
{
  /* // initialRouteName="VehicleVerificationScreen" > */
}

{
  /* // initialRouteName="InspectionInitScreen"> */
}
// initialRouteName="CarInspectionPageView">
