// // colorUtils.ts

// /**
//  * Converts a hex color code to an rgba color with the specified opacity.
//  * @param hex - The hex color code (e.g., '#3BAA90').
//  * @param opacity - The opacity value (between 0 and 1).
//  * @returns The rgba color string.
//  */
// export function hexToRgba(hex: string, opacity: number): string {
//   // Remove the hash symbol if present
//   hex = hex.replace(/^#/, '');

//   // Parse the r, g, b values
//   const r = parseInt(hex.substring(0, 2), 16);
//   const g = parseInt(hex.substring(2, 4), 16);
//   const b = parseInt(hex.substring(4, 6), 16);

//   // Return the rgba color string
//   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
// }

import {ColorValue} from 'react-native';

// Utility to convert hex to rgba color format
export class ColorUtils {
  static getColorFromHex(
    hexColor: string | null,
    defaultColor: string = 'FF3BAA90',
  ): ColorValue {
    // If hexColor is null or empty, use the default color
    if (!hexColor) {
      return ColorUtils.hexToRgba(defaultColor, 1);
    }

    // Remove the "#" if it's present
    hexColor = hexColor.toUpperCase().replace('#', '');

    // If hexColor length is 6, prepend "FF" to make it fully opaque
    if (hexColor.length === 6) {
      hexColor = 'FF' + hexColor;
    }

    // If hexColor length is not 8, return the default color
    if (hexColor.length !== 8) {
      return ColorUtils.hexToRgba(defaultColor, 1);
    }

    try {
      // Convert hex to rgba and return
      return ColorUtils.hexToRgba(hexColor, 1);
    } catch (e) {
      // In case of error, return the default color
      return ColorUtils.hexToRgba(defaultColor, 1);
    }
  }

  // Utility function to convert hex string to rgba
  // static hexToRgba(hex: string, opacity: number = 1): string {
  //   const r = parseInt(hex.substring(2, 4), 16);
  //   const g = parseInt(hex.substring(4, 6), 16);
  //   const b = parseInt(hex.substring(6, 8), 16);
  //   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  // }

  static hexToRgba(hex: string, opacity: number): string {
    // Remove the hash symbol if present
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the rgba color string
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
