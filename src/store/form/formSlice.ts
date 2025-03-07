// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface FormState {
//   formData: Map<string, any>;
// }

// export interface UpdateFormDataPayload {
//   key: string;
//   value: any;
// }

// const initialState: FormState = {
//   formData: new Map<string, any>(),
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     updateFormData: (state, action: PayloadAction<UpdateFormDataPayload>) => {
//       const {key, value} = action.payload;
//       state.formData.set(key, value);
//     },

//     clearFormData: state => {
//       state.formData = new Map<string, any>();
//     },
//   },
// });

// export const {updateFormData, clearFormData} = formSlice.actions;

// export default formSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FormState {
  formData: {[key: string]: any}; // Use an object instead of Map
}

export interface UpdateFormDataPayload {
  key: string;
  value: any;
}

const initialState: FormState = {
  formData: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<UpdateFormDataPayload>) => {
      const {key, value} = action.payload;
      state.formData[key] = value; // Update the object instead of Map
    },
    clearFormData: state => {
      state.formData = {};
    },
  },
});

export const {updateFormData, clearFormData} = formSlice.actions;

export default formSlice.reducer;
