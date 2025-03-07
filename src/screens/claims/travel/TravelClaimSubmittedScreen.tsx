import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Svg from 'react-native-svg';
import Dash from 'react-native-dash-2';
import {useStore} from 'zustand';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import RejectOfferIcon from '../../../assets/icons/reject_offer_icon.svg';
import CustomAppBar from '../../../components/CustomAppBar';
import CustomButton from '../../../components/CustomButton';
import {
  SemiBoldText,
  customTextStyles,
  RegularText,
} from '../../../components/CustomText';
import PoweredByFooter from '../../../components/PoweredByFooter';
import {VerticalSpacer} from '../../../components/Spacer';
import {CustomColors, DynamicColors} from '../../../constants/CustomColors';
import {ClaimModel} from '../../../models/ClaimModel';
import globalObject from '../../../store/globalObject';
import {
  ClaimSubmissionStep,
  ClaimType,
  getGadgetType,
  ProductCategory,
} from '../../../utils/enums';
import {RootStackParamList} from '../../../utils/navigatorStackList';
import {StringUtils} from '../../../utils/StringUtils';
import {ClaimViewModel} from '../ClaimViewModel';
import CustomCircleContainer from '../components/CustomCircleContainer';

import CheckRoundIcon from '../../../assets/icons/check_round.svg';

interface TravelClaimSubmittedScreenProps {
  claim: ClaimModel;
  detailedClaim?: ClaimModel;
  submissionStep?: string;
}

type TravelClaimSubmittedScreenRouteProps = RouteProp<
  RootStackParamList,
  'TravelClaimSubmittedScreen'
>;

const TravelClaimSubmittedScreen: React.FC<
  TravelClaimSubmittedScreenProps
> = () => {
  const route = useRoute<TravelClaimSubmittedScreenRouteProps>();
  const {claim, detailedClaim, submissionStep = 'claimLodged'} = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const claimVm = ClaimViewModel();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Disable back button functionality
    const backAction = () => {
      // Returning true disables the back button
      return true;
    };

    // Add the back button event listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Cleanup event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);

  const handleButtonPress = async () => {
    console.log(1);
    setIsLoading(true);
    console.log(2);
    globalObject.policyId = claim.policyId ?? globalObject.policyId;
    console.log(3);
    globalObject.claimId = claim.id ?? '';
    console.log(4);
    globalObject.claim = claim;
    console.log(5);

    globalObject.gadgetType = getGadgetType(
      claim.policy?.meta['payload']['device_type'].toString().toLowerCase() ??
        '',
    );
    console.log(6);
    console.log(claim);
    console.log(detailedClaim);
    console.log(claim.gadgetClaimMeta);
    console.log(claim.gadgetClaimMeta['policy_number']);
    console.log(globalObject.policyNumber);
    globalObject.policyNumber =
      claim.gadgetClaimMeta['policy_number'] ?? globalObject.policyNumber;
    console.log(7);
    if (claim.gadgetClaimMeta != null) {
      globalObject.gadgetType = getGadgetType(
        claim.policy?.meta['payload']['device_type'].toString().toLowerCase() ??
          '',
      );
      globalObject.policyNumber =
        claim.gadgetClaimMeta['policy_number'] ?? globalObject.policyNumber;
    } else if (claim.travelClaimMeta != null) {
      globalObject.policyNumber =
        claim.travelClaimMeta.policy_number ?? globalObject.policyNumber;
    }
    console.log(8);

    if (
      submissionStep == ClaimSubmissionStep.repairEstimate ||
      submissionStep == ClaimSubmissionStep.offerAccepted ||
      submissionStep == ClaimSubmissionStep.offerRejected ||
      submissionStep == ClaimSubmissionStep.thirdPartyInspected ||
      submissionStep == ClaimSubmissionStep.travelDocSubmitted
    ) {
      console.log(8);
      console.log(claim.policyId);
      await claimVm.navigateToTrackClaims(claim.policyId ?? '');
    } else {
      console.log(10);
      navigation.navigate('TravelDocumentationScreen', {
        claim: claim,
      });
    }
    console.log(11);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        showBackButton={false}
        showLogo={false}
        onBackTap={() => navigation.goBack()}
      />
      <View style={styles.paddingContainer}>
        <View style={styles.animationContainer}>
          {submissionStep === 'offerRejected' ? (
            <RejectOfferIcon width={70} height={70} />
          ) : (
            <LottieView
              source={require('../../../assets/lottie/purchase_successful.json')}
              autoPlay
              loop={true}
              style={styles.animation}
            />
          )}
        </View>

        {submissionStep === 'offerRejected' && (
          <>
            <VerticalSpacer height={20} />
            <SemiBoldText
              title="Claim Rejected"
              fontSize={17}
              color={CustomColors.blackColor}
              textAlign="center"
            />

            <VerticalSpacer height={20} />
            <Text
              style={[
                customTextStyles.regular,
                {
                  color: CustomColors.greyTextColor,
                  lineHeight: 25,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              You rejected the offer of ₦
              {claim.gadgetClaimMeta
                ? `${StringUtils.formatPriceWithComma(
                    claim.claimAmount ?? '',
                  )} for your Gadget Claim on  ${
                    detailedClaim?.policy?.meta['device_make'] +
                    ' ' +
                    (detailedClaim?.policy?.meta['device_model'] ?? '') +
                    ' ' +
                    (detailedClaim?.policy?.meta['device_type'] ?? '')
                  }`
                : `${StringUtils.formatPriceWithComma(
                    claim.claimAmount ?? '',
                  )} for your Auto Claim on  ${
                    detailedClaim?.policy?.meta['vehicle_model'] +
                    ' ' +
                    (detailedClaim?.policy?.meta['vehicle_model'] ?? '') +
                    ' ' +
                    (detailedClaim?.policy?.meta['year_of_manufacture'] ?? '')
                  }`}
              {''}.
            </Text>
          </>
        )}

        {submissionStep === ClaimSubmissionStep.repairEstimate && (
          <>
            <VerticalSpacer height={20} />

            <SemiBoldText
              title="Submission Successfully"
              fontSize={18}
              color={DynamicColors().primaryBrandColor}
              textAlign="center"
            />

            <VerticalSpacer height={20} />

            <Text
              style={[
                customTextStyles.regular,
                {
                  color: CustomColors.greyTextColor,
                  lineHeight: 25,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              Great ! Your claim details have been received and an email has
              been sent to your inbox. For easy claim tracking click the button
              below to track your claim.
            </Text>
          </>
        )}

        {submissionStep === ClaimSubmissionStep.travelDocSubmitted && (
          <>
            <VerticalSpacer height={20} />

            <SemiBoldText
              title="Claim Successfully Submitted"
              fontSize={18}
              color={DynamicColors().primaryBrandColor}
              textAlign="center"
            />

            <VerticalSpacer height={20} />

            <Text
              style={[
                customTextStyles.regular,
                {
                  color: CustomColors.greyTextColor,
                  lineHeight: 25,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              Great! Your claim documents have been received. For easy claim
              tracking click the button below to track your claim.
            </Text>
          </>
        )}

        {(submissionStep === ClaimSubmissionStep.thirdPartyClaimLodged ||
          submissionStep === ClaimSubmissionStep.thirdPartyInspected) && (
          <>
            <VerticalSpacer height={20} />

            <SemiBoldText
              title="Your claim has been submitted!"
              fontSize={18}
              color={DynamicColors().primaryBrandColor}
            />

            <VerticalSpacer height={20} />

            <Text
              style={[
                customTextStyles.regular,
                {
                  color: CustomColors.greyTextColor,
                  lineHeight: 25,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              Great news! Your claim has been successfully lodged. Click on the
              upload document button to proceed with your claim.
            </Text>
          </>
        )}

        {submissionStep === ClaimSubmissionStep.offerAccepted && (
          <>
            <VerticalSpacer height={20} />

            <SemiBoldText
              title="Congratulations, offer accepted"
              fontSize={18}
              color={DynamicColors().primaryBrandColor}
            />

            <VerticalSpacer height={20} />

            <Text
              style={[
                customTextStyles.regular,
                {
                  color: CustomColors.greyTextColor,
                  lineHeight: 25,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              Great! You have accepted the offer. ₦
              {StringUtils.formatPriceWithComma(claim.offerAmount ?? '')} will
              be transferred to the provided account, and an email has been
              dispatched to your inbox. To conveniently track your claim, simply
              click the button below.
            </Text>
          </>
        )}

        <VerticalSpacer height={30} />
        {
          submissionStep === ClaimSubmissionStep.offerAccepted ||
          submissionStep === ClaimSubmissionStep.offerRejected ||
          submissionStep == ClaimSubmissionStep.travelDocSubmitted ? (
            <></>
          ) : (
            <View>
              <View style={styles.timelineRow}>
                <CheckRoundIcon
                  width={22}
                  height={22}
                  fill={DynamicColors().primaryBrandColor}
                />

                <View style={styles.timelineTextContainer}>
                  <RegularText title="Claim Lodged" fontSize={13.5} />
                  <VerticalSpacer height={5} />
                </View>
              </View>
              <View style={styles.newDashContainer}>
                <Dash
                  // direction="vertical"
                  // length={40}
                  style={{
                    width: 1,
                    height: 50,
                    flexDirection: 'column',
                    paddingLeft: 10,
                  }}
                  dashLength={4}
                  dashThickness={2}
                  dashGap={2}
                  dashColor={DynamicColors().primaryBrandColor}
                />
              </View>

              <View style={styles.timelineRow}>
                {submissionStep == ClaimSubmissionStep.repairEstimate ||
                submissionStep == ClaimSubmissionStep.thirdPartyClaimLodged ||
                submissionStep ==
                  ClaimSubmissionStep.submitGadgetPoliceReport ? (
                  <CheckRoundIcon
                    width={22}
                    height={22}
                    fill={DynamicColors().primaryBrandColor}
                  />
                ) : (
                  <CustomCircleContainer text="2" />
                )}

                <View style={styles.timelineTextContainer}>
                  <RegularText
                    title={
                      claim.gadgetClaimMeta?.incident_type
                        .toString()
                        .toLowerCase() == 'theft' ||
                      claim.gadgetClaimMeta.incident_type
                        .toString()
                        .toLowerCase() == 'burglary'
                        ? 'Police report'
                        : submissionStep ==
                          ClaimSubmissionStep.thirdPartyClaimLodged
                        ? 'Third party information'
                        : 'Post - loss inspection'
                    }
                    fontSize={13.5}
                  />
                  <VerticalSpacer height={5} />
                </View>
              </View>

              {submissionStep ==
              ClaimSubmissionStep.submitGadgetPoliceReport ? (
                <></>
              ) : (
                <View style={styles.newDashContainer}>
                  <Dash
                    // direction="vertical"
                    // length={40}
                    style={{
                      width: 1,
                      height: 50,
                      flexDirection: 'column',
                      paddingLeft: 10,
                    }}
                    dashLength={4}
                    dashThickness={2}
                    dashGap={2}
                    dashColor={DynamicColors().primaryBrandColor}
                  />
                </View>
              )}

              <View style={styles.timelineRow}>
                {submissionStep ==
                  ClaimSubmissionStep.submitGadgetPoliceReport ||
                claim.gadgetClaimMeta.incident_type.toString().toLowerCase() ==
                  'theft' ||
                claim.gadgetClaimMeta.incident_type.toString().toLowerCase() ==
                  'burglary' ? (
                  <></>
                ) : submissionStep == ClaimSubmissionStep.repairEstimate ? (
                  <CheckRoundIcon
                    width={22}
                    height={22}
                    fill={DynamicColors().primaryBrandColor}
                  />
                ) : (
                  <CustomCircleContainer text="3" />
                )}

                {submissionStep ==
                  ClaimSubmissionStep.submitGadgetPoliceReport ||
                claim.gadgetClaimMeta.incident_type.toString().toLowerCase() ==
                  'theft' ||
                claim.gadgetClaimMeta.incident_type.toString().toLowerCase() ==
                  'burglary' ? (
                  <></>
                ) : (
                  <View style={styles.timelineTextContainer}>
                    <RegularText
                      title={
                        submissionStep ==
                        ClaimSubmissionStep.thirdPartyClaimLodged
                          ? 'Upload claim documents'
                          : 'Estimate of repair'
                      }
                      fontSize={13.5}
                    />
                    <VerticalSpacer height={5} />
                  </View>
                )}
              </View>

              {submissionStep == ClaimSubmissionStep.repairEstimate && (
                <View style={styles.newDashContainer}>
                  <Dash
                    // direction="vertical"
                    // length={40}
                    style={{
                      width: 1,
                      height: 50,
                      flexDirection: 'column',
                      paddingLeft: 10,
                    }}
                    dashLength={4}
                    dashThickness={2}
                    dashGap={2}
                    dashColor={DynamicColors().primaryBrandColor}
                  />
                </View>
              )}

              {submissionStep == ClaimSubmissionStep.repairEstimate && (
                <View style={styles.timelineRow}>
                  <CustomCircleContainer text="4" />

                  <View style={styles.timelineTextContainer}>
                    <RegularText title={'Review Claim'} fontSize={13.5} />
                    <VerticalSpacer height={5} />
                  </View>
                </View>
              )}
            </View>
          )

          // <View>
          //   <View style={styles.dashContainer}>
          //     <Dash style={styles.dash} />
          //     <View style={styles.dashRow}>
          //       <Text style={styles.dashText}></Text>
          //     </View>
          //   </View>

          //   <View style={styles.dashContainer}>
          //     <Dash style={styles.dash} />
          //     <View style={styles.dashRow}>
          //       <Text style={styles.dashText}>Post-Loss Inspection</Text>
          //     </View>
          //   </View>

          //   <View style={styles.dashContainer}>
          //     <Dash style={styles.dash} />
          //     <View style={styles.dashRow}>
          //       <Text style={styles.dashText}>Estimate of Repair</Text>
          //     </View>
          //   </View>
          // </View>
        }

        {submissionStep == ClaimSubmissionStep.travelDocSubmitted && (
          <View style={styles.claimContainer}>
            <Text style={[customTextStyles.regular, {fontSize: 14}]}>
              Your claim is under review. Once your claim has been approved, you
              will be notified via email.
            </Text>
          </View>
        )}

        <View
          style={{
            flex:
              submissionStep == ClaimSubmissionStep.travelDocSubmitted ? 4 : 2,
          }}
        />
        {/* <View style={styles.buttonContainer}>
          <CustomButton
            title="Track Claim"
            onPress={handleButtonPress}
            isLoading={isLoading}
          />
        </View> */}

        <View style={styles.buttonContainer}>
          {submissionStep == ClaimSubmissionStep.repairEstimate ||
          submissionStep == ClaimSubmissionStep.offerAccepted ||
          submissionStep == ClaimSubmissionStep.offerRejected ||
          submissionStep == ClaimSubmissionStep.thirdPartyInspected ||
          submissionStep == ClaimSubmissionStep.travelDocSubmitted ? (
            <></>
          ) : (
            <View style={styles.backbutton}>
              <CustomButton
                title="Do this later"
                onPress={() => {
                  navigation.popToTop();
                }}
                textColor={CustomColors.backTextColor}
                buttonColor={CustomColors.dividerGreyColor}
                fontSize={15}
              />
            </View>
          )}

          <View style={styles.continuebutton}>
            <CustomButton
              title={
                submissionStep == ClaimSubmissionStep.repairEstimate ||
                submissionStep == ClaimSubmissionStep.offerAccepted ||
                submissionStep == ClaimSubmissionStep.offerRejected ||
                submissionStep == ClaimSubmissionStep.thirdPartyInspected ||
                submissionStep == ClaimSubmissionStep.travelDocSubmitted
                  ? 'Track Claim'
                  : claim.gadgetClaimMeta['incident_type']
                      .toString()
                      .toLowerCase() == 'theft' ||
                    claim.gadgetClaimMeta['incident_type']
                      .toString()
                      .toLowerCase() == 'burglary'
                  ? 'Upload police report'
                  : 'Conduct Inspection'
              }
              isLoading={isLoading}
              onPress={handleButtonPress}
              // onPress={() => {
              //   return setIsLoading(false);
              // }}
            />
            {/* <Text style={styles.buttonText}>Continue</Text> */}
          </View>
          {/* <CustomButton
            title="Continue"
            onPress={onContinue}
          /> */}
        </View>
        {(submissionStep == ClaimSubmissionStep.offerRejected ||
          submissionStep == ClaimSubmissionStep.thirdPartyInspected) && (
          <View style={{flex: 1}} />
        )}
        <PoweredByFooter />
        <VerticalSpacer height={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paddingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 10,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  dashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dash: {
    width: 1,
    height: 40,
    flexDirection: 'column',
  },
  dashRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  dashText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  continuebutton: {
    flex: 1,
  },
  backbutton: {
    flex: 1,
    marginRight: 10,
  },

  newDashContainer: {
    paddingHorizontal: 10,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timelineTextContainer: {
    marginLeft: 10,
  },
  timelineList: {
    paddingHorizontal: 30,
  },

  claimContainer: {
    padding: 20,

    backgroundColor: CustomColors.lightOrangeColor,
    borderWidth: 0.4,
    borderColor: CustomColors.orangeColor,
    // borderRadius: 10,
    // margin: 20,
  },
});

export default TravelClaimSubmittedScreen;
