import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  CheckBox,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStore} from 'zustand';
import {SpinKitFadingCircle} from 'react-native-spinkit';
import CachedImage from 'react-native-cached-image'; // Placeholder for cached network image
import CustomButton from '../components/CustomButton'; // Placeholder for your CustomButton component
import PoweredByFooter from '../components/PoweredByFooter'; // Placeholder for your PoweredByFooter component
import CustomText from '../components/CustomText'; // Placeholder for your CustomText component
import Spacer from '../components/Spacer'; // Placeholder for your Spacer component

interface ClaimInitScreenProps {}

const ClaimInitScreen: React.FC<ClaimInitScreenProps> = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const businessDetails = useStore(state => state.businessDetails);

  const handleContinue = () => {
    if (isChecked) {
      navigation.navigate('ConfirmPolicyScreen');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Spacer height={20} />
        <CustomText
          text={
            businessDetails?.sdkWelcomeScreenHeaderPreClaim ||
            'Welcome to the Claim Portal'
          }
          style={styles.headerText}
        />
        <Spacer height={20} />
        <CustomText
          text={
            businessDetails?.sdkWelcomeScreenBodyPreClaim ||
            "We're here to assist you through the claim process."
          }
          style={styles.bodyText}
          textAlign="center"
        />
        <Spacer height={30} />
        <View style={styles.imageContainer}>
          {businessDetails?.sdkBannerPurchase ? (
            <CachedImage
              source={{uri: businessDetails.sdkBannerPurchase}}
              style={styles.image}
              placeholder={<SpinKitFadingCircle color="#0000ff" size={35} />}
            />
          ) : (
            <Image
              source={require('../assets/inspectionWelcome.png')} // Replace with actual path
              style={styles.image}
            />
          )}
        </View>

        <Spacer height={30} />

        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <View style={styles.checkboxContainer}>
            <CheckBox value={isChecked} onValueChange={setIsChecked} />
            <Text style={styles.checkboxText}>
              I have read and understand this Privacy Policy.
            </Text>
          </View>
        </TouchableOpacity>

        <Spacer height={30} />

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={!isChecked}
        />

        <Spacer height={25} />

        <PoweredByFooter />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  bodyText: {
    fontSize: 14,
    color: '#333',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
});

export default ClaimInitScreen;
