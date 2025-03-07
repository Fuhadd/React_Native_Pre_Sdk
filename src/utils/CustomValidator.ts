// // CustomValidator.ts

// export class CustomValidator {
//     static generalValidator({
//       value,
//       name,
//       label,
//       dataType,
//       inputType,
//       minMaxConstraint,
//       errorMsg,
//       min,
//       max,
//     }: {
//       value: string | null;
//       name: string;
//       label: string;
//       dataType: string | null;
//       inputType: string;
//       minMaxConstraint: string | null;
//       errorMsg: string | null;
//       min: number;
//       max?: number;
//     }): string | null {
//       if (!value) return `${label} field is a required field`;

//       if (inputType.toLowerCase() === "date") {
//         return this.validateDate(value, label, minMaxConstraint, min, max, errorMsg);
//       } else if (label.toLowerCase().includes('image')) {
//         return null;
//       } else if (inputType.toLowerCase() === "phone") {
//         return this.validatePhoneNumber(value, label);
//       } else {
//         return this.validateInput(value, label, minMaxConstraint, min, max, errorMsg);
//       }
//     }

//     static validateInput(
//       value: string,
//       label: string,
//       minMaxConstraint: string | null,
//       min: number | null,
//       max?: number,
//       error?: string | null
//     ): string | null {
//       try {
//         if (label.toLowerCase().includes("email")) {
//           const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//           if (!emailRegex.test(value)) {
//             return `Please enter a valid ${label}`;
//           }
//         } else if (minMaxConstraint === "value" && min !== null) {
//           const newValue = value.length === 0 ? 0 : parseInt(this.removeCommas(value), 10);
//           if (newValue < min) {
//             return `${label} cannot be less than ${min}`;
//           }
//           if (max !== undefined && newValue > max) {
//             return `${label} cannot be greater than ${max}`;
//           }
//         } else if (minMaxConstraint === "length" && min !== null) {
//           if (value.length < min) {
//             return `Enter a minimum of ${min} characters`;
//           }
//           if (max !== undefined && value.length > max) {
//             return `Enter a maximum of ${max} characters`;
//           }
//         }
//         return null;
//       } catch (e) {
//         console.error(e);
//       }
//       return null;
//     }

//     static validatePhoneNumber(value: string, label: string): string | null {
//       const phoneRegex = /^0\d{10}$/;
//       if (!phoneRegex.test(value)) {
//         return `Invalid ${label}. Use this format (080 000 0000)`;
//       }
//       return null;
//     }

//     static validateEmail(value: string, label: string): string | null {
//       const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//       if (!emailRegex.test(value)) {
//         return `Please enter a valid email`;
//       }
//       return null;
//     }

//     static validateDate(
//       value: string,
//       label: string,
//       minMaxConstraint: string | null,
//       min: number,
//       max?: number,
//       error?: string | null
//     ): string | null {
//       if (minMaxConstraint === "value") {
//         if (value.length === 0) {
//           return `${label} is a required field`;
//         } else {
//           const yearComparison = this.compareDateWithToday(value);
//           if (yearComparison < min) {
//             return `${label} requires a minimum of ${min} years`;
//           } else if (max !== undefined && yearComparison > max) {
//             return `${label} cannot be greater than ${max} years`;
//           } else {
//             return null;
//           }
//         }
//       }
//       return null;
//     }

//     static compareDateWithToday(dateString: string): number {
//       const providedDate = new Date(dateString);
//       const today = new Date();
//       const yearComparison = today.getFullYear() - providedDate.getFullYear();
//       return yearComparison;
//     }

//     static removeCommas(value: string): string {
//       return value.replace(/,/g, '');
//     }

//     static validateForm(
//       value: string,
//       label: string,
//       min: number | null,
//       errorMessage?: string | null
//     ): string | null {
//       try {
//         if (label.toLowerCase().includes("email")) {
//           const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//           if (!emailRegex.test(value)) {
//             return `Please enter a valid ${label}`;
//           }
//         } else if (label.toLowerCase().includes("phone")) {
//           const phoneRegex = /^0\d{10}$/;
//           if (!phoneRegex.test(value)) {
//             return `Invalid phone number. Use this format (080 000 0000)`;
//           }
//         } else if (min !== null && value.length < min) {
//           return errorMessage || `Please enter a valid ${label}`;
//         }
//         return null;
//       } catch (e) {
//         console.error(e);
//       }
//       return null;
//     }
//   }

export class CustomValidator {
  static generalValidator({
    value,

    name,
    label,
    dataType,
    inputType,
    required,
    minMaxConstraint,
    errorMsg,
    min,
    max,
  }: {
    value: string | null;
    name: string;
    label: string;
    dataType: string | null;
    inputType: string;
    minMaxConstraint: string | null;
    errorMsg: string | null;
    required?: boolean | null;
    min: number | null;
    max?: number | null;
  }): string | true {
    // if (!required) return true;
    if (!value) return `${label} field is a required field`;

    if (inputType.toLowerCase() === 'date') {
      return this.validateDate(
        value,
        label,
        minMaxConstraint,
        min,
        max,
        errorMsg,
      );
    } else if (label.toLowerCase().includes('image')) {
      return true;
    } else if (inputType.toLowerCase() === 'phone') {
      return this.validatePhoneNumber(value, label);
    } else {
      return this.validateInput(
        value,
        label,
        minMaxConstraint,
        min,
        max,
        errorMsg,
      );
    }
  }

  static validateInput(
    value: string,
    label: string,
    minMaxConstraint: string | null,
    min: number | null,
    max?: number | null,
    error?: string | null,
  ): string | true {
    try {
      if (label.toLowerCase().includes('email')) {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(value)) {
          return `Please enter a valid ${label}`;
        }
      } else if (minMaxConstraint === 'value') {
        const newValue =
          value.length === 0 ? 0 : parseInt(this.removeCommas(value), 10);
        if (min !== null && newValue < min) {
          return `${label} cannot be less than ${min}`;
        }
        if (max !== undefined && max !== null && newValue > max) {
          return `${label} cannot be greater than ${max}`;
        }
      } else if (
        minMaxConstraint === 'length' &&
        min !== undefined &&
        min !== null
      ) {
        if (value == null || typeof value !== 'string') {
          // If value is null or undefined, or not a string, return early or handle it as you prefer
          return `${label} field is a required field`;
        } else if (value.length < min) {
          return `Enter a minimum of ${min} characters`;
        }
        if (max !== undefined && max !== null && value.length > max) {
          return `Enter a maximum of ${max} characters`;
        }
      }
      return true;
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  static validatePhoneNumber(value: string, label: string): string | true {
    const phoneRegex = /^0\d{10}$/;
    if (!phoneRegex.test(value)) {
      return `Invalid ${label}. Use this format (080 000 0000)`;
    }
    return true;
  }

  static validateDate(
    value: string,
    label: string,
    minMaxConstraint: string | null,
    min: number | null,
    max?: number | null,
    error?: string | null,
  ): string | true {
    if (minMaxConstraint === 'value') {
      if (value.length === 0) {
        return `${label} is a required field`;
      } else {
        const yearComparison = this.compareDateWithToday(value);
        if (min !== undefined && min !== null && yearComparison < min) {
          return `${label} requires a minimum of ${min} years`;
        } else if (max !== undefined && max !== null && yearComparison > max) {
          return `${label} cannot be greater than ${max} years`;
        } else {
          return true;
        }
      }
    }
    return true;
  }

  static compareDateWithToday(dateString: string): number {
    const providedDate = new Date(dateString);
    const today = new Date();
    const yearComparison = today.getFullYear() - providedDate.getFullYear();
    return yearComparison;
  }

  static removeCommas(value: string): string {
    return value.replace(/,/g, '');
  }
}
