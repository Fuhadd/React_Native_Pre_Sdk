import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {CustomColors, DynamicColors} from '../constants/CustomColors';

interface ShimmerLoaderProps {
  height?: number;
  width?: number | string;
  color?: string;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  height = 10,
  width = '100%',
  color = DynamicColors().primaryBrandColor,
}) => {
  return (
    <ShimmerPlaceholder
      style={{width: '100%', height: '100%'}}
      // shimmerColors={['#FFBDBA', '#FF9C6D', '#FFBDBA']}
      location={[0.3, 0.5, 0.7]}
      shimmerWidthPercent={20}
    />
  );
};

const styles = StyleSheet.create({
  shimmer: {
    width: '100%',
    height: '100%',
  },
});

export default ShimmerLoader;
