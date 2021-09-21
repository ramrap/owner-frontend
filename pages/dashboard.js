import Layout from "@components/UI/Layout"
import axiosInstance from "@utils/axios"
import { datetimeDiffInMins, datetimeToAMPM } from "@utils/functions/datetime"
import React from "react"
import Rupee from "@utils/symbols/rupee"
import PrivateRoute from "@components/PrivateRoute"
import Header from "@components/UI/Header"
import VehicleBreakoutChart from "@components/Dashboard/VehicleBreakoutChart"
import TotalRevenueChart from "@components/Dashboard/TotalRevenueChart"

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
                <Header heading="Dashboard" />
                <div className="row no-gutters">
                    <div className="row no-gutters col-12 col-md-12 col-lg-7">
                        <div className="col-6 col-md-3 p-2 p-md-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h6>New Orders</h6>
                                <h5 className="text-primary">69</h5>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 p-2 p-md-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h6>New Orders</h6>
                                <h5>69</h5>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 p-2 p-md-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h6>New Orders</h6>
                                <h5>69</h5>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 p-2 p-md-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h6>New Orders</h6>
                                <h5>69</h5>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="item-shadow p-2 p-md-3">
                                <h5>Total Revenue</h5>
                                <div>
                                    
                                </div>
                                <div>
                                    <TotalRevenueChart />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-5">
                        <div className="col-12 col-md-6 col-lg-12 mb-3">
                            <div className="item-shadow p-2 p-md-3">
                                <h5>Vehicle Breakout</h5>
                                <div style={{ maxWidth: "300px", margin: 'auto' }}>
                                    <VehicleBreakoutChart />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12">
                            <div className="item-shadow">
                                <h5 className="p-2 p-md-3">Top selling services</h5>
                                <div className="p-2 p-md-3 border-top">
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                    <div className="d-flex justify-content-between p-1 font-weight-bold">
                                        <div>Premium Carwash</div>
                                        <div className="text-primary"><Rupee />200</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <style jsx>{`
                
            `}</style>
        </PrivateRoute>
    );
}