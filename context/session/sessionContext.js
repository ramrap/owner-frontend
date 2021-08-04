import { createContext, useContext } from "react";

export const SessionContext = createContext();

export function useSession() {
    return useContext(SessionContext);
}
