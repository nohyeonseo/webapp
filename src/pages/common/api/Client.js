import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: `http://${serverAddress}`,
    timeout: 3000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": 'Bearer '
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
