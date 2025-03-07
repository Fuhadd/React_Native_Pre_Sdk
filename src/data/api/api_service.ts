import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {consoleTransport, logger} from 'react-native-logs';
import log from '../../utils/logger';
import globalObject from '../../store/globalObject';
import {GlobalStore, useGlobalStore} from '../../store/globalStore';

interface ApiResponseModel {
  data: any;
  responseCode?: number;
  responseText?: string;
  path?: string;
  message: string;
  errors?: string[];
}

interface ErrorResponse {
  responseText?: string;
  responseCode?: number;
  path?: string;
}

interface SuccessResponse {
  responseText?: string;
  responseCode?: number;
  data: any;
}

// Success and failure interfaces
interface Success {
  responseText?: string;
  responseCode?: number;
  data: any;
}

interface Failure {
  message: string;
  responseCode?: number;
  errors?: string[];
}

// Check if the error data contains message and errors fields
function isAxiosErrorData(
  data: any,
): data is {message?: string; errors?: string[]} {
  return typeof data === 'object' && data !== null && 'message' in data;
}

function isErrorResponse(data: any): data is ErrorResponse {
  return data && typeof data === 'object' && 'responseText' in data;
}

class ApiService {
  private api;
  // const global = useGlobalStore((state: GlobalStore) => state);

  constructor(baseURL: string, isFormData: boolean = false) {
    this.api = axios.create({
      baseURL: baseURL || 'https://staging.api.mycover.ai/v2',
      // timeout: 100000000,
      headers: isFormData
        ? {
            Authorization: `Bearer ${
              globalObject.publicKey ??
              // useGlobalStore((state: GlobalStore) => state).publicKey ??
              null
            }`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        : {
            Authorization: `Bearer ${
              globalObject.publicKey ??
              // useGlobalStore((state: GlobalStore) => state).publicKey ??
              null
            }`,
            'Content-Type': 'application/json',
          },
    });
    console.log(11111111111111);
    console.log(222222222222222);
    console.log(3333333333333333);
    console.log(globalObject.publicKey);
    console.log(globalObject.publicKey);
    console.log(globalObject.publicKey);
    console.log(this.api.interceptors.request);

    // Log headers before each request
    this.api.interceptors.request.use(
      config => {
        console.log('Request Headers:', config.headers);
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  // Handle successful response
  private handleSuccess(response: AxiosResponse): AxiosResponse {
    log.debug('response data', JSON.stringify(response.data, null, 2));

    return response;
  }

  private convertSuccessResponse(response: any | undefined): ApiResponseModel {
    let data = null;
    let responseCode = null;
    let responseText = null;
    let message = null;
    let path = null;
    let errors = null;

    // Check if the response is an AxiosResponse
    if (
      response &&
      typeof response === 'object' &&
      'data' in response &&
      'status' in response
    ) {
      // Handle AxiosResponse where fields are in `response.data`
      data = response?.data?.data ?? null;
      responseCode = response?.data?.responseCode ?? null;
      responseText = response?.data?.responseText ?? null;
      message = response?.data?.message ?? null;
      path = response?.data?.path ?? null;
      errors = response?.data?.errors ?? null;
    } else {
      // Handle non-AxiosResponse where fields are directly in `response`
      data = response?.data ?? null;
      responseCode = response?.responseCode ?? null;
      responseText = response?.responseText ?? null;
      message = response?.message ?? null;
      path = response?.path ?? null;
      errors = response?.errors ?? null;
    }

    return {
      data: data, // Handle null data appropriately
      responseCode: responseCode,
      responseText: responseText,
      path: path,
      message: responseText || message || 'Request completed', // Default message if no responseText
      errors: errors, // If not provided, default to null
    };
  }

  // Handle error response using the type guard
  private handleError(error: AxiosError): Failure {
    console.log(error);
    console.log(error);
    console.log('2222222222', error);
    let message = 'Something went wrong';
    let responseCode = 0;
    let errors: string[] = [];

    if (error.response && typeof error.response.data === 'object') {
      const data = error.response.data as ErrorResponse; // Type assertion

      message = data.responseText || 'Unknown error occurred'; // Default message if responseText doesn't exist
      responseCode = data.responseCode || 0; // Default responseCode if not provided
      log.debug('kdsjjdsjdjd');
      log.error(data);
    } else if (error.request) {
      console.log(error.request);
      console.log(error.request);
      console.log(error.request);
      console.log('21213231342132123', error.request);

      message = `No response from server. Please check your network connection.`;
    } else {
      message = error.message;
    }

    log.error(message, responseCode, errors);
    return {message, responseCode, errors};
  }

  // Generic GET method
  async get<T>(
    path: string,
    params?: object,
    options: {
      useToken?: boolean;
      headers?: object;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    try {
      const response = await this.api.get<T>(path, {params});

      const successData = this.convertSuccessResponse(response);
      return successData;
      // return { data: response.data };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // Generic POST method
  async post<T>(
    path: string,
    data?: object,
    options: {
      useToken?: boolean;
      headers?: object;
      onSendProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    try {
      console.log('dataaa', data);

      const response = await this.api.post<T>(path, data);

      const successData = this.convertSuccessResponse(response);
      return successData;
    } catch (error) {
      console.log('error', error);
      return this.handleError(error as AxiosError);
    }
  }

  // Generic POST method
  async postForm<T>(
    path: string,
    data?: object,
    options: {
      useToken?: boolean;
      headers?: object;
      onUploadProgress?: (progress: number) => void;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    try {
      const {useToken = false, headers = {}, onUploadProgress} = options;

      const response = await this.api.postForm<T>(path, data, {
        // headers: headers,
        onUploadProgress: progressEvent => {
          // Ensure total and loaded are available before calculating progress
          // if (progressEvent.total && progressEvent.loaded) {
          //   const progress = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total,
          //   );

          //   // Call the progress callback if it exists
          //   if (onUploadProgress) {
          //     onUploadProgress(progress);
          //   }

          if (progressEvent.total != null && progressEvent.loaded != null) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            // Call the progress callback if it exists
            if (onUploadProgress) {
              onUploadProgress(progress);
            }
          } else {
            // Handle the case where total is undefined
            console.warn('Unable to track progress: total size is undefined');
          }
        },
      });

      const successData = this.convertSuccessResponse(response);
      return successData;
    } catch (error) {
      log.error('error', JSON.stringify(error, null, 2));
      return this.handleError(error as AxiosError);
    }
  }

  // async post<T>(
  //   path: string,
  //   data?: object | FormData, // Add FormData as possible data type
  //   options: {
  //     useToken?: boolean;
  //     headers?: object;
  //     onSendProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
  //   } = {useToken: false, headers: {}},
  // ): Promise<Success | Failure> {
  //   try {
  //     const {useToken = false, headers = {}, onSendProgress} = options;

  //     // Set multipart/form-data header for file uploads
  //     const customHeaders = {
  //       ...headers,
  //       ...(data instanceof FormData
  //         ? {'Content-Type': 'multipart/form-data'}
  //         : {}),
  //     };

  //     const response = await this.api.post<T>(path, data, {
  //       headers: customHeaders,
  //       // onUploadProgress: onSendProgress,  // Attach progress callback if provided
  //     });

  //     const successData = this.convertSuccessResponse(response);
  //     return successData;
  //   } catch (error) {
  //     or('error', JSON.stringify(error, null, 2));
  //     return this.handleError(error as AxiosError);
  //   }
  // }

  async post1<T>(
    path: string,
    data?: String,
    options: {
      useToken?: boolean;
      headers?: object;
      onSendProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    try {
      const {useToken = false, headers = {}, onSendProgress} = options;

      const response = await this.api.post<T>(path, data);

      const successData = this.convertSuccessResponse(response);
      return successData;
    } catch (error) {
      log.error('error', JSON.stringify(error, null, 2));
      return this.handleError(error as AxiosError);
    }
  }

  // Generic PUT method
  async put<T>(
    path: string,
    data?: object,
    options: {
      useToken?: boolean;
      headers?: object;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    try {
      const {useToken = false, headers = {}} = options;
      const response = await this.api.put<T>(path, data);
      const successData = this.convertSuccessResponse(response);
      return successData;
      // return { data: response.data };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // Generic DELETE method
  async delete<T>(
    path: string,
    params?: object,
    options: {
      useToken?: boolean;
      headers?: object;
    } = {useToken: false, headers: {}},
  ): Promise<Success | Failure> {
    const {useToken = false, headers = {}} = options;
    try {
      const response = await this.api.delete<T>(path, {params});
      const successData = this.convertSuccessResponse(response);
      return successData;
      // return { data: response.data };
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
}

export default ApiService;
// export default new ApiService('https://staging.api.mycover.ai/v2');
