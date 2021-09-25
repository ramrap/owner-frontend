
import SideBar from "../Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <div className="">
                    <div className="row no-gutters">
                        <div className="col-3 p-4 min-vh-100 position-sticky top-0">
                            <SideBar />
                        </div>
                        <div className="col-9 pr-3 py-4 pl-1">
                            {children}
                        </div>
                    </div>
                </div>
        </>
    )
}