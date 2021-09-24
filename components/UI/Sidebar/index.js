import { useAuth } from "@context/auth/authContext"
import Link from "next/dist/client/link"

const SIDEBAR_ITEMS = [
    {
        key: "dashboard",
        title: "Dasboard",
        path: '/dashboard',
        icon: null
    },
    {
        key: "todays_orders",
        title: "Today's Orders",
        path: '/todays_orders',
        icon: null
    },
    {
        key: "new_orders",
        title: "New orders",
        path: "/new_orders",
        icon: null
    },
    {
        key: "past_orders",
        title: "Past orders",
        path: "/past_orders",
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
                    {SIDEBAR_ITEMS && SIDEBAR_ITEMS.map((item) => 
                        <Link href={item.path} key={item.key}>
                            <a className="">
                                <div className="py-2 py-md-3 pl-2 pl-md-5">
                                    {item.title}
                                </div>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </>
        
    )
}