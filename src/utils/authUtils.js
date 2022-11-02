//Utils 一般是指與程式沒有直接logic關係性的,在特定情境使用的工具(utils)
import authApi from "../api/authApi";

const authUtils = {
    //JWT 認證
    isAuthenticated : async () => {
        const token = localStorage.getItem("token");
        if(!token) return false;

        try {
            const res = await authApi.verifyToken();
            return res.user;
        } catch {
            return false;
        }
    }
}

export default authUtils;