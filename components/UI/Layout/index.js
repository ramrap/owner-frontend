import { useAuth } from "@context/auth/authContext";
import SideBar from "../Sidebar";

export default function Layout({ children }) {
    const { accessToken } = useAuth()
    return (
        <>
            <div className="p-3">
                <div className="row no-gutters">
                    <div className="col-3 p-2">
                        <SideBar />
                    </div>
                    <div className="col-9 p-2">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}