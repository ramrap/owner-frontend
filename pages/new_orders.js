import Layout from "@components/UI/Layout";
import axiosInstance from "@utils/axios";
import { datetimeToAMPM, datetimeToDateString, datetimeToWeekdayString, monthNames} from "@utils/functions/datetime";
import React from "react";
import Rupee from "@utils/symbols/rupee";
import PrivateRoute from "@components/PrivateRoute";
import Header from "@components/UI/Header";
import { BOOKING_STATUS } from "@utils/constants/booking";
import axios from "axios";

export default function Home() {
    const [bookings, setBookings] = React.useState();
    const [datetime, setDatetime] = React.useState(new Date());
    const [allOrders, setAllOrders] = React.useState(true);

    const getBookings = () => {
        setAllOrders(true);
        axiosInstance.get("/store-owner/new/bookings")
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

    const getDateBookings = (date) => {
        setAllOrders(false);
        setDatetime(date);
        axiosInstance.post("/store-owner/new/bookings/", {
            date: date.toISOString().split('T')[0]
        })
            .then((response) => {
                setBookings(response.data)
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response)
            })
    }


    return (
        <PrivateRoute>
            <Layout>
                <Header heading="New Orders" />
                <div className="d-inline-flex mb-3 justify-content-between" style={{ overflowX: "scroll", width: "100%"}}>
                <div className={`date-item m-2 ${allOrders && 'date-active'}`} key = {1} onClick={() => getBookings()}>
                    <h5>All</h5>
                </div>
                    {[2, 3, 4, 5, 6, 7, 8].map((slot, index) => {
                        var date = new Date();
                        date.setDate(date.getDate() + index);
                        return (
                            <div className={`date-item m-2 ${!allOrders && date.getDate() == datetime.getDate() && 'date-active'}`} key={index} onClick={() => getDateBookings(date)}>
                                <h5>{date.getDate()} {monthNames[date.getMonth()]}</h5>
                                <div>{datetimeToWeekdayString(date, true)}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="new-orders-container p-3">
                <table className = "table table-striped borderless">
                    <thead className="table-head-text">
                    <tr>
                        <th >Order Number</th>
                        <th>Order Details</th>
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
                            <td>{booking.status === BOOKING_STATUS.PAYMENT_DONE && 
                                <div className="d-flex justify-content-between p-2 badge badge-secondary">
                                    Not Started
                                </div>
                            }
                            {booking.status === BOOKING_STATUS.SERVICE_STARTED &&
                                <div className="d-flex justify-content-between p-2 badge badge-primary">
                                    <div className="btn border">
                                        Ongoing
                                    </div>
                                </div>
                            }
                            {booking.status === BOOKING_STATUS.SERVICE_CONMPLETED && 
                                <div className="d-flex justify-content-between p-2 badge badge-success">
                                    Completed
                                </div>
                            }
                            {booking.status === BOOKING_STATUS.NOT_ATTENDED &&
                                <div className="d-flex justify-content-between p-2 badge badge-danger">
                                    Cancelled
                                </div>
                            }</td>
                            </tr>
                        );
                    })}
                    </tbody>
              </table>
                </div>
            </Layout>
            <style jsx>{`
            .date-item {
                min-width: 140px;
                text-align: center;
                justify-content: center;
                color: #3570B5;
                border: 1px solid #3570b5;
                border-radius: 6px;
                height: 70px;
                display: flex;
                flex-direction: column;

            }
            .date-active {
                background: #3570b5;
                color: white;
            }
            .new-orders-container {
                background:white;
                background: #FFFFFF;
                box-shadow: -8px 8px 32px rgba(136, 136, 136, 0.16);
                border-radius: 8px;
            }
            .table-striped > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
                background-color: #f7f9fa;
             }
             .table-head-text {
                font-family: DM Sans;
                font-style: normal;
                font-weight: 400 !important;
                font-size: 0.8rem;
                letter-spacing: 0.18em;
                text-transform: uppercase;
                color: #696969;
             }

            .table thead th {
                vertical-align: top;
            }
            .badge-secondary {
                background: #ffedba;
                color: #7a5a00;
                border 1px solid #b8a263;
                letter-spacing: 0.18em;
                text-transform: uppercase;

            }
            .badge-success {
                background: #D6FFE1;
                color: #2A8D46;
                border 1px solid #2A8D46;
                letter-spacing: 0.18em;
                text-transform: uppercase;
            }
            .badge-danger {
                background: #FFD6D6;
                color: #8D2A2A;
                border: 1px solid #8D2A2A;
                letter-spacing: 0.18em;
                text-transform: uppercase;
            }
            `}</style>
        </PrivateRoute>
    )
}