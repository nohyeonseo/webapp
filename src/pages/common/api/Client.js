import axios from "axios";

// const serverAddress = 's06A.s-wontech.co.kr:8081'

const instance = axios.create({
    // baseURL: 'http://10.0.2.2:8080',
    baseURL: 'http://192.168.10.47:8080',
    // baseURL: 'http://200.100.0.81:8080',
    // baseURL: 'http://s06A.s-wontech.co.kr:8081',
    // baseURL: `http://${serverAddress}`,
    timeout: 3000,
    withCredentials: true,
    headers: {
        "Contents-Type": "application/json",
        "Authorization": 'Bearer '
    }
})

const API_GET = (targetUrl, params, headers) => instance.get(
    targetUrl,
    {
        params,
        headers
    }
)

const API_POST = (targetUrl, body) => instance.post(
    targetUrl,
    body
)

export { instance, API_GET, API_POST};
