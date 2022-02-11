import axios from "axios";

export const authApi = {
   login: (params) => axios.post(
      "http://localhost:4000/api/v1/auth/login",
      params,
      {
         headers: {
            "Content-Type": "application/json"
         }
      }
   )
}
