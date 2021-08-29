import React from "react";
import cookie from "react-cookies";
import axiosInstance from "@utils/axios";
import { AuthContext } from "@context/auth/authContext";
import { COOKIE_NAME_ACCESS_TOKEN, COOKIE_NAME_PROFILE, COOKIE_NAME_REFRESH_TOKEN } from "@utils/constants/auth";

export default function AuthProvider(props) {
    const [profile, setProfile] = React.useState(cookie.load(COOKIE_NAME_PROFILE) || {});
    const [access, setAccess] = React.useState(cookie.load(COOKIE_NAME_ACCESS_TOKEN));
    const [refresh, setRefresh] = React.useState(cookie.load(COOKIE_NAME_REFRESH_TOKEN));

    const [loading, setLoading] = React.useState(false);

    const [loginError, setLoginError] = React.useState();

    React.useEffect(() => {
        // console.log("access: ", access);
        // console.log("refresh: ", refresh);
    }, []);

    const login = (data) => {
        setLoading(true);
        setLoginError("");
        console.log("login data: ", data);

        axiosInstance
            .post("/store-owner/login/", {
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                console.log(response.data);
                setAccessToken(response.data.access);
                setRefreshToken(response.data.refresh);
                axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                console.log(error.response);
                setLoginError(error.response && error.response.data && error.response.data.detail);
            });
    };

    const setAccessToken = (token) => {
        cookie.save(COOKIE_NAME_ACCESS_TOKEN, token, { path: "/" });
        setAccess(token);
        console.log("set access: ", token);
    };
    const setRefreshToken = (token) => {
        cookie.save(COOKIE_NAME_REFRESH_TOKEN, token, { path: "/" });
        setRefresh(token);
        console.log("set refresh: ", token);
    };

    const logout = () => {
        console.log("signing out");

        cookie.remove(COOKIE_NAME_ACCESS_TOKEN, { path: "/" });
        cookie.remove(COOKIE_NAME_REFRESH_TOKEN, { path: "/" });
        cookie.remove(COOKIE_NAME_PROFILE, { path: "/" });

        delete axiosInstance.defaults.headers["Authorization"];

        setAccess(null);
        setRefresh(null);
        setProfile({});

        setLoading(false);
        setLoginError("");

    };

    return (
        <AuthContext.Provider
            value={{
                profile,
                accessToken: access,
                refreshToken: refresh,

                loading,

                // Auth
                loginError,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
