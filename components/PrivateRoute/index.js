import { useAuth } from "@context/auth/authContext";
import { useRouter } from "next/router";
import React from "react";

export default function PrivateRoute({ children }){
    const { accessToken } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if(!accessToken){
            router.push('/')
        }
    }, [accessToken])

    return (
        <>
            {children}
        </>
    )
}