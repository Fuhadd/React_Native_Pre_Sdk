import {create} from 'zustand';
import {
  CarVerificationStep,
  PaymentOption,
  PhoneVerificationStep,
  TransactionType,
} from '../utils/enums';
import {SdkInitializationResponse} from '../models/SdkInitializationResponse';
import {ProductCategoriesModel} from '../models/ProductCategoriesModel';
import {BusinessDetailsModel} from '../models/BusinessDetailsModel';
import {ProviderModel} from '../models/ProviderModel';
import {ProductDetailsModel} from '../models/ProductDetailsModel';
import {FileData} from '../screens/purchase/form/components/CustomImagePicker';
import log from '../utils/logger';

export interface InspectStoreState {
  verificationStep: CarVerificationStep;
  phoneVerificationStep: PhoneVerificationStep;
  verifiedCount: number;
  retryCount: number;
  selectedImageFile: FileData | null;
  vehicleImageUrl: Record<string, string>;
  vehicleImage: Record<string, FileData>;
  gadgetImage: Record<string, FileData>;
}

export interface InspectStoreActions {
  setVerificationStep: (verificationStep: CarVerificationStep) => void;
  setPhoneVerificationStep: (
    phoneVerificationStep: PhoneVerificationStep,
  ) => void;
  setVerifiedCount: (verifiedCount: number) => void;
  setRetryCount: (retryCount: number) => void;
  setSelectedImageFile: (selectedImageFile: FileData) => void;

  setVehicleImageUrl: (key: string, value: string) => void;
  clearVehicleImageUrl: () => void;

  setVehicleImage: (key: string, value: FileData) => void;
  clearVehicleImage: () => void;

  setGadgetImage: (key: string, value: FileData) => void;
  clearGadgetImage: () => void;

  // Reset functions
  resetVerificationStep: () => void;
  resetPhoneVerificationStep: () => void;
  resetVerifiedCount: () => void;
  resetRetryCount: () => void;
  resetSelectedImageFile: () => void;
  resetVehicleImageUrl: () => void;
  resetVehicleImage: () => void;
  resetGadgetImage: () => void;
}

export interface InspectStore extends InspectStoreState, InspectStoreActions {}

export const useInspectStore = create<InspectStore>(set => ({
  verificationStep: CarVerificationStep.frontSidePreCapture,
  phoneVerificationStep:
    PhoneVerificationStep.phoneFrontPreCapture as PhoneVerificationStep,
  verifiedCount: 0,
  retryCount: 0,
  selectedImageFile: null as FileData | null,
  vehicleImageUrl: {} as Record<string, any>,
  vehicleImage: {} as Record<string, FileData>,
  gadgetImage: {} as Record<string, FileData>,

  setVerificationStep: step => {
    console.log('iiii => ', step);
    const init = useInspectStore.getState().verificationStep;
    console.log('init => ', init);
    return set(() => ({verificationStep: step}));
  },

  setPhoneVerificationStep: (phoneVerificationStep: PhoneVerificationStep) =>
    set(() => ({phoneVerificationStep})),

  setVerifiedCount: (verifiedCount: number) => set(() => ({verifiedCount})),
  setRetryCount: (retryCount: number) => set(() => ({retryCount})),
  setSelectedImageFile: (selectedImageFile: FileData) =>
    set(() => ({selectedImageFile})),

  setVehicleImageUrl: (key: string, value: any) =>
    set((state: InspectStoreState & InspectStoreActions) => {
      const updatedVehicleImageUrl = state.vehicleImageUrl;
      updatedVehicleImageUrl[key] = value;
      return {vehicleImageUrl: updatedVehicleImageUrl};
    }),

  clearVehicleImageUrl: () =>
    set(() => {
      return {vehicleImageUrl: {} as Record<string, any>};
    }),

  setVehicleImage: (key: string, value: FileData) =>
    set((state: InspectStoreState & InspectStoreActions) => {
      const updatedVehicleImage = state.vehicleImage;
      updatedVehicleImage[key] = value;
      return {vehicleImage: updatedVehicleImage};
    }),

  clearVehicleImage: () =>
    set(() => {
      return {vehicleImage: {} as Record<string, any>};
    }),

  setGadgetImage: (key: string, value: FileData) =>
    set((state: InspectStoreState & InspectStoreActions) => {
      const updatedGadgetImage = state.gadgetImage;
      updatedGadgetImage[key] = value;
      return {gadgetImage: updatedGadgetImage};
    }),

  clearGadgetImage: () =>
    set(() => {
      return {gadgetImage: {} as Record<string, any>};
    }),

  // Reset functions
  resetVerificationStep: () =>
    set(() => ({verificationStep: CarVerificationStep.frontSidePreCapture})),

  resetPhoneVerificationStep: () =>
    set(() => ({
      phoneVerificationStep: PhoneVerificationStep.phoneFrontPreCapture,
    })),

  resetVerifiedCount: () => set(() => ({verifiedCount: 0})),

  resetRetryCount: () => set(() => ({retryCount: 0})),

  resetSelectedImageFile: () => set(() => ({selectedImageFile: null})),

  resetVehicleImageUrl: () =>
    set(() => ({vehicleImageUrl: {} as Record<string, string>})),

  resetVehicleImage: () =>
    set(() => ({vehicleImage: {} as Record<string, FileData>})),

  resetGadgetImage: () =>
    set(() => ({gadgetImage: {} as Record<string, FileData>})),
}));
