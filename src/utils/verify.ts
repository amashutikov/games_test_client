import { authClient, VerifyResponse, ErrorResponse } from './authClient';

export const verify = async (): Promise<boolean> => {
  try {
    const res: VerifyResponse = await authClient.verify();
    return res.success;
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