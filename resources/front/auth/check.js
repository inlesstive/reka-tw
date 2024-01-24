import axios from "axios";
import { useAuthStore } from "../store/auth";

export async function check(d) {
    const store = useAuthStore()
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/auth/me',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'X-CSRF-TOKEN': ''
        }
      };
    try {
        const response = await axios.request(config);
        console.log(response.data);
        if (response.data.success === true) {
            store.isLogging = true;
            return true
        } else{
            return false
        }
    } catch (error) {
        console.log(error);
    }
}
