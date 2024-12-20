import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import "../Rent/Rent.css";

const Add_Rent = () => {
    const [rentAgreements, setRentAgreements] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);

    const fetchRentAgreements = async () => {
        try {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");
            const response = await axios.get("http://192.168.167.5:8560/api/project/get/rent", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: userId,
                },
            });
            setRentAgreements(response.data.rentAgreements || []);
        } catch (err) {
            setError("Failed to fetch rent agreements.");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRentAgreements();
    }, []);

    const columns = React.useMemo(
        () => [
            { Header: 'Site ID', accessor: 'siteId' },
            { Header: 'Vendor Code', accessor: 'vendorCode' },
            { Header: 'State', accessor: 'state' },
            { Header: 'Location', accessor: 'location' },
            { Header: 'Area', accessor: 'area' },
            { Header: 'Monthly Payment', accessor: 'monthlyPayment' },
            { Header: 'Lease Period', accessor: 'leasePeriod' },
            { Header: 'Address', accessor: 'address' },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => handleEdit(row.original)}>Edit</button>
                    </div>
                ),
            },
        ],
        []
    );

    const data = React.useMemo(() => rentAgreements, [rentAgreements]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 },
        },
        usePagination
    );

    const handleEdit = (rowData) => {
        setCurrentEdit(rowData);
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("jwttoken");
            const userId = localStorage.getItem("id");
            await axios.post(
                `http://192.168.167.5:8560/api/project/rent/update/${currentEdit.id}`,
                currentEdit,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: userId,
                    },
                }
            );

            fetchRentAgreements();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating rent agreement", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEdit(prev => ({ ...prev, [name]: value }));
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='table-responsive'>
            <table {...getTableProps()} border="1" style={{ width: "auto", height: "auto", textAlign: "left",}}>
                <thead style={{ textAlign: "center", backgroundColor: "lightcyan" }}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} style={{ textAlign: "center" }}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <span>Page {pageIndex + 1} of {Math.ceil(rentAgreements.length / 5)}</span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>

            {isModalOpen && (
                <div className="modal_edit">
                    <div className="modal-content-edit p-0" style={{width:"1200px", margin:"30px auto auto",}}>
                        <div className='modal-header p-3'>
                        <h2>Edit Rent Agreement</h2>
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        </div>
                        
                        <form>
                        <div className='modal-body p-3'>
                            <div className='row'>
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Site ID</label>
                                <input 
                                type="text"
                                name="siteId"
                                value={currentEdit.siteId}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Vendor Code</label>
                                <input 
                                type="text"
                                name="vendorCode"
                                value={currentEdit.vendorCode}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">State</label>
                                <input 
                                type="text"
                                name="state"
                                value={currentEdit.state}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Location</label>
                                <input 
                                type="text"
                                name="location"
                                value={currentEdit.location}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Area</label>
                                <input 
                                type="text"
                                name="area"
                                value={currentEdit.area}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Monthly Payment</label>
                                <input 
                                type="text"
                                name="monthlyPayment"
                                value={currentEdit.monthlyPayment}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Lease Period</label>
                                <input 
                                type="text"
                                name="leasePeriod"
                                value={currentEdit.leasePeriod}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            <div class="col-md-3 col-6 mb-4">
                                <label for="vendorName" className="form-label">Address</label>
                                <input 
                                type="text"
                                name="address"
                                value={currentEdit.address}
                                onChange={handleChange}
                                id="vendorName" 
                                placeholder="Enter Vendor Name" className="form-control"/>
                            </div>
                            </div>
                            {/* <label>Site ID</label>
                            <input
                                type="text"
                                name="siteId"
                                value={currentEdit.siteId}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Vendor Code</label>
                            <input
                                type="text"
                                name="vendorCode"
                                value={currentEdit.vendorCode}
                                onChange={handleChange}
                            /> */}
                            {/* <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={currentEdit.state}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={currentEdit.location}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Area</label>
                            <input
                                type="text"
                                name="area"
                                value={currentEdit.area}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Monthly Payment</label>
                            <input
                                type="text"
                                name="monthlyPayment"
                                value={currentEdit.monthlyPayment}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Lease Period</label>
                            <input
                                type="text"
                                name="leasePeriod"
                                value={currentEdit.leasePeriod}
                                onChange={handleChange}
                            /> */}
                            {/* <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={currentEdit.address}
                                onChange={handleChange}
                            /> */}
                        </div>
                        <div className='modal-footer justify-content-center p-3'>
                            <button type="button" onClick={handleUpdate}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Add_Rent;
