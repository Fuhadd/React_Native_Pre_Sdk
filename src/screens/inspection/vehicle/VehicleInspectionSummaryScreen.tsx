import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Circle} from 'react-native-animated-spinkit';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {InspectStore, useInspectStore} from '../../../store/inspectStore';
import {FileData} from '../../purchase/form/components/CustomImagePicker';
import Orientation from 'react-native-orientation-locker';
import {HorizontalSpacer, VerticalSpacer} from '../../../components/Spacer';
import {InspectionViewModel} from '../InspectionViewModel';
import {LoadStore, useLoadStore} from '../../../store/loadStore';
import {RootStackParamList} from '../../../utils/navigatorStackList';
import FileRepository from '../../../data/repositories/file_repo';

import {ToastStatus} from '../../../utils/enums';
import globalObject from '../../../store/globalObject';
import {
  customTextStyles,
  RegularText,
  SemiBoldText,
} from '../../../components/CustomText';
import {CustomColors, DynamicColors} from '../../../constants/CustomColors';
import {Video} from 'react-native-compressor';
import CustomButton from '../../../components/CustomButton';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import {VideoUtils} from '../../../utils/VideoUtils';
import {showToast} from '../../../components/CustomToast';
const {width} = Dimensions.get('window');
// const fileRepository = new FileRepository();

interface VehicleInspectionSummaryScreenProps {
  videoFile: FileData;
}

type VehicleInspectionSummaryScreenRouteProps = RouteProp<
  RootStackParamList,
  'VehicleInspectionSummaryScreen'
>;

const VehicleInspectionSummaryScreen: React.FC<
  VehicleInspectionSummaryScreenProps
> = () => {
  const fileRepository = new FileRepository();
  const route = useRoute<VehicleInspectionSummaryScreenRouteProps>();
  const {videoFile} = route.params;
  const loadingState = useLoadStore((state: LoadStore) => state);

  const [progress, setProgress] = useState(0);
  const [isInspectionLoading, setIsInspectionLoading] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const inspectionVM = InspectionViewModel();
  const vehicleImage = useInspectStore(
    (state: InspectStore) => state.vehicleImage,
  );

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

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const handleVideoUpload = async () => {
    setIsLoading(true);
    var compressedVideoUrl: string | null = null;

    const fileSize = await VideoUtils.getFileSize(
      videoFile
        ? {uri: `file://${videoFile.uri}`, name: videoFile.name}
        : {uri: 'file://path/to/video.mp4', name: 'video.mp4'},
    );
    console.log('fileSize');
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    console.log(fileSize);
    showToast(ToastStatus.failed, fileSize?.toString());

    if (fileSize && fileSize > 90) {
      compressedVideoUrl = await VideoUtils.compressVideo(
        videoFile
          ? {uri: `file://${videoFile.uri}`, name: videoFile.name}
          : {uri: 'file://path/to/video.mp4', name: 'video.mp4'},
        setIsInspectionLoading,
      );

      const newfileSize = await VideoUtils.getFileSize(
        videoFile
          ? {uri: `file://${compressedVideoUrl ?? ''}`, name: videoFile.name}
          : {uri: 'file://path/to/video.mp4', name: 'video.mp4'},
      );

      console.log('newfileSize');
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      console.log(newfileSize);
      showToast(ToastStatus.failed, newfileSize?.toString());
    }

    setIsLoading(false);
    try {
      setIsLoading(true);

      const newVideoUrl: FileData = {
        uri:
          fileSize && fileSize > 90 && compressedVideoUrl
            ? compressedVideoUrl
            : videoFile?.uri ?? '',

        name: videoFile?.name ?? '',
      };

      console.log('Uploading :', newVideoUrl);
      console.log('Uploading :', newVideoUrl);

      const res = await fileRepository.uploadFile(
        newVideoUrl!,
        'video',

        fileSize && fileSize > 90 && compressedVideoUrl ? true : false,
        isInspectionLoading,
        setIsInspectionLoading,
      );

      if ((res.responseCode = 1)) {
        await submitAutoInspection(res.data['file_url']);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Upload failed:', error);
      Alert.alert(error?.toString() ?? 'Failed');
    }
  };

  const submitAutoInspection = async (videoUrl: string) => {
    try {
      console.log('videoUrl', videoUrl);
      console.log('add', globalObject.inspectionAddress?.toString());
      console.log('log', globalObject.inspectionLongitude?.toString());
      console.log('lat', globalObject.inspectionLatitude?.toString());
      console.log('POLICY ID', globalObject.policyId);
      const result = await inspectionVM.submitAutoInspection({
        vehicleImages: vehicleImage,
        loadingState: loadingState, // Your loading state management
        videoUrl: videoUrl,
        address: globalObject.inspectionAddress?.toString() ?? '',
        longitude: globalObject.inspectionLongitude?.toString() ?? '',
        latitude: globalObject.inspectionLatitude?.toString() ?? '',
        inspectionType: 'vehicle',
        timeStamp: new Date().toString(),
        policyId: globalObject.policyId ?? globalObject.claimId ?? '', // Optional
      });
      // console.log(result);

      // Use functional update to revert to the previous verification step after verification
    } catch (error) {
      console.log({error});
      console.log({error});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <VerticalSpacer height={30} />
          <SemiBoldText
            title="Inspection Summary"
            color={CustomColors.backTextColor}
            fontSize={23}
            textAlign="center"
          />
          <VerticalSpacer height={20} />
          <RegularText
            title="See below the summary of your inspection"
            color={CustomColors.lightGrayTextColor}
            fontSize={17}
            textAlign="center"
          />
          <VerticalSpacer height={20} />

          <View style={styles.row}>
            <InspectionSummaryContainer sideName="left" />
            <HorizontalSpacer width={10} />
            <InspectionSummaryContainer sideName="front" />
          </View>
          <View style={styles.row}>
            <InspectionSummaryContainer sideName="rear" />
            <HorizontalSpacer width={10} />
            <InspectionSummaryContainer sideName="right" />
          </View>
          <View style={styles.row}>
            <InspectionSummaryContainer sideName="vin" />
            <HorizontalSpacer width={10} />
            <InspectionSummaryContainer sideName="interior" />
          </View>
          <View style={styles.row}>
            <InspectionSummaryContainer sideName="dashboard" />
            <HorizontalSpacer width={10} />
            <View style={{flex: 1}}></View>
          </View>
          <CustomButton
            title="Submit Inspection"
            onPress={handleVideoUpload}
            isLoading={isLoading}
          />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={handleVideoUpload}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Submit Inspection</Text>
            )}
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.spinnerContainer}>
            <Circle size={35} color={DynamicColors().primaryBrandColor} />
          </View>
          <SemiBoldText
            title="Submitting your inspection..."
            color={CustomColors.whiteColor}
            fontSize={18}
          />
          <VerticalSpacer height={20} />

          <View style={styles.footerRow}>
            {/* Progress Bar */}
            <Progress.Bar
              progress={isInspectionLoading / 100}
              width={width - 150} // Adjust the width to fit with text
              color="#FFF"
            />
            {/* Progress Text with White Background */}
            <View style={styles.textContainer}>
              <SemiBoldText
                title={`${isInspectionLoading.toString()}%`}
                color={DynamicColors().primaryBrandColor}
              />
            </View>
          </View>
          {/* <Progress.Bar
            progress={loadingState.uploadProgress/100}
            width={width - 40}
            color="#FFF"
          />
          <SemiBoldText
            title={loadingState.uploadProgress.toString()}
            color={DynamicColors().primaryBrandColor}
          /> */}
        </View>
      )}
    </SafeAreaView>
  );
};

interface InspectionSummaryContainerProps {
  sideName: string;
}

const InspectionSummaryContainer: React.FC<InspectionSummaryContainerProps> = ({
  sideName,
}) => {
  const vehicleImage = useInspectStore(
    (state: InspectStore) => state.vehicleImage,
  );
  const image = vehicleImage[sideName]; // Replace with logic to fetch the image based on sideName

  return (
    <View style={styles.containerSummary}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image.uri}} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>
      <VerticalSpacer height={5} />
      <Text
        style={[
          customTextStyles.regular,
          {fontSize: 15, color: CustomColors.greyTextColor},
        ]}>
        {'vehicle'}{' '}
        <Text
          style={[
            customTextStyles.w500,
            {fontSize: 15, color: DynamicColors().primaryBrandColor},
          ]}>
          {sideName}{' '}
        </Text>
        view
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  containerSummary: {
    flex: 1,
    height: 150,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: CustomColors.whiteColor,
    borderRadius: 25,
    height: 50,
    width: 50,
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#EEE',
  },
  placeholderText: {
    color: '#AAA',
    fontSize: 16,
  },
  sideText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerRow: {
    flexDirection: 'row', // To arrange items in a row
    alignItems: 'center', // To align items vertically centered
  },
  textContainer: {
    backgroundColor: '#FFF', // White background for the text
    borderRadius: 5, // Border radius for the text container
    padding: 5, // Add padding for some space around the text
    marginLeft: 10, // Add space between the progress bar and text
  },
});

export default VehicleInspectionSummaryScreen;

// async function compressVideo(fileData: FileData, loadStore: LoadStore) {
//   try {
//     const compressedVideoUri = await Video.compress(
//       fileData.uri,
//       {
//         compressionMethod: 'auto', // You can choose 'auto' or specify your quality levels
//         // quality: 0.7, // You can specify 'low', 'medium', or 'high'
//       },
//       progress => {
//         const scaledProgress = Math.ceil(progress * 80); // Scale to 80 instead of 100
//         loadStore.setUploadProgress(scaledProgress);
//         console.log('Compression Progress: ', scaledProgress);
//       },
//     );
//     console.log('Compressed Video URI:', compressedVideoUri);
//     return compressedVideoUri;
//   } catch (error) {
//     console.error('Error compressing video:', error);
//     return null;
//   }
// }

// async function getFileSize(fileData: FileData): Promise<number | null> {
//   try {
//     try {
//       // const response = await fetch(fileData.uri);
//       // const blob = await response.blob();
//       // const fileSizeInBytes = blob.size;
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);

//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // console.log(fileSizeInBytes);
//       // return fileSizeInBytes;
//       const stats = await RNFS.stat(fileData.uri);

//       const sizeInMB = Number(stats.size) / (1024 * 1024);
//       return sizeInMB;
//     } catch (error) {
//       console.error('Error fetching file size:', error);
//       return null;
//     }

//     //   // Get the content length from the response headers
//     //   const contentLength = response.headers.get('Content-Length');
//     //   console.log(contentLength);
//     //   console.log(contentLength);

//     //   if (contentLength) {
//     //     const fileSizeInBytes = parseInt(contentLength, 10);
//     //     console.log(fileSizeInBytes);
//     //     return fileSizeInBytes;
//     //   }

//     //   return null; // Size could not be determined
//   } catch (error) {
//     console.error('Error fetching file size:', error);
//     return null;
//   }
// }
