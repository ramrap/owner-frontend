
import React from "react";
import cookie from 'react-cookies'
import { SessionContext } from "@context/session/sessionContext";
import { COOKIE_NAME_CITY } from "@utils/constants/session";

export default function SessionProvider(props) {
    const [location, setLocation] = React.useState("bpl");
    const [city, setCity] = React.useState(cookie.load(COOKIE_NAME_CITY));

    const [cityDrawer, setCityDrawer] = React.useState(false);

    React.useEffect(() => {
        if(!city){
            setCityDrawer(true)
        }
    }, [city]);

    return (
        <SessionContext.Provider
            value={{
                location,
                setLocation,

                cityDrawer,
                setCityDrawer
            }}
        >
            {props.children}
        </SessionContext.Provider>
    );
}
