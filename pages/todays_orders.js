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
        const date = new Date();
        axiosInstance.post("/store-owner/new/bookings/", {
            date: date.toISOString().split('T')[0]
        })
            .then((response) => {
                console.log(response.data)
                setBookings(response.data)
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
            <Layout>
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
                                            <span className="text-muted booking-details-heading">ORDER ID:</span> {booking.booking_id}
                                        </div>
                                        <div className="">
                                            <span className="text-muted booking-details-heading">DATE:</span> {new Date(booking.event.start_datetime).toDateString()}
                                        </div>
                                        <div className="">
                                            <span className="text-muted booking-details-heading">CUSTOMER NAME:</span> {booking.booked_by.name}
                                        </div>
                                        <div className="">
                                            <span className="text-muted booking-details-heading">PHONE NUMBER:</span> {booking.booked_by.phone}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="p-2 font-weight-bold">
                                        <div className="mb-2">
                                            <span className="booking-details-subhead">Order Details:</span> {booking.price_times.map((price_time, index) => <span className="font-weight-bold" key={price_time.id}>{index != 0 && ','} {price_time.service} </span>)}
                                        </div>
                                        <div className="mb-2">
                                            <span className="booking-details-subhead">Total Time:</span> {datetimeDiffInMins(new Date(event.start_datetime), new Date(event.end_datetime))}min
                                        </div>
                                        <div className="mb-2">
                                            <span className="booking-details-subhead">Vehicle Type:</span> {booking.vehicle_type}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="">
                                                <span className="booking-details-subhead">Grand Total:</span> <Rupee /> {booking.amount}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="p-2">
                                        <div className="d-flex justify-content-between p-1">
                                        <div className="d-flex">
                                            <div className="order-slot mr-3 px-2" disabled>
                                                {datetimeToAMPM(new Date(event.start_datetime))} to {datetimeToAMPM(new Date(event.end_datetime))}
                                            </div>
                                            <button className="all-details-btn py-1 px-2 btn btn-primary btn-outline">
                                                View All Details
                                            </button>
                                        </div>

                                        {booking.status === BOOKING_STATUS.PAYMENT_DONE &&
                                            <div>
                                                {error && error[booking.booking_id] && <div className="text-danger">{error[booking.booking_id]}</div>}
                                                <div className="d-flex">
                                                    <input value={otps[booking.booking_id]} onChange={(event) => setOtps({...otps, [booking.booking_id]: event.target.value})} className="form-control w-auto mr-2" type="text" placeholder="Enter OTP"/>
                                                    <button className="btn btn-primary button-text" onClick={() => startBooking(booking.booking_id)}>Start Service</button>
                                                </div>
                                            </div>
                                        }
                                        {booking.status === BOOKING_STATUS.SERVICE_STARTED &&
                                            <div className="d-flex justify-content-between p-2">
                                                <div className="p-2 mr-2 ongoing-box">
                                                    ONGOING
                                                </div>
                                                <button className="btn btn-success" onClick={() => completeBooking(booking.booking_id)}>
                                                    Finish
                                                </button>
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
            </Layout>
            <style jsx>{`
                .order-slot {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    background: #E5F1FF;
                    border: 1px solid #3570B5;
                    box-sizing: border-box;
                    border-radius: 4px;
                    color: #3871b6;
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: bold;
                }
                .ongoing-box {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    background: #D6FFDA;
                    border: 2px dashed #1C5A2D;
                    border-radius: 4px;
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: bold;
                    letter-spacing: 0.15em;
                    color: #1C5A2D;
                }
                .booking-details-heading {
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: normal;
                    font-size: small;
                    line-height: 1rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #696969;
                }
                .booking-details-subhead {
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 0.9rem;
                    line-height: 1.2rem;
                    color: #696969;
                }
                .all-details-btn {
                    border: 1px solid #3570B5;
                    box-sizing: border-box;
                    border-radius: 4px;
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 0.9rem;
                    color: #3570B5;
                }
                .all-details-btn:hover {
                    color:white;
                }
                ::placeholder, .button-text {
                    font-family: DM Sans;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 0.8em;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }
            `}</style>
        </PrivateRoute>
    )
}