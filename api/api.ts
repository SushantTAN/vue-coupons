import Axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

import { requestInterceptor } from "./interceptor";
import { formatErrorAndThrow } from "./error-mapper";

// import { RefreshTokenData } from "@redux/models";
// import { TokenUtils, publicUrlAccess } from "@utils";
// import { ApiResponse, Session } from "@redux/services/models";

const Api = Axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 20000,
  timeoutErrorMessage: "Data fetching request time is out!",
  headers: {
    Connection: "close",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 *  Apply the Api request & response interceptor
 */
// Function that will be called to refresh authorization
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const refreshAuthLogic = async (failedRequest: any) => {
//   try {
//     const oldSession = await TokenUtils.getSession();

//     const tokenRefreshRes = await Axios.post<ApiResponse<RefreshTokenData>>(
//       `${Constants.Config.api.APP_DOMAIN}${Constants.ApiEndpoint.refreshToken}`,
//       {},
//       {
//         headers: {
//           refreshToken: oldSession?.refreshToken,
//         },
//         data: null,
//       }
//     );

//     const session: Session = {
//       id: tokenRefreshRes.data.data.id,
//       fullName: tokenRefreshRes.data.data.fullName,
//       customerId: tokenRefreshRes.data.data.customerId,
//       accessToken: tokenRefreshRes.data.data.accessToken,
//       mobileNumber: tokenRefreshRes.data.data.mobileNumber,
//       refreshToken: tokenRefreshRes.data.data.refreshToken,
//       citizenshipNumber: tokenRefreshRes.data.data.citizenshipNumber,
//     };

//     // update local storage with new session and notify listeners
//     await TokenUtils.dispatchSessionChanged(session);

//     // eslint-disable-next-line no-param-reassign
//     failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshRes.data.data.accessToken}`;

//     return Promise.resolve();
//   } catch (error) {
//     // update local storage with empty session and notify listeners
//     await TokenUtils.dispatchSessionChanged(undefined);

//     return Promise.reject(error);
//   }
// };

// Instantiate the interceptor
// createAuthRefreshInterceptor(Api, refreshAuthLogic, {
//   pauseInstanceWhileRefreshing: true,
//   shouldRefresh: (error) => {
//     if (error.response?.status === 401 && Constants.ApiEndpoint.logout.includes(error.config?.url ?? "")) {
//       return false;
//     }

//     if (error.response?.status === 401 && !publicUrlAccess.includes(error.config?.url ?? "")) {
//       return true;
//     }

//     return false;
//   },
// });

// Api.interceptors.request.use(requestInterceptor, formatErrorAndThrow);
// Api.interceptors.response.use(
//   (response) => response,
//   (error) => formatErrorAndThrow(error)
// );

export { Api };
