import { useAuth } from "@context/auth/authContext";
import Link from "next/dist/client/link";
export default function Header() {
    const { logout } = useAuth()
    return (
        <>
            <div className="container p-3">
                <div className="d-flex justify-content-between">
                    <div>
                        <Link href="/">
                            <a>
                                <img src={"/logo.svg"} alt="logo" />
                            </a>
                        </Link>
                    </div>
                    <div>
                        <div className="font-weight-bold text-primary cursor-pointer" onClick={logout}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{``}</style>
        </>
    );
}
