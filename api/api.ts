import Axios from "axios";

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

export { Api };
