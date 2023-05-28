import { AxiosError } from "axios";

const getErrorMessage = (error) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.response.statusText;
      }
    } else {
      return error.message;
    }
  } else {
    return "An unknown error occurred";
  }
};

export { getErrorMessage };
