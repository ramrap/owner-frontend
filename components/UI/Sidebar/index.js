const SIDEBAR_ITEMS = [
    {
        key: "dashboard",
        title: "Dasboard",
        icon: null
    },
    {
        key: "upcoming_orders",
        title: "Upcoming Orders",
        icon: null
    },
]

export default function SideBar(){
    return (
        <>
            <div className="item-shadow">
                <div className="p-2 p-md-4 mb-3">
                    <img src="/logo.svg" />
                </div>
                <div>
                    {SIDEBAR_ITEMS.map((item) => 
                        <div className="">
                            <div className="py-2 py-md-3 pl-2 pl-md-5">
                                {item.title}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </>
        
    )
}