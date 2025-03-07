import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../utils/navigatorStackList';
import log from '../../../utils/logger';
import ProductRepository from '../../../data/repositories/product_repo';
import {useGlobalStore} from '../../../store/globalStore';
import {useMiscStore} from '../../../store/miscStore';
import {ProductDetailsModel} from '../../../models/ProductDetailsModel';
import {ProviderModel} from '../../../models/ProviderModel';
import FormRepository from '../../../data/repositories/form_repo';

import {ToastStatus} from '../../../utils/enums';
import globalObject from '../../../store/globalObject';
import {showToast} from '../../../components/CustomToast';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const ProductViewModel = () => {
  const productRepository = new ProductRepository();
  const miscGlobal = useMiscStore((state: any) => state);

  const getAllInsuranceProviders = async () => {
    try {
      const res = await productRepository.getAllInsuranceProviders();

      if (res.responseCode === 1) {
        const providers = res.data.providers || [];

        providers.sort((a: any, b: any) => {
          if (!a.companyName || !b.companyName) return 0;
          return a.companyName.localeCompare(b.companyName);
        });

        miscGlobal.setAllProviders(providers.filter((p: any) => p.companyName));
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      log.error('Request Failed', error);

      showToast(ToastStatus.failed, `${error}`);
    }
  };

  const getInsuranceProviders = async (
    categoryId: string,
    providerIds?: string[],
  ) => {
    try {
      await getProductDetails(categoryId, providerIds);
      const res = await productRepository.getInsuranceProviders(categoryId);

      if (res.responseCode === 1) {
        const providers = (res.data.providers || []).map((provider: any) =>
          ProviderModel.fromJson({
            ...provider,
            companyName: provider.companyName || 'Unnamed Provider',
          }),
        );

        providers.sort((a: ProviderModel, b: ProviderModel) => {
          if (!a.companyName || !b.companyName) return 0;
          return a.companyName.localeCompare(b.companyName);
        });

        miscGlobal.setProductProviderList(providers);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
    }
  };

  const getProductDetails = async (
    categoryId: string,
    providerIds?: string[],
  ) => {
    try {
      const res = await productRepository.getProductDetails({
        categoryId,
        providerIds,
        priceStaticFrom: miscGlobal.filterFromNaira,
        priceStaticTo: miscGlobal.filterToNaira,
        priceDynamicFrom: miscGlobal.filterFromPercent,
        priceDynamicTo: miscGlobal.filterToPercent,
      });

      if (res.responseCode === 1) {
        const products = (res.data.products as any[]).map(e =>
          ProductDetailsModel.fromJson(e),
        );

        const sortedProducts = products.sort(function (a, b) {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });

        miscGlobal.setProductList(sortedProducts);
      } else {
        const errorMessage =
          res.errors && res.errors.length > 0
            ? res.errors.join(', ')
            : res.message;

        showToast(ToastStatus.failed, errorMessage);
      }
    } catch (error) {
      showToast(ToastStatus.failed, `${error}`);
    }
  };

  const initialize = async () => {
    await getAllInsuranceProviders();
    const firstCategoryId = globalObject.productCategories[0]?.id;
    if (firstCategoryId) {
      await getInsuranceProviders(firstCategoryId);
    }
  };

  return {
    getAllInsuranceProviders,
    getInsuranceProviders,
    getProductDetails,
    initialize,
  };
};
