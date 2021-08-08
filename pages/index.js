import Layout from "@components/UI/Layout"
import axiosInstance from "@utils/axios"
import { datetimeDiffInMins, datetimeToAMPM } from "@utils/functions/datetime"
import React from "react"
import Rupee from "@utils/symbols/rupee"

export default function Home() {
    const [bookings, setBookings] = React.useState()
    const booking = {
        "booking_id": "23523452",
        "booked_by": {
          "name": "Subodh Verma",
          "phone": "+918989820993"
        },
        "price_times": [
          {
            "id": 1,
            "service": "Washing",
            "created_at": "2021-08-07T06:15:25.666140+05:30",
            "updated_at": "2021-08-07T06:15:25.666152+05:30",
            "price": 100,
            "time_interval": 30,
            "description": "dfasdf",
            "store": 1,
            "vehicle_type": 1,
            "bays": [
              1,
              2
            ]
          },
          {
            "id": 2,
            "service": "Teflon Coating",
            "created_at": "2021-08-07T06:15:48.284554+05:30",
            "updated_at": "2021-08-07T06:15:48.284567+05:30",
            "price": 200,
            "time_interval": 60,
            "description": "asdfasdf",
            "store": 1,
            "vehicle_type": 1,
            "bays": [
              1,
              2
            ]
          }
        ],
        "payment": {
          "id": 1,
          "created_at": "2021-08-07T06:17:54.142024+05:30",
          "updated_at": "2021-08-07T06:17:54.142039+05:30",
          "payment_status": 0,
          "transaction_id": "dsfasdf",
          "mode_of_payment": "PAYTM KARO",
          "amount": 1000,
          "booking": "23523452"
        },
        "review": null,
        "event": {
          "id": 1,
          "created_at": "2021-08-07T06:16:35.722884+05:30",
          "updated_at": "2021-08-07T06:16:35.722894+05:30",
          "is_blocking": false,
          "start_datetime": "2021-08-10T12:00:00+05:30",
          "end_datetime": "2021-08-10T13:30:00+05:30",
          "bay": 1
        },
        "created_at": "2021-08-07T06:16:58.191771+05:30",
        "updated_at": "2021-08-07T06:17:14.838154+05:30",
        "status": 0,
        "status_changed_time": "2021-08-07T06:14:18+05:30",
        "otp": "1234",
        "is_refunded": false,
        "store": 1,
        "vehicle_type": 1
      }
    React.useEffect(() => {
        setBookings([booking, booking, booking])
        axiosInstance.get("/booking/list/owner")
            .then((response) => {
                setBookings(response.data.results)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
            })
    }, [])
    return (
        <>
            <Layout>
                <h1>Upcoming Orders</h1>
                <div className="row no-gutters">
                    {bookings && bookings.map((booking) =>
                        <div className="col-12 col-md-6 p-2 p-md-3">
                            <div className="item-shadow">
                                <div className="p-2 d-flex flex-wrap justify-content-between">
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
                                <div className="p-2">
                                    <div className="">
                                        <span className="text-muted">Order Details:</span> {booking.price_times.map((price_time, index) => <span className="font-weight-bold">{index != 0 && ','} {price_time.service} </span>)}
                                    </div>
                                    <div className="">
                                        <span className="text-muted">Total Time:</span> {datetimeDiffInMins(new Date(booking.event.start_datetime), new Date(booking.event.end_datetime))}min
                                    </div>
                                    <div className="">
                                        <span className="text-muted">Vehicle Type:</span> aabhi dekhte iska thoda
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="">
                                            <span className="text-muted">Grand Total:</span> <Rupee /> {booking.payment.amount}
                                        </div>
                                        <div className="">
                                            <span className="text-muted">Payment Summary:</span> {booking.payment.payment_status}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="p-2">
                                    <div className="d-flex justify-content-between p-2">
                                        <div className="btn btn-primary btn-outline bg-primary-light">
                                            {datetimeToAMPM(new Date(booking.event.start_datetime))} to {datetimeToAMPM(new Date(booking.event.end_datetime))}
                                        </div>
                                        <div className="btn btn-primary btn-outline">
                                            View All Details
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between p-2">
                                        <div className="btn btn-success">
                                            Ongoing
                                        </div>
                                        <div className="btn btn-success">
                                            Finish
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
            <style jsx>{`
                
            `}</style>
        </>
    )
}