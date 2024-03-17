import axios from "axios";
import {ACCESS_TOKEN_NAME, API_BASE_URL, MICROSERVICES_API_BASE_URL} from "@/config/serverApiConfig";
import {token as tokenCookies} from "@/auth";

const headersInstance = { [ACCESS_TOKEN_NAME]: tokenCookies.get() };

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        ...headersInstance,
    },
});

export const axiosInstanceService = axios.create({
    baseURL: MICROSERVICES_API_BASE_URL,
    timeout: 30000,
    headers: {
        ...headersInstance,
    },
});

export const getAxiosInstance = (entity) => {
    return entity === 'client' ? axiosInstanceService : axiosInstance
}