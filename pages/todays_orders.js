import Layout from "@components/UI/Layout"
import axiosInstance from "@utils/axios"
import { datetimeDiffInMins, datetimeToAMPM } from "@utils/functions/datetime"
import React from "react"
import Rupee from "@utils/symbols/rupee"
import PrivateRoute from "@components/PrivateRoute"
import Header from "@components/UI/Header"
import { BOOKING_STATUS } from "@utils/constants/booking"
import axios from "axios"

export default function Home() {
    const [bookings, setBookings] = React.useState()
    const [otps, setOtps] = React.useState({})
    const [error, setError] = React.useState(null)

    const getBookings = () => {
        axiosInstance.get("/owner/booking/list")
            .then((response) => {
                console.log(response.data.results)
                setBookings(response.data.results)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
            })
    }

    React.useEffect(() => {
        getBookings()
    }, [])

    const startBooking = (booking_id) => {
        setError({...error, [booking_id]: ""})
        var otp = otps[booking_id]
        if(!otp){
            setError({...error, [booking_id]: "Enter OTP"})
            return
        }
        axiosInstance.post("owner/service/start/", {
            booking_id: booking_id,
            otp: otp
        })
        .then((response) => {
            console.log(response)
            getBookings()
        })
        .catch((error) => {
            console.log(error.response)
            if(error.response && error.response.data){
                setError({...error, [booking_id]: error.response.data.error})
            }
        })
    }

    const completeBooking = (booking_id) => {
        setError({...error, [booking_id]: ""})
        axiosInstance.post("owner/service/complete/", {
            booking_id: booking_id
        })
            .then((response) => {
                console.log(response)
                getBookings()
            })
            .catch((error) => {
                console.log(error.response)
                if(error.response && error.response.data){
                    setError({...error, [booking_id]: error.response.data.error})
                }
            })
    }

    return (
        <PrivateRoute>
            <>
                <Header heading="Today's Orders" />
                <div className="row no-gutters">
                    {bookings && bookings.map((booking) => {
                        var event = booking.event || {}
                        var payment = booking.payment || {}
                        return (
                            <div className="col-12 mb-3" key={booking.booking_id}>
                                <div className="item-shadow p-2">
                                    <div className="p-2 d-flex flex-wrap justify-content-between text-primary font-weight-bold">
                                        <div className="">
                                            <span className="text-muted">ORDER ID:</span> {booking.booking_id}
                                        </div>
                                        <div className="">
                                            <span className="text-muted">DATE:</span> {new Date(booking.created_at).toDateString()}
                                        </div>
                                        <div className="">
                                            <span className="text-muted">CUSTOMER NAME:</span> {booking.booked_by.name}
                                        </div>
                                        <div className="">
                                            <span className="text-muted">PHONE NUMBER:</span> {booking.booked_by.phone}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="p-2 font-weight-bold">
                                        <div className="">
                                            <span className="text-muted">Order Details:</span> {booking.price_times.map((price_time, index) => <span className="font-weight-bold" key={price_time.id}>{index != 0 && ','} {price_time.service} </span>)}
                                        </div>
                                        <div className="">
                                            <span className="text-muted">Total Time:</span> {datetimeDiffInMins(new Date(event.start_datetime), new Date(event.end_datetime))}min
                                        </div>
                                        <div className="">
                                            <span className="text-muted">Vehicle Type:</span> {booking.vehicle_type}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <span className="text-muted">Grand Total:</span> <Rupee /> {booking.amount}
                                            </div>
                                            <div className="">
                                                <span className="text-muted">Payment Summary:</span> {booking.payment_status}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="p-2">
                                        <div className="d-flex justify-content-between p-2">
                                            <button className="btn border bg-primary-light" disabled>
                                                {datetimeToAMPM(new Date(event.start_datetime))} to {datetimeToAMPM(new Date(event.end_datetime))}
                                            </button>
                                            <div className="btn btn-primary btn-outline">
                                                View All Details
                                            </div>

                                        {booking.status === BOOKING_STATUS.PAYMENT_DONE &&
                                            <div>
                                                {error && error[booking.booking_id] && <div className="text-danger">{error[booking.booking_id]}</div>}
                                                <div className="d-flex p-2">
                                                    <input value={otps[booking.booking_id]} onChange={(event) => setOtps({...otps, [booking.booking_id]: event.target.value})} className="form-control w-auto mr-2" type="text" />
                                                    <div className="btn btn-primary" onClick={() => startBooking(booking.booking_id)}>Start Service</div>
                                                </div>
                                            </div>
                                        }
                                        {booking.status === BOOKING_STATUS.SERVICE_STARTED &&
                                            <div className="d-flex justify-content-between p-2">
                                                <div className="btn border">
                                                    Ongoing
                                                </div>
                                                <div className="btn btn-success" onClick={() => completeBooking(booking.booking_id)}>
                                                    Finish
                                                </div>
                                            </div>
                                        }
                                        {booking.status === BOOKING_STATUS.SERVICE_CONMPLETED && 
                                            <div className="d-flex justify-content-between p-2">
                                                Service Completed
                                            </div>
                                        }
                                        {booking.status === BOOKING_STATUS.NOT_ATTENDED &&
                                            <div className="d-flex justify-content-between p-2 text-warning">
                                                Service Expired
                                            </div>
                                        }
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
            <style jsx>{`
                
            `}</style>
        </PrivateRoute>
    )
}