import axios from "axios";
import { useAuthStore } from "../store/auth";

const url = "http://127.0.0.1:8000/api";

export async function login(d) {
    const store = useAuthStore();
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/api/auth/login",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": "",
        },
        data: d,
    };
    try {
        const response = await axios.request(config);
        console.log(response.data);
        if (response.data.success === true) {
            console.log(store.isLogging);
            localStorage.setItem("token", response.data.access_token);
            store.isLogging = true;
            return true;
        } else {
        }
    } catch (error) {
        console.log(error);
    }
}
