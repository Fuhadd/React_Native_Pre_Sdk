import {useClaimStore} from '../store/claimStore';
import {useFormStore} from '../store/formStore';
import {useInspectStore} from '../store/inspectStore';
import {useLoadStore} from '../store/loadStore';
import {useMiscStore} from '../store/miscStore';

class ProviderUtils {
  static resetAllProviders() {
    // Reset payment-related state
    const loadStore = useLoadStore.getState();
    const miscStore = useMiscStore.getState();
    const formStore = useFormStore.getState();
    const inspectStore = useInspectStore.getState();
    const claimStore = useClaimStore.getState();

    // Reset Miscellaneous Store
    miscStore.resetPaymentOption();
    miscStore.resetPublicKey();
    miscStore.resetOnComplete();
    miscStore.resetOnClose();
    miscStore.resetIsContactFieldsEditable();
    miscStore.resetInitResponse();
    miscStore.resetProductCategories();
    miscStore.resetBusinessDetails();
    miscStore.resetAllProvidersList();
    miscStore.resetProductProviderList();
    miscStore.resetSelectedproductProviderList();
    miscStore.resetSelectedAllProviders();
    miscStore.resetProductList();
    miscStore.resetTempSelectedproductProviderList();
    miscStore.resetTempSelectedAllProviders();

    // Reset Form Store
    formStore.resetFormData();
    formStore.resetUrlFormData();
    formStore.resetImageList();
    formStore.resetImagePlaceholder();
    formStore.resetProductPrice();
    formStore.resetAutoValidate();
    formStore.resetSelectedBank();
    formStore.resetFormErrors();
    formStore.resetShouldValidateImageplusDrop();
    formStore.resetGlobalItemList();
    formStore.resetGlobalItemPair();

    // Reset Inspect Store
    inspectStore.resetVerificationStep();
    inspectStore.resetPhoneVerificationStep();
    inspectStore.resetVerifiedCount();
    inspectStore.resetRetryCount();
    inspectStore.resetSelectedImageFile();
    inspectStore.resetVehicleImageUrl();
    inspectStore.resetVehicleImage();
    inspectStore.resetGadgetImage();

    // Reset Claim Store
    claimStore.resetSelectedBank();
    claimStore.resetAccountDetails();
    claimStore.resetThirdPartyIncidentType();
    claimStore.resetThirdPartyDateOfIncident();
    claimStore.resetThirdPartyAccidentTime();
    claimStore.resetThirdPartyPolicyProvider();
    claimStore.resetThirdPartyDamageType();

    // Reset loading progress in LoadStore
    loadStore.resetUploadProgress();
    loadStore.resetPaymentVmLoading();
    loadStore.resetFormVmLoading();
    loadStore.resetClaimVmLoading();
    loadStore.resetInspectVmLoading();
    loadStore.resetFormImageVmLoading();
  }

  static resetAllFormProviders() {
    const formStore = useFormStore.getState();

    // Reset Form Store
    formStore.resetFormData();
    formStore.resetUrlFormData();
    formStore.resetImageList();
    formStore.resetImagePlaceholder();
    formStore.resetProductPrice();
    formStore.resetAutoValidate();
    formStore.resetSelectedBank();
    formStore.resetFormErrors();
    formStore.resetShouldValidateImageplusDrop();
    formStore.resetGlobalItemList();
    formStore.resetGlobalItemPair();
  }

  static resetVerificationProviders() {
    const inspectStore = useInspectStore.getState();

    // Reset Verification in Inspect Store
    inspectStore.resetVerificationStep();
    inspectStore.resetPhoneVerificationStep();
    inspectStore.resetVerifiedCount();
    inspectStore.resetRetryCount();
    inspectStore.resetSelectedImageFile();
    inspectStore.resetVehicleImageUrl();
    inspectStore.resetVehicleImage();
    inspectStore.resetGadgetImage();
  }

  static resetMiscProviders() {
    const formStore = useFormStore.getState();
    const claimStore = useClaimStore.getState();

    // Reset filter-related providers
    formStore.resetFormData(); // Reset filters related to Form data

    // Reset incident-related providers in Claim Store
    claimStore.resetThirdPartyIncidentType();
    claimStore.resetThirdPartyDateOfIncident();
    claimStore.resetThirdPartyAccidentTime();
    claimStore.resetThirdPartyPolicyProvider();

    // Reset bank list and account details providers in Claim Store
    claimStore.resetSelectedBank();
    claimStore.resetAccountDetails();

    // Reset damage type and image-related providers
    claimStore.resetThirdPartyDamageType();

    // Reset image-related providers in Inspect Store
    const inspectStore = useInspectStore.getState();
    inspectStore.resetGadgetImage();
    inspectStore.resetVehicleImage();
    inspectStore.resetSelectedImageFile();
  }
}

export default ProviderUtils;
