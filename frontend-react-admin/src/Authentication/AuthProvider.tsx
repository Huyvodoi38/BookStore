// in src/authProvider.ts
import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    async login({ username }) {
        // accept all username/password combinations
        if (false) {
            throw new Error("Invalid credentials, please try again");
        }
        localStorage.setItem("role", username);
        localStorage.setItem("username", username);
    },
    // called when the user clicks on the logout button
    async logout() {
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        return Promise.resolve();
    },
    // called when the API returns an error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            return Promise.reject();
        }
    },
    // called when the user navigates to a new location, to check for authentication
    async checkAuth() {
        if (!localStorage.getItem("role")) {
            return Promise.reject();
        }
    },
    async getPermissions() {
        return localStorage.getItem("role");
    },
};