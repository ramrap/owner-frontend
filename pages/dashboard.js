import Layout from "@components/UI/Layout"
import axiosInstance from "@utils/axios"
import { datetimeDiffInMins, datetimeToAMPM } from "@utils/functions/datetime"
import React from "react"
import Rupee from "@utils/symbols/rupee"
import PrivateRoute from "@components/PrivateRoute"
import Header from "@components/UI/Header"

export default function Home() {
    const [bookings, setBookings] = React.useState()
    React.useEffect(() => {
        // setBookings([booking, booking, booking])
        axiosInstance.get("/booking/list/owner")
            .then((response) => {
                console.log(response.data.results)
                setBookings(response.data.results)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
            })
    }, [])
    return (
        <PrivateRoute>
            <>
                <Header heading="Upcoming Orders" />
                <div className="row no-gutters">
                    dashboard
                </div>
            </>
            <style jsx>{`
                
            `}</style>
        </PrivateRoute>
    )
}