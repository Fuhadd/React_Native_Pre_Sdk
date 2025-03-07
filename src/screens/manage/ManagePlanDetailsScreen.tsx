// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import CustomAppBar from '../../components/CustomAppBar';
// import { TransactionType } from '../../utils/enums';
// import { RootStackParamList } from '../../utils/navigatorStackList';
// import { RegularText, SemiBoldText } from '../../components/CustomText';
// import PlanDetailsWidget from './PlanDetailsWidget';
// import HMODetailsWidget from './HMODetailsWidget';
// import HowToClaimWidget from './HowToClaimWidget';
// import BenefitDetailsWidget from './BenefitDetailsWidget';
// import { CustomColors, DynamicColors } from '../../constants/CustomColors';
// import { PolicyModel } from '../../models/PolicyModel';
// import { ProductDetailsModel } from '../../models/ProductDetailsModel';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// interface ManagePlanDetailsScreenProps {
//   plan: PolicyModel | null;
//   status: string;
//   productDetails: ProductDetailsModel;
// }

// const Tab = createMaterialTopTabNavigator();

// type ManagePlanDetailsScreenRouteProps = RouteProp<
//   RootStackParamList,
//   'ManagePlanDetailsScreen'
// >;

// const ManagePlanDetailsScreen: React.FC<ManagePlanDetailsScreenProps> = () => {
//   type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
//   const route = useRoute<ManagePlanDetailsScreenRouteProps>();
//   const navigation = useNavigation<NavigationProps>();
//   const { plan, status, productDetails } = route.params;
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomAppBar showBackButton onBackTap={() => navigation.goBack()} />
//       <View style={styles.headerContainer}>
//         <SemiBoldText title="Plan Details" fontSize={20} />
//       </View>
//       <View style={styles.tabContainer}>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarIndicatorStyle: {
//             backgroundColor: DynamicColors().primaryBrandColor,
//           },
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: CustomColors.blackColor },
//           tabBarStyle: { backgroundColor: CustomColors.backBorderColor },
//         }}
//         options={{
//           tabBarLabel: productDetails?.productCategory?.name?.toLowerCase() === 'health' ? 'HMO' : 'Details',
//         }}
//       >
//         <Tab.Screen
//           name={productDetails?.productCategory?.name?.toLowerCase() === 'health' ? 'HMO' : 'Details'}
//           component={() =>
//             productDetails?.productCategory?.name?.toLowerCase() === 'health' ? (
//               <HMODetailsWidget plan={plan} productDetails={productDetails} showActionButtons={status !== 'expired' && status !== 'inactive'} />
//             ) : (
//               <PlanDetailsWidget plan={plan} productDetails={productDetails} />
//             )
//           }
//         />
//         <Tab.Screen
//           name={productDetails?.productCategory?.name?.toLowerCase() === 'health' ? 'Details' : 'How to Claim'}
//           component={() =>
//             productDetails?.productCategory?.name?.toLowerCase() === 'health' ? (
//               <PlanDetailsWidget plan={plan} productDetails={productDetails} />
//             ) : (
//               <HowToClaimWidget plan={plan} productDetails={productDetails} />
//             )
//           }
//         />
//         <Tab.Screen name="Benefits" component={() => <BenefitDetailsWidget plan={plan} productDetails={productDetails} />} />
//       </Tab.Navigator>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: CustomColors.whiteColor,
//   },
//   headerContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//   },
//   tabContainer: {
//     paddingHorizontal: 20,
//     flex: 1,
//   },
// });

// export default ManagePlanDetailsScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomAppBar from '../../components/CustomAppBar';
import { TransactionType } from '../../utils/enums';
import { RootStackParamList } from '../../utils/navigatorStackList';
import { RegularText, SemiBoldText } from '../../components/CustomText';
import PlanDetailsWidget from './PlanDetailsWidget';
import HMODetailsWidget from './HMODetailsWidget';
import HowToClaimWidget from './HowToClaimWidget';
import BenefitDetailsWidget from './BenefitDetailsWidget';
import { CustomColors, DynamicColors } from '../../constants/CustomColors';
import { PolicyModel } from '../../models/PolicyModel';
import { ProductDetailsModel } from '../../models/ProductDetailsModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ManagePlanDetailsScreenProps {
  plan: PolicyModel | null;
  status: string;
  productDetails: ProductDetailsModel;
}

const Tab = createMaterialTopTabNavigator();

type ManagePlanDetailsScreenRouteProps = RouteProp<
  RootStackParamList,
  'ManagePlanDetailsScreen'
>;

const ManagePlanDetailsScreen: React.FC<ManagePlanDetailsScreenProps> = () => {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const route = useRoute<ManagePlanDetailsScreenRouteProps>();
  const navigation = useNavigation<NavigationProps>();
  const { plan, status, productDetails } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  // Determine the tab names and components dynamically
  const isHealthProduct = productDetails?.productCategory?.name?.toLowerCase() === 'health';
  const firstTabName = isHealthProduct ? 'HMO' : 'Details';
  const secondTabName = isHealthProduct ? 'Details' : 'How to Claim';

  // Define the components for the tabs
  const FirstTabComponent = () =>
    isHealthProduct ? (
      <HMODetailsWidget plan={plan} productDetails={productDetails} showActionButtons={status !== 'expired' && status !== 'inactive'} />
    ) : (
      <PlanDetailsWidget plan={plan} productDetails={productDetails} />
    );

  const SecondTabComponent = () =>
    isHealthProduct ? (
      <PlanDetailsWidget plan={plan} productDetails={productDetails} />
    ) : (
      <HowToClaimWidget plan={plan} productDetails={productDetails} />
    );

  const ThirdTabComponent = () => <BenefitDetailsWidget plan={plan} productDetails={productDetails} />;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={DynamicColors().primaryBrandColor} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar showBackButton onBackTap={() => navigation.goBack()} />
      <View style={styles.headerContainer}>
        <SemiBoldText title="Plan Details" fontSize={20} />
      </View>
      <View style={styles.tabContainer}>
      <Tab.Navigator
  screenOptions={{
    // Base tab bar styling
    tabBarStyle: {
      backgroundColor: CustomColors.backBorderColor,
      elevation: 0,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: 12,
      height: 52,
      // marginHorizontal: 16,
      marginTop: 3,
      marginBottom: 10,
      // paddingHorizontal: 16,
      // overflow: 'hidden', // Important: keeps the pill shape within bounds
    },

    // Text styling
    tabBarLabelStyle: {
      fontFamily: 'PhantomSans-Medium',
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'none', // Prevents automatic uppercase
    },


    // Colors for the text
    tabBarActiveTintColor: CustomColors.blackColor,
    tabBarInactiveTintColor: CustomColors.lightBlackColor,

    // The custom indicator (pill shape)
    // tabBarIndicator: ({ state, descriptors, navigation, width }) => {
    //   // Convert width to number if it's a string
    //   const numericWidth = typeof width === 'string' ? parseFloat(width) : width;
    //   // Calculate the width of each tab
    //   const tabWidth = numericWidth / state.routes.length;
      
    //   return (
    //     <View
    //       style={{
    //         position: 'absolute',
    //         height: '80%',
    //         // width: tabWidth - 16,
    //         backgroundColor: '#F8F9FA',
    //         borderRadius: 8,
    //         margin: 8,
    //         transform: [
    //           { translateX: tabWidth * state.index },
    //         ],
    //       }}
    //     />
    //   );
    // },

    // Hide the default indicator line
    tabBarIndicatorStyle: {
      // height: 0,
      backgroundColor:'white',
      height: '80%',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      // paddingBottom: 20,
      marginTop: 5,
      marginHorizontal: 5,
      // marginStart: 5,
      // paddingTop: 20,
      marginBottom: 5,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: 12,
      // marginHorizontal: 16,
      // marginVertical: 8,
      overflow: 'hidden', // Important: keeps the pill shape within bounds

    },

    // Individual tab styling
    tabBarItemStyle: {
      height: 48, // Fixed height for tabs
      padding: 0, // Remove default padding
    },
  }}
>
          <Tab.Screen
            name={firstTabName}
            component={FirstTabComponent}
            // options={{ tabBarLabel: 'firstTabName', title: 'firstTabName' , tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: CustomColors.blackColor } }}
          />
          <Tab.Screen
            name={secondTabName}
            component={SecondTabComponent}
            options={{ tabBarLabel: secondTabName }}
          />
          <Tab.Screen
            name="Benefits"
            component={ThirdTabComponent}
            options={{ tabBarLabel: 'Benefits' }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  tabContainer: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: CustomColors.whiteColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ManagePlanDetailsScreen;