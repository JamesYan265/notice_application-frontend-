import axios from "axios";

//用於對AXIOS的設定檔

const BASE_URL = "http://localhost:5000/api/v1";

//提取存於localstorage 中的token資料
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

//使用API request之前的預先設定 https://axios-http.com/docs/interceptors
axiosClient.interceptors.request.use(async(config) => {
    return {
        ...config,
        headers: {
            "Content-Type" : "application/json",
            "authorization" : `Bearer ${getToken()}`, //將JWT加到request Header 傳送比server side
        }
    }
})

//使用APIt之前的預先設定 response https://axios-http.com/docs/interceptors
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
        },
        (err) => {
            throw err.response;
        }
);

export default axiosClient