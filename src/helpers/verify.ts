import { authClient, VerifyResponse, ErrorResponse } from '../utils/AuthClient';

export const verify = async (): Promise<VerifyResponse | boolean> => {
  try {
    const res: VerifyResponse | boolean = await authClient.verify();
    return res;
  } catch (error) {
    if (isErrorResponse(error)) {
      console.error('Error during verification:', error.message);
    } else {
      console.error('Unknown error during verification:', error);
    }
    return false;
  }
};

function isErrorResponse(obj: any): obj is ErrorResponse {
  return obj && 'message' in obj;
}
