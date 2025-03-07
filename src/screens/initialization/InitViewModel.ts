import {GlobalStore, useGlobalStore} from '../../store/globalStore';
import {MiscStore, useMiscStore} from '../../store/miscStore';
import InitRepository from '../../data/repositories/init_repo';
import ProductRepository from '../../data/repositories/product_repo';
import {useNavigation} from '@react-navigation/native';

import {ProductDetailsModel} from '../../models/ProductDetailsModel';
import {SdkInitializationResponse} from '../../models/SdkInitializationResponse';
import {
  getGadgetType,
  PaymentOption,
  PlanStatus,
  ProductCategory,
  ToastStatus,
  TransactionType,
} from '../../utils/enums';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import log from '../../utils/logger';
import {RootStackParamList} from '../../utils/navigatorStackList';
import globalObject from '../../store/globalObject';
import {StringUtils} from '../../utils/StringUtils';
import ClaimRepository from '../../data/repositories/claim_repo';
import {PolicyModel} from '../../models/PolicyModel';
import {ClaimViewModel} from '../claims/ClaimViewModel';
import {LoadStore, useLoadStore} from '../../store/loadStore';
import {ClaimModel} from '../../models/ClaimModel';
import PaymentRepository from '../../data/repositories/payment_repo';
import {PurchaseDetailsResponseModel} from '../../models/PurchaseDetailsResponseModel';
import {FormStore, useFormStore} from '../../store/formStore';
import {showToast} from '../../components/CustomToast';

export const InitViewModel = () => {
  const initRepository = new InitRepository();
  const claimRepository = new ClaimRepository();
  const productRepository = new ProductRepository();
  const paymentRepository = new PaymentRepository();
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const global = useGlobalStore((state: GlobalStore) => state);
  const loadStore = useLoadStore((state: LoadStore) => state);
  const formGlobal = useFormStore((state: FormStore) => state);
  // const miscGlobal = useMiscStore((state: any) => state);

  const navigation = useNavigation<NavigationProps>();

  const initialiseSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId[0],
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        log.info('data', data);

        log.debug('error1');
        log.debug('error77');
        console.log(data);
        console.log(data.businessDetails);
        globalObject.setBusinessDetails(data.businessDetails);
        // global.setBusinessDetails(data.businessDetails);
        log.debug('error77');
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null,
        );
        log.debug('error88');
        log.debug('error', data.businessDetails);
        log.info('error', data.productCategories);

        globalObject.setProductCategories(data.productCategories ?? []);
        log.debug('error2');

        // data.productCategories?.sort((a, b) => {
        //   if (!a.name || !b.name) return 0;
        //   return a.name.localeCompare(b.name);
        // });

        if (data.productCategories && data.productCategories.length > 0) {
          data.productCategories.sort((a, b) => {
            if (!a.name || !b.name) return 0;
            return a.name.localeCompare(b.name);
          });
        } else {
          log.debug('productCategories is undefined or empty');
        }
        const categoryId = data.productCategories?.[0].id ?? '';

        if (global.transactionType === TransactionType.purchase) {
          log.info('error');
        } else {
          log.info('here');
          navigation.replace('WelcomeScreen');
        }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          console.log(errorMessage);
          navigation.navigate('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseContinuePurchaseSdk = async (
    redirectError: boolean = true,
  ) => {
    try {
      if (StringUtils.isNullOrEmpty(globalObject.reference)) {
        navigation.navigate('SDKErrorScreen', {
          error: 'Payment reference cannot be null',
        });
      } else {
        const purchaseRes = await paymentRepository.getPurchaseInfo(
          globalObject.reference ?? '',
        );
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');
        console.log('zzzzzzzzzzzzzzz');

        if (purchaseRes.responseCode === 1) {
          const purchaseData = PurchaseDetailsResponseModel.fromJson(
            purchaseRes.data,
          );
          global.setReference(purchaseData.reference || '');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');
          console.log('rrrrrrrrrrrrrr');

          const res = await initRepository
            .initialiseSdk
            // global.paymentOption,
            // global.reference,
            // global.productId[0],
            ();

          if (res.responseCode === 1) {
            const data = SdkInitializationResponse.fromJson(res.data);

            log.info('data', data);

            log.debug('error1');
            log.debug('error77');
            console.log(data);
            console.log(data.businessDetails);
            globalObject.setBusinessDetails(data.businessDetails);
            // global.setBusinessDetails(data.businessDetails);
            log.debug('error77');
            globalObject.setPrimaryBrandColor(
              data.businessDetails
                ? data.businessDetails.brandColorPrimary
                : null,
            );
            log.debug('error88');
            log.debug('error', data.businessDetails);
            log.info('error', data.productCategories);

            globalObject.setProductCategories(data.productCategories ?? []);
            log.debug('error2');

            // formGlobal.updateFormData(purchaseData.payload?.data ?? {});
            if (
              purchaseData &&
              purchaseData.payload &&
              purchaseData.payload.data
            ) {
              console.log(11111111111);
              console.log(11111111111);
              console.log(11111111111);
              console.log(11111111111);

              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              console.log('rrrrrrrrrrrrrr');
              formGlobal.updateFormData(purchaseData.payload.data);
            } else {
              console.log(22222222222);
              console.log(22222222222);
              console.log(22222222222);
              console.log(22222222222);
              console.log('zzzzzzzzzzzzzzz');
              console.log('zzzzzzzzzzzzzzz');
              console.log('zzzzzzzzzzzzzzz');
              console.log('zzzzzzzzzzzzzzz');
              console.log('zzzzzzzzzzzzzzz');
              console.log('zzzzzzzzzzzzzzz');

              console.warn('No data found in purchaseData.payload');
              formGlobal.updateFormData({}); // Update with an empty object if data doesn't exist
            }

            const productRes = await productRepository.getProductDetailsById(
              purchaseData.payload?.productId ?? '',
            );
            console.log(555555);
            const productDetails = ProductDetailsModel.fromJson(
              productRes.data['products'][0],
            );

            formGlobal.setSelectedProductDetails(productDetails);
            // formGlobal.setSelectedProductCategory(productCategory);

            navigation.replace('PlanDetailsScreen', {
              purchaseDetails: purchaseData,
            });

            // data.productCategories?.sort((a, b) => {
            //   if (!a.name || !b.name) return 0;
            //   return a.name.localeCompare(b.name);
            // });

            // if (data.productCategories && data.productCategories.length > 0) {
            //   data.productCategories.sort((a, b) => {
            //     if (!a.name || !b.name) return 0;
            //     return a.name.localeCompare(b.name);
            //   });
            // } else {
            //   log.debug('productCategories is undefined or empty');
            // }
            // const categoryId = data.productCategories?.[0].id ?? '';

            // if (global.transactionType === TransactionType.purchase) {
            //   log.info('error');
            // } else {
            //   log.info('here');
            //   navigation.replace('WelcomeScreen');
            // }
          } else {
            console.error('Failed to initialize SDK', res.errors);
            if (redirectError) {
              const errorMessage =
                res.errors && res.errors.length > 0
                  ? res.errors.join(', ')
                  : res.message;

              console.log(errorMessage);
              navigation.navigate('SDKErrorScreen', {
                error: errorMessage,
              });
            }
          }
        } else {
          const errorMessage =
            purchaseRes.errors && purchaseRes.errors.length > 0
              ? purchaseRes.errors.join(', ')
              : purchaseRes.message;

          console.log(errorMessage);
          navigation.navigate('SDKErrorScreen', {
            error: errorMessage ?? '',
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseInspectionSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        log.info('data', data);

        log.debug('error1');
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null,
        );
        log.debug('error', data.businessDetails);
        log.info('error', data.productCategories);
        globalObject.setProductCategories(data.productCategories ?? []);
        log.debug('error2');

        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
        const categoryId = data.productCategories?.[0].id ?? '';
        if (StringUtils.isNullOrEmpty(globalObject.policyId)) {
          navigation.navigate('SDKErrorScreen', {
            error: 'Policy Id cannot be null',
          });
        } else {
          const policyRes = await claimRepository.getPolicyById(
            globalObject.policyId ?? '',
          );

          if (policyRes.responseCode == 1) {
            const policy = PolicyModel.fromJson(policyRes.data['policy']);
            console.log(policy);

            const productRes = await productRepository.getProductDetailsById(
              policy.productId ?? '',
            );
            const productDetails = ProductDetailsModel.fromJson(
              productRes.data['products'][0],
            );

            console.log('first');
            console.log('first');
            console.log('first');
            console.log('first');
            console.log('first');
            console.log(policy.productId);
            console.log(productRes.data['products'][0].inspectable);
            console.log(productDetails.inspectable);
            if (
              productDetails.inspectable != false ||
              (productDetails.routeName ?? '')
                .toLowerCase()
                .includes('third-party')
            ) {
              if (
                (productDetails.productCategory?.name ?? '').toLowerCase() ===
                'gadget'
              ) {
                globalObject.setGadgetType(
                  getGadgetType(
                    policy.meta['payload']['device_type']
                      .toString()
                      .toLowerCase(),
                  ),
                );
                globalObject.policyNumber =
                  policy.meta['policy_number'] ?? globalObject.policyNumber;
              }

              // if (!StringUtils.isNullOrEmptyList(policy.inspections)) {
              //   navigation.replace('SDKErrorScreen', {
              //     error: 'You have completed pre inspection for this policy',
              //   });
              // }
              // else
              // {
              navigation.replace('InspectionInitScreen', {
                claim: null,
                productCategory:
                  (productDetails.productCategory?.name ?? '').toLowerCase() ==
                  'gadget'
                    ? ProductCategory.gadget
                    : ProductCategory.auto,
              });
              // }
            } else {
              navigation.replace('SDKErrorScreen', {
                error: 'This product is not inspectable',
              });
            }
          } else {
            const errorMessage =
              policyRes.errors && policyRes.errors.length > 0
                ? policyRes.errors.join(', ')
                : policyRes.message;

            console.log(errorMessage);
            navigation.replace('SDKErrorScreen', {
              error: errorMessage ?? '',
            });
          }
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          console.log(errorMessage);
          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
    }
  };

  const initialiseClaimSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        log.info('data', data);

        log.debug('error1');
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null,
        );
        log.debug('error', data.businessDetails);
        log.info('error', data.productCategories);
        globalObject.setProductCategories(data.productCategories ?? []);
        log.debug('error2');

        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
        const categoryId = data.productCategories?.[0].id ?? '';

        if (
          StringUtils.isNullOrEmpty(globalObject.policyId)
          //  ||
          // StringUtils.isNullOrEmpty(globalObject.policyNumber) ||
          // StringUtils.isNullOrEmpty(globalObject.email

          // )
        ) {
          // navigation.navigate('ConfirmPolicyScreen');
          navigation.navigate('SDKErrorScreen', {
            error: 'Policy Id cannot be null',

            // StringUtils.isNullOrEmpty(globalObject.policyId)
            //   ?'Policy Id cannot be null'
            //   : StringUtils.isNullOrEmpty(globalObject.policyNumber)
            //   ? 'Policy Number cannot be null'
            //   : 'Customer email cannot be null',
          });
        } else if (
          // StringUtils.isNullOrEmpty(globalObject.policyId) ||
          StringUtils.isNullOrEmpty(globalObject.policyNumber) ||
          StringUtils.isNullOrEmpty(globalObject.email)
        ) {
          // navigation.navigate('ConfirmPolicyScreen');TransactionType
          navigation.navigate('ConfirmPolicyScreen', {
            transactionType: TransactionType.claim,
          });
          // navigation.navigate('SDKErrorScreen', {
          //   error: StringUtils.isNullOrEmpty(globalObject.policyId)
          //     ? 'Policy Id cannot be null'
          //     : StringUtils.isNullOrEmpty(globalObject.policyNumber)
          //     ? 'Policy Number cannot be null'
          //     : 'Customer email cannot be null',
          // });
        } else {
          await getClaimsById(
            globalObject.email ?? '',
            globalObject.policyNumber ?? '',
            loadStore,
          );
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          console.log(errorMessage);
          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.error('SDK initialization error', error);
      showToast(ToastStatus.failed, `SDK initialization error ${error}`);
    }
  };

  const getClaimsById = async (
    email: string,
    policyNumber: string,
    // productDetails: ProductDetailsModel,
    loadingState: LoadStore,
  ) => {
    try {
      // loadingState.setClaimVmLoading(true);
      console.log(111111);

      const res = await claimRepository.getClaimsById(
        globalObject.policyId ?? '',
      );
      console.log(2222222);

      const policyRes = await claimRepository.getPolicyInfo(
        email,
        policyNumber,
      );

      if (policyRes.responseCode === 1) {
        console.log(333333);
        const policy = PolicyModel.fromJson(policyRes.data);
        console.log(44444444);

        const productRes = await productRepository.getProductDetailsById(
          policy.productId ?? '',
        );
        console.log(555555);
        const productDetails = ProductDetailsModel.fromJson(
          productRes.data['products'][0],
        );
        console.log(666666);

        if (policy.product?.claimable != true) {
          showToast(
            ToastStatus.failed,
            'Selected product is not claimable, please try again',
          );
        } else if (
          res.message == 'Claim does not exist' &&
          res.responseCode == 0
        ) {
          console.log(888888);
          // loadingState.setClaimVmLoading(false);
          navigation.navigate('ConfirmPolicyInfoScreen', {
            policy,
            productDetails,
          });
        } else {
          console.log('first');
          console.log('first');
          console.log('first');
          console.log('first');
          console.log(res.data);
          const claim = ClaimModel.fromJson(res.data.claims[0]);
          // loadingState.setClaimVmLoading(false);

          if (
            productDetails?.productCategory?.name?.toLowerCase() === 'travel'
          ) {
            navigation.navigate('TravelTrackClaimsScreen', {claim});
          } else if (
            productDetails?.productCategory?.name?.toLowerCase() === 'gadget'
          ) {
            console.log('claim');
            console.log('claim');
            console.log('claim');
            console.log(claim);
            console.log('claim');
            console.log(claim.gadgetClaimMeta);
            console.log('claim');
            // console.log(claim.gadgetClaimMeta.incident_type);
            navigation.navigate('TrackGadgetClaimsScreen', {claim});
          } else {
            console.log('claim');
            console.log('claim');
            console.log('claim');
            console.log(claim);
            console.log('claim');
            console.log(claim.gadgetClaimMeta);
            console.log('claim');
            // console.log(claim.gadgetClaimMeta.incident_type);
            navigation.navigate('TrackClaimsScreen', {claim});
          }
        }
      } else {
        console.error('Failed to initialize SDK', policyRes.errors);

        const errorMessage =
          policyRes.errors && policyRes.errors?.length > 0
            ? policyRes.errors.join(', ')
            : policyRes.message;

        console.log(errorMessage);
        navigation.replace('SDKErrorScreen', {
          error: errorMessage ?? '',
        });
      }
    } catch (error) {
      // loadingState.setClaimVmLoading(false);
      console.error(error);
      showToast(
        ToastStatus.failed,
        'Selected product is not claimable, please try again',
      );
      navigation.replace('SDKErrorScreen', {
        error: 'Selected product is not claimable, please try again',
      });
    }
  };

  const initialiseRenewalSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null
        );
        globalObject.setProductCategories(data.productCategories ?? []);
  
        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
     

        if (
          StringUtils.isNullOrEmpty(globalObject.policyId) ||
          StringUtils.isNullOrEmpty(globalObject.policyNumber) ||
          StringUtils.isNullOrEmpty(globalObject.email)
        ) {
          if (StringUtils.isNullOrEmpty(globalObject.policyId)){
            navigation.navigate('SDKErrorScreen', {
              error: StringUtils.isNullOrEmpty(globalObject.policyId)
                ? 'Policy Id cannot be null'
                : StringUtils.isNullOrEmpty(globalObject.policyNumber)
                  ? 'Policy Number cannot be null'
                  : 'Customer email cannot be null',
            });
          }else{
            navigation.navigate('ConfirmPolicyScreen', {
              transactionType: TransactionType.renewal,
             });
            // navigation.navigate('SDKErrorScreen', {
            //   error: StringUtils.isNullOrEmpty(globalObject.policyId)
            //     ? 'Policy Id cannot be null'
            //     : StringUtils.isNullOrEmpty(globalObject.policyNumber)
            //       ? 'Policy Number cannot be null'
            //       : 'Customer email cannot be null',
            // });

          }

        
        } else {
          console.log("This is get claims by Id");
          console.log("This is get claims by Id2");
          console.log("This is get claims by Id3");
          console.log("This is get claims by Id4");

          navigation.navigate('ConfirmPolicyScreen', {
            transactionType: TransactionType.renewal,
           });
          // await managePolicy(
          //   globalObject.email ?? '',
          //   globalObject.policyNumber ?? '',
          //   // loadStore,
          //   // loadStore
          // );
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.log("This is get Else");
        console.log("This is get Else2");
        console.log("This is get Else3");
        console.log("This is get Else4");
        const errorMessage =
        res.errors && res.errors.length > 0
          ? res.errors.join(', ')
          : res.message;
        showToast(ToastStatus.failed, `${errorMessage}`);
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.log("This is get Catch");
      console.log("This is get Catch2");
      console.log("This is get Catch3");
      console.log("This is get Catch4");
      console.error('SDK initialization error', error);
      showToast(ToastStatus.failed, `SDK initialization error ${error}`);
    }
  };

  const initialiseManageSdk = async (redirectError: boolean = true) => {
    try {
      const res = await initRepository
        .initialiseSdk
        // global.paymentOption,
        // global.reference,
        // global.productId,
        ();

      if (res.responseCode === 1) {
        const data = SdkInitializationResponse.fromJson(res.data);
        globalObject.setBusinessDetails(data.businessDetails);
        globalObject.setPrimaryBrandColor(
          data.businessDetails ? data.businessDetails.brandColorPrimary : null
        );
        globalObject.setProductCategories(data.productCategories ?? []);
  
        data.productCategories?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
     

        if (
          StringUtils.isNullOrEmpty(globalObject.policyId) ||
          StringUtils.isNullOrEmpty(globalObject.policyNumber) ||
          StringUtils.isNullOrEmpty(globalObject.email)
        ) {
          if (StringUtils.isNullOrEmpty(globalObject.policyId)){
            navigation.navigate('SDKErrorScreen', {
              error: StringUtils.isNullOrEmpty(globalObject.policyId)
                ? 'Policy Id cannot be null'
                : StringUtils.isNullOrEmpty(globalObject.policyNumber)
                  ? 'Policy Number cannot be null'
                  : 'Customer email cannot be null',
            });
          }else{
            navigation.navigate('ConfirmPolicyScreen', {
              transactionType: TransactionType.manage,
             });
            // navigation.navigate('SDKErrorScreen', {
            //   error: StringUtils.isNullOrEmpty(globalObject.policyId)
            //     ? 'Policy Id cannot be null'
            //     : StringUtils.isNullOrEmpty(globalObject.policyNumber)
            //       ? 'Policy Number cannot be null'
            //       : 'Customer email cannot be null',
            // });

          }

        
        } else {
          console.log("This is get claims by Id");
          console.log("This is get claims by Id2");
          console.log("This is get claims by Id3");
          console.log("This is get claims by Id4");
          // navigation.navigate('ConfirmPolicyScreen', {
          //   transactionType: TransactionType.manage,
          //  });

          await managePolicy(
            globalObject.email ?? '',
            globalObject.policyNumber ?? '',
            // loadStore,
            // loadStore
          );
        }

        // if (global.transactionType === TransactionType.purchase) {
        //   log.info('error');
        // } else {
        //   log.info('here');
        //   navigation.replace('WelcomeScreen');
        // }
      } else {
        console.log("This is get Else");
        console.log("This is get Else2");
        console.log("This is get Else3");
        console.log("This is get Else4");
        const errorMessage =
        res.errors && res.errors.length > 0
          ? res.errors.join(', ')
          : res.message;
        showToast(ToastStatus.failed, `${errorMessage}`);
        console.error('Failed to initialize SDK', res.errors);
        if (redirectError) {
          const errorMessage =
            res.errors && res.errors.length > 0
              ? res.errors.join(', ')
              : res.message;

          navigation.replace('SDKErrorScreen', {
            error: errorMessage,
          });
        }
      }
    } catch (error) {
      console.log("This is get Catch");
      console.log("This is get Catch2");
      console.log("This is get Catch3");
      console.log("This is get Catch4");
      console.error('SDK initialization error', error);
      showToast(ToastStatus.failed, `SDK initialization error ${error}`);
    }
  };

  // const getClaimsById = async (
  //   email: string,
  //   policyNumber: string,
  //   redirectToErrorScreen: boolean = true
  //   // productDetails: ProductDetailsModel,
  //   // loadingState: LoadStore
  // ) => {
  //   try {
  //     // loadingState.setClaimVmLoading(true);

  //     const res = await claimRepository.getClaimsById(
  //       globalObject.policyId ?? ''
  //     );

  //     const policyRes = await claimRepository.getPolicyInfo(
  //       email,
  //       policyNumber
  //     );

  //     if (policyRes.responseCode === 1) {
  //       const policy = PolicyModel.fromJson(policyRes.data);

  //       const productRes = await productRepository.getProductDetailsById(
  //         policy.productId ?? ''
  //       );

  //       const productDetails = ProductDetailsModel.fromJson(
  //         productRes.data['products'][0]
  //       );

  //       if (policy.product?.claimable != true) {

  //         if(redirectToErrorScreen){
  //           navigation.replace('SDKErrorScreen', {
  //             error: "Selected product is not claimable, please try again",
  //           });


  //         }else{
  //           showToast(
  //             ToastStatus.failed,
  //             'Selected product is not claimable, please try again'
  //           );


  //         }
        
  //       } else if (
  //         res.message == 'Claim does not exist' &&
  //         res.responseCode == 0
  //       ) {
  //         // loadingState.setClaimVmLoading(false);
  //         navigation.navigate('ConfirmPolicyInfoScreen', {
  //           policy,
  //           productDetails,
  //         });
  //       } else {
  //         const claim = ClaimModel.fromJson(res.data);
  //         // loadingState.setClaimVmLoading(false);

  //         if (
  //           productDetails?.productCategory?.name?.toLowerCase() === 'travel'
  //         ) {
  //           navigation.navigate('TrackTravelClaimsScreen', { claim });
  //         } else if (
  //           productDetails?.productCategory?.name?.toLowerCase() === 'gadget'
  //         ) {
  //           navigation.navigate('TrackGadgetClaimsScreen', { claim });
  //         } else {
  //           navigation.navigate('TrackClaimsScreen', { claim });
  //         }
  //       }
  //     } else {
  //       const errorMessage =
  //       policyRes.errors && policyRes.errors?.length > 0
  //         ? policyRes.errors.join(', ')
  //         : policyRes.message;


  //       if(redirectToErrorScreen){
  //         navigation.replace('SDKErrorScreen', {
  //           error: errorMessage ?? '',
  //         });

  //       }else{
  //         showToast(
  //           ToastStatus.failed,
  //           errorMessage ?? '')
  //       }

       

       
  //     }
  //   } catch (error) {
  //     // loadingState.setClaimVmLoading(false);
  //     console.error(error);
  //     showToast(
  //       ToastStatus.failed,
  //       'Selected product is not claimable, please try again'
  //     );
  //   }
  // };

  const managePolicy = async (
    email: string,
    policyNumber: string,
    redirectToErrorScreen: boolean = true
    // productDetails: ProductDetailsModel,
    // loadingState: LoadStore
  ) => {
    try {
      // loadingState.setClaimVmLoading(true);

      const res = await productRepository.managePolicy(
        email,
        policyNumber,
      );

      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");


      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

      if (res.responseCode === 1) {
        const policy = PolicyModel.fromJson(res.data['policy']);

        const productRes = await productRepository.getProductDetailsById(
          policy.productId ?? ''
        );

        const productDetails = ProductDetailsModel.fromJson(
          productRes.data['products'][0]
        );

        globalObject.policyId = policy.id ?? globalObject.policyId;

        console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");


      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

      console.log(res.data);
      console.log("Manage Policy");
      console.log(policy);

      console.log(policy.productId ?? '');
      // console.log(productRes.data);

        if (
          (productDetails.productCategory?.name ?? '').toLowerCase() ===
          'gadget'
        ) {
          globalObject.setGadgetType(
            getGadgetType(
              policy.meta['payload']['device_type']
                .toString()
                .toLowerCase()
            )
          );
          globalObject.policyNumber =
            policy.meta['policy_number'] ?? globalObject.policyNumber;
        }

        console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");


      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");
      console.log("Manage Policy1");
      console.log("Manage Policy");

        navigation.replace('ManagePlanDetailsScreen', {
          plan: policy,
          productDetails:productDetails,
          status: policy.active == true
          ? PlanStatus.active
          : PlanStatus.expired,
        });
      }else{
        const errorMessage =
        res.errors && res.errors?.length > 0
          ? res.errors.join(', ')
          : res.message;

          navigation.replace('SDKErrorScreen', {
            error: errorMessage ?? '',
          });
      }  
    } catch (error) {
      // loadingState.setClaimVmLoading(false);
      console.error(error);
      showToast(
        ToastStatus.failed,
        'Selected product is not claimable, please try again'
      );
    }
  };

  return {
    initialiseSdk,
    initialiseInspectionSdk,
    initialiseClaimSdk,
    initialiseContinuePurchaseSdk,
    getClaimsById,
    managePolicy,
    initialiseRenewalSdk,
    initialiseManageSdk,
  };
};




