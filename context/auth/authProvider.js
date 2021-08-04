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
    const [socialLoginError, setSocialLoginError] = React.useState();

    const [authDrawer, setAuthDrawer] = React.useState(false);
    const [callback, setCallback] = React.useState();

    React.useEffect(() => {
        // console.log("access: ", access);
        // console.log("refresh: ", refresh);
    }, []);

    const sendOtpPromise = (phone) =>
        axiosInstance.post("/consumer/login/sendOTP/", {
            phone: phone,
        });
    const checkOtpPromise = (phone, otp) =>
        axiosInstance.post("/consumer/login/checkOTP/", {
            phone: phone,
            otp: otp,
        });

    const handleAuthDrawer = (value, callback) => {
        setAuthDrawer(value);
        setCallback(callback);
    };

    const login = (data) => {
        setLoading(true);
        setLoginError("");
        setSocialLoginError("");
        console.log("login data: ", data);

        setAccessToken(data.access);
        setRefreshToken(data.refresh);

        axiosInstance.defaults.headers["Authorization"] = "Bearer " + data.access;

        if (callback) {
            callback();
        }

        setAuthDrawer(false);
        setLoading(false);
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

    const logout = (callback) => {
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
        setSocialLoginError("");

        if (callback) callback();
    };

    return (
        <AuthContext.Provider
            value={{
                profile,
                accessToken: access,
                refreshToken: refresh,

                loading,

                // Auth drawer
                authDrawer,
                setAuthDrawer: handleAuthDrawer,

                // Auth
                sendOtpPromise,
                checkOtpPromise,
                loginError,
                socialLoginError,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
