import axios from "axios";
import {API_BASE_URL, ACCESS_TOKEN_NAME, MICROSERVICES_API_BASE_URL} from "@/config/serverApiConfig";
import { token as tokenCookies } from "@/auth";
import errorHandler from "./errorHandler";
import successHandler from "./successHandler";
import {getAxiosInstance} from "@/request/axiosInit";

const headersInstance = { [ACCESS_TOKEN_NAME]: tokenCookies.get() };

const request = {
  create: async (entity, jsonData) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    console.log("jsonData", jsonData);
    try {
      const response = await axiosInstance.post(entity + "/create", jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async (entity, id) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entity + "/read/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async (entity, id, jsonData) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(
        entity + "/update/" + id,
        jsonData
      );
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async (entity, id, option = {}) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.delete(entity + "/delete/" + id);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async (entity, option = {}) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      let filter = option.filter ? "filter=" + option.filter : "";
      let equal = option.equal ? "&equal=" + option.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axiosInstance.get(entity + "/filter" + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async (entity, source, option = {}) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    try {
      let query = "";
      if (option !== {}) {
        let fields = option.fields ? "fields=" + option.fields : "";
        let question = option.question ? "&q=" + option.question : "";
        query = `?${fields}${question}`;
      }
      // headersInstance.cancelToken = source.token;
      const response = await axiosInstance.get(entity + "/search" + query, {
        cancelToken: source.token,
      });

      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async (entity, option = {}) => {

    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      [ACCESS_TOKEN_NAME]: tokenCookies.get(),
    };
    console.log(tokenCookies.get());
    try {
      let query = "";
      if (option !== {}) {
        let page = option.page ? "page=" + option.page : "";
        let items = option.items ? "&items=" + option.items : "";
        query = `?${page}${items}`;
      }
      const response = await axiosInstance.get(entity + "/list" + query);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async (entityUrl, jsonData, option = {}) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.post(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async (entityUrl) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.get(entityUrl);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async (entityUrl, jsonData) => {
    const axiosInstance = getAxiosInstance(entity);
    axiosInstance.defaults.headers = {
      ...headersInstance,
    };
    try {
      const response = await axiosInstance.patch(entityUrl, jsonData);
      return successHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  source: () => {
    // const CancelToken = await axiosInstance.CancelToken;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },
};
export default request;
