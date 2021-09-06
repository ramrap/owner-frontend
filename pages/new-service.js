

export default function AddServices() {
    return (
        <>
            <div className="bg-primary-light p-3">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h5>Add new store</h5>
                        <div>Close</div>
                    </div>
                </div>
            </div>
            <div className="container py-5">
                <div className="row no-gutters">
                    <div className="col-md-3">
                        <div className="">
                            <div className="p-2">
                                Name
                            </div>
                            <div className="p-2">
                                Description
                            </div>
                            <div className="p-2">
                                Vehicle Type
                            </div>
                            <div className="p-2">
                                Amount and Time
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="mb-3">
                            <h4>General</h4>
                            <div className="item-shadow p-3">
                                <div className="form-group">
                                    <label className="form-control-label">Service Name</label>
                                    <select className="form-control">
                                        <option value="">Select a service name</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h4>Description</h4>
                            <div className="item-shadow p-3">
                                <div className="form-group">
                                    <label className="form-control-label">Description</label>
                                    <textarea className="form-control" placeholder="Description" rows="4" />
                                </div>
                                <div className="form-group d-flex">
                                    <div className="box-item border">
                                        <div>plus</div>
                                        <div>Add store photos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h4>Available for vehicle type</h4>
                            <div className="item-shadow p-3">
                                <div className="form-group d-flex">
                                    <div className="mx-2">
                                        <input type="checkbox" className="m-2" />
                                        <label className="form-control-label">Description</label>
                                    </div>
                                    <div className="mx-2">
                                        <input type="checkbox" className="m-2" />
                                        <label className="form-control-label">Description</label>
                                    </div>
                                    <div className="mx-2">
                                        <input type="checkbox" className="m-2" />
                                        <label className="form-control-label">Description</label>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="mb-3">
                            <h5>4 Wheeler</h5>
                            <div className="p-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>VEHICLE TYPE</th>
                                            <th>PRICE</th>
                                            <th>TIME</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr  className="item-shadow">
                                            <td>
                                                <div className="d-flex">
                                                    <div className="border">
                                                        car
                                                    </div>
                                                    <div>
                                                        Cars like blah balhj
                                                        Cars like blah balhj
                                                        Cars like blah balhj
                                                        Cars like blah balhj
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <select className="form-control">
                                                    <option value="">Select a service name</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control">
                                                    <option value="">Select a service name</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="btn btn-primary">
                                                    Save
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .box-item {
                    width: 140px;
                    height: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
            `}</style>
        </>
    )
}
