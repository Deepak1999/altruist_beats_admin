
// import React from 'react';

// const Table = ({ users }) => {
//     return (
//         <div className="row mt-3">
//             <div className="col-md-12 d-flex justify-content-between">
//                 <div className="col-md-7">
//                     <div className="table-responsive">
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>User Name</th>
//                                     <th>Email</th>
//                                     <th>Role</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((user) => (
//                                     <tr key={user.id}>
//                                         <td>
//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input"
//                                                 id={`user-${user.id}`}
//                                             />
//                                         </td>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.role}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="table-responsive">
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th>User Name</th>
//                                     <th>Email</th>
//                                     <th>Role</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.slice(0, 2).map((user) => (
//                                     <tr key={user.id}>
//                                         <td>
//                                             <input
//                                                 type="checkbox"
//                                                 className="form-check-input"
//                                                 id={`user-${user.id}-right`}
//                                             />
//                                         </td>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.role}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Table;
import React, { useEffect, useState } from 'react';

const Table = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchedUsers = [
            { id: 1, username: 'Muskan', email: 'muskan@example.com', role: 'Admin' },
            { id: 2, username: 'Sachin', email: 'sachin@example.com', role: 'Editor' },
            { id: 3, username: 'Rajan', email: 'rajan@example.com', role: 'Viewer' },
            { id: 4, username: 'Neha', email: 'neha@example.com', role: 'Viewer' },
            { id: 5, username: 'Ankita', email: 'ankita@example.com', role: 'Editor' },
        ];
        setUsers(fetchedUsers); // Set the fetched data to state
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`user${user.id}`}
                                    />
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
