import Link from "next/dist/client/link"

const SIDEBAR_ITEMS = [
    {
        key: "dashboard",
        title: "Dasboard",
        path: '/dashboard',
        icon: null
    },
    {
        key: "upcoming_orders",
        title: "Upcoming Orders",
        path: '/upcoming_orders',
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
                        <Link href={item.path}>
                            <a className="">
                                <div className="py-2 py-md-3 pl-2 pl-md-5">
                                    {item.title}
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </>
        
    )
}