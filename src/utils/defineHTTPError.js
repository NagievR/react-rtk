import {
  HTTP_ERROR_404,
  HTTP_ERROR_SERVER,
  HTTP_ERROR_UNKNOWN,
} from "../constants/HTTPErrors";

const defineHTTPError = (response) => {
  let message = HTTP_ERROR_UNKNOWN;

  const status = response.status;
  if (status >= 500) {
    message = HTTP_ERROR_SERVER;
  } else if (status === 404) {
    message = HTTP_ERROR_404;
  }

  throw new Error(message);
};

export default defineHTTPError;
