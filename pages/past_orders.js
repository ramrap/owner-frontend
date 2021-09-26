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
    const [error, setError] = React.useState(null)

    const getBookings = () => {
        axiosInstance.get("store-owner/past/bookings")
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



    return (
        <PrivateRoute>
            <Layout>
                <Header heading="Past Orders" />
                <div className="past-orders-container bg-white item-shadow">
                <table className = "table table-striped borderless">
                    <thead className="spaced-font font-dmSans font-08 table-head-text">
                    <tr>
                        <th>Order Number</th>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Vehicle Type</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody className="text-primary">
                    {bookings && bookings.map((booking) => {
                        var booking_date = new Date(booking.event.start_datetime);
                        var order = "";
                        var price_times = booking.price_times;
                        var amount = parseInt(booking.amount);
                        {price_times && price_times.map((price_time) => {
                            order = order + price_time.service + "+";
                        })}
                        order = order.slice(0, -1)
                        return (
                            <tr key = {booking.booking_id}>
                            <td>{booking.booking_id}</td>
                            <td>{order}</td>
                            <td>{booking.booked_by.name===" "?booking.booked_by.phone:booking.booked_by.name}</td>
                            <td>{booking.vehicle_type}</td>
                            <td>{booking_date.toLocaleString()}</td>
                            <td className="font-weight-bold"><Rupee/>{amount}</td>
                            <td>{booking.status===BOOKING_STATUS.NOT_ATTENDED?<span className="badge p-2 badge-danger spaced-font">NOT ATTENDED</span>:<span className="badge p-2 badge-success spaced-font">COMPLETED</span>}</td>
                            </tr>
                        );
                    })}
                    </tbody>
              </table>
                </div>
            </Layout>
            <style jsx>{`
            .past-orders-container {
                border-radius: 8px;
            }
            .table-striped > tbody > tr:nth-child(2n+1) > td {
                background-color: #f7f9fa;
             }
             .table-head-text {
                font-weight: 400 !important;
                color: #696969;
             }

            .table thead th {
                vertical-align: top;
            }
            .badge-secondary {
                background: #ffedba;
                color: #7a5a00;
                border 1px solid #b8a263;

            }
            .badge-success {
                background: #D6FFE1;
                color: #2A8D46;
                border 1px solid #2A8D46;
            }
            .badge-danger {
                background: #FFD6D6;
                color: #8D2A2A;
                border: 1px solid #8D2A2A;
            }
            `}</style>
        </PrivateRoute>
    )
}