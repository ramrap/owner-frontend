import SideBar from "../Sidebar";

export default function Layout({ children }) {
    return (
        <>
            <div>
                <div className="row no-gutters">
                    <div className="col-3">
                        <SideBar />
                    </div>
                    <div className="col-9">
                        {children}
                    </div>
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </>
    )
}