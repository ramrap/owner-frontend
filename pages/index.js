import { useAuth } from "@context/auth/authContext";
import { useRouter } from "next/router";
import React from "react";

export default function Index() {
    const { accessToken } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
        if (accessToken) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    }, [accessToken]);
    return null;
}
