import { API } from '@/constants/api';
import http from '@/http';
import { ServiceError } from '@/utils/errorUtil';
import { setAuthUser } from '@/utils/localStorageUtil';
import { alertError, alertSuccess } from '@/utils/notification';
import { camelize, snakelize } from '@/utils/parse';

export async function login({ email, password }) {
  try {
    const {
      data: { user },
    } = await http.post('/users/login', {
      user: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new ServiceError({
      message: 'Unauthorize!',
      details: ['Invalid email or password'],
    });
  }
}

export async function signUp({ firstName, lastName, email, phoneNumber, password, channel }) {
  try {
    const payload = snakelize({ firstName, lastName, email, phoneNumber, password, channel });
    const { data } = await http.post(API.AUTH.SIGN_UP, payload);
    alertSuccess('SIGNUP_SUCCESS');
    return {
      success: true,
      data
    };
  } catch (error) {
    const { response } = camelize(error);

    // TODO need refactor
    if (response?.data?.errorDetail) {
      const { errorDetail } = camelize(response.data);

      if (errorDetail.phoneNumber) {
        alertError('PHONE_INVALID_FORMAT');
      } else if (errorDetail.email) {
        alertError('EMAIL_ALREADY_EXISTS');
      }
    } else {
      alertError(response.data.errorCode);
    }
    return {
      success: false,
    };
  };
};

export async function signIn({ email, password }) {
  try {
    const payload = snakelize({ email, password });
    const { status, data } = await http.post(API.AUTH.LOGIN, payload);
    if (status === 200) {
      setAuthUser(data);
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (error) {
    const { response: { data } } = error;
    const { errorCode } = camelize(data);
    alertError(errorCode);

    return {
      success: false,
    };
  };
};

export async function forgotPassword({ email }) {
  try {
    const payload = snakelize({ email });
    const { status, data } = await http.post(API.AUTH.FORGOT_PASSWORD, payload);
    if (status === 200) {
      setAuthUser(data);
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (error) {
    const { response: { data } } = error;
    const { errorCode } = camelize(data);
    alertError(errorCode);

    return {
      success: false,
    };
  };
};

export async function verifyToken({ email, token }) {
  try {
    const payload = snakelize({ email, token });
    const { status, data } = await http.post(API.AUTH.VERIFY_TOKEN, payload);
    if (status === 200) {
      setAuthUser(data);
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (error) {
    const { response: { data } } = error;
    const { errorCode } = camelize(data);

    if (errorCode && errorCode !== 'INVALID_RESET_TOKEN_OR_EXPIRED') {
      alertError(errorCode);
    }
    return {
      success: false
    };
  };
};

export async function resetPassword({ email, token, newPassword }) {
  try {
    const payload = snakelize({ email, token, newPassword });
    const { status, data } = await http.post(API.AUTH.RESET_PASSWORD, payload);
    if (status === 200) {
      setAuthUser(data);
      return {
        success: true
      };
    }
    return {
      success: false
    };
  } catch (error) {
    const { response: { data } } = error;
    const { errorCode } = camelize(data);

    alertError(errorCode);
    return {
      success: false,
    };
  };
};
