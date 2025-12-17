import React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";

const AddOrViewUsersModal = ({
    showModal,
    handleCloseModal,
    handleBackdropClick,
    handleSearchSubmit,
    searchTerm,
    setSearchTerm,
    filteredUsers2,
    users,
    handleCheckboxChange,
    projects,
    selectedProjectId,
    handleAddUser,
    selectedUsers,
    setSelectedUsers,
    // setFilteredUsers,
    projectUsers,
    setProjectUsers
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(filteredUsers2);
    console.log("Filtered Users:", filteredUsers);
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        console.log("Search Query:", query);
        console.log("Users before filtering:", projectUsers);

        if (!query) {
            setFilteredUsers(projectUsers);
        } else {
            const filtered = projectUsers.filter((projectUsers) => {
                const userName = projectUsers.userName ? projectUsers.userName.toLowerCase() : "";
                const email = projectUsers.email ? projectUsers.email.toLowerCase() : "";
                const role = projectUsers.role ? projectUsers.role.toLowerCase() : "";

                return userName.includes(query) || email.includes(query) || role.includes(query);
            });

            console.log("Filtered Users:", filtered);
            setFilteredUsers(filtered);
        }
    };


    useEffect(() => {
        setFilteredUsers(projectUsers);
        setSearchQuery("");// Update when projectUsers changes
    }, [projectUsers]);


    return (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
            aria-labelledby="addUserModalLabel"

            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-xl">

                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >

                    <div
                        className="modal-header"
                        style={{ background: "#2cb7fd", color: "white" }}
                    >
                        <h5 className="modal-title" id="addUserModalLabel">
                            Add User or View Users
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleCloseModal}
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body add_view_user">
                        <div className="row">
                            <div
                                className="col-md-12"
                                style={{
                                    display: "flex",
                                    justifyContent: "end",
                                    color: "white",
                                }}
                            >

                                {/* <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="Search by name, email, or role..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                /> */}

                                {/* <form className="d-flex mx-auto" style={{ width: "251px" }}>
                                    <input
                                        type="text"
                                        className="form-control my-2"
                                        placeholder="Search by name, email, or role..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        name="search"
                                    />
                                    <button type="submit" className="btn btn-outline-secondary m-0">
                                        <i className="fa fa-search" />
                                    </button>
                                </form> */}
                                <form className="d-flex mx-auto">
                                    <div className="row w-100">
                                        <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: "-34rem" }}>
                                            <input
                                                style={{ width: "15rem" }}
                                                type="text"
                                                className="form-control my-2"
                                                placeholder="Search by project name"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                                name="search"
                                            />
                                            <button type="submit" className="btn btn-outline-secondary m-0 p-2" style={{ height: "max-content" }}>
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="col-md-6 mx-auto my-2">
                                <div
                                    className="table-responsive"
                                    style={{
                                        // maxHeight: "300px",
                                        // overflowY: "auto",
                                        // width: "490px",
                                        border: "1px solid #ddd",
                                        maxHeight: '51vh',
                                    }}
                                >
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style={{ width: "311px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    User Name</th>
                                                 <th style={{ width: "311px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                   Email</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredUsers.length > 0 ? (
                                                filteredUsers.map((user, u) => (
                                                    <tr
                                                        // key={user.id}
                                                        key={u}
                                                    >
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id={`user${user.id}`}
                                                                checked={selectedUsers.some(selectedUser => selectedUser.id === user.userId)}
                                                                onChange={() =>
                                                                    handleCheckboxChange(
                                                                        user.userId,
                                                                        user.userName || user.name,
                                                                        user.email
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td
                                                            style={{
                                                                maxWidth: "170px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                cursor: "pointer",
                                                            }}
                                                        title = {user.userName || user.name}
                                                        >{user.userName || user.name}</td>
                                                        <td 
                                                         style={{
                                                                maxWidth: "170px",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                cursor: "pointer",
                                                            }} title = {user.email}>{user.email}</td>
                                                        <td>{user.role || "N/A"}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4">No users found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Selected Users Table */}
                            <div className="col-md-6 mx-auto my-2">
                                <div
                                    className="table-responsive"
                                    style={{
                                        // marginLeft: "-190px",
                                        // maxHeight: "300px",
                                        // overflowY: "auto",
                                        border: "1px solid #ddd",
                                        maxHeight: '51vh',
                                    }}
                                >
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>User Name</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.length > 0 ? (
                                                projects
                                                    .filter(
                                                        (project) =>
                                                            project.projectId === selectedProjectId
                                                    )
                                                    .map((project) =>
                                                        project.users.map((us, s) => (
                                                            <tr
                                                                // key={us.id}
                                                                key={s}
                                                            >
                                                                <td>{us.name}</td>
                                                                <td>{us.email}</td>
                                                            </tr>
                                                        ))
                                                    )
                                            ) : (
                                                <tr>
                                                    <td colSpan="2" className="text-center">
                                                        No users found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-info"
                            style={{ color: "white" }}
                            onClick={(e) => {
                                handleAddUser(e);
                                handleCloseModal(e);
                            }}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="btn btn-info"
                            style={{ color: "white" }}
                            onClick={handleAddUser}
                        >
                            Add & Continue
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            style={{ border: "none", background: "transparent" }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                {/* </Backdrop> */}
            </div>
        </div >
    );
};

export default AddOrViewUsersModal;
