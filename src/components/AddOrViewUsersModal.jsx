import React from "react";
import Backdrop from "@mui/material/Backdrop";

const AddOrViewUsersModal = ({
    showModal,
    handleCloseModal,
    handleBackdropClick,
    handleSearchSubmit,
    searchTerm,
    setSearchTerm,
    filteredUsers,
    handleCheckboxChange,
    projects,
    selectedProjectId,
    handleAddUser,
}) => {
    return (
        <div
            className={`modal fade ${showModal ? "show" : ""}`}
            tabIndex="-1"
            style={{ display: showModal ? "block" : "none" }}
            aria-labelledby="addUserModalLabel"
            aria-hidden="true"
            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-xl">
                {/* <Backdrop
                    sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                    open={showModal}
                    onClick={handleCloseModal}
                > */}
                    <div
                        className="modal-content"
                        style={{
                            // marginLeft: "-303px",
                            // marginRight: "-303px",
                            // width: "67%",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
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
                                    {/* <div className="col-md-7 search-container"> */}
                                        <form
                                            onSubmit={handleSearchSubmit}
                                            className="search-bar-form d-flex mx-auto" style={{width:"251px"}}
                                        >
                                            {/* <div className="form-group"> */}
                                                <input
                                                    type="text"
                                                    className="form-control search-input"
                                                    placeholder="Search.."
                                                    name="search"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            {/* </div> */}
                                            <button
                                                type="submit"
                                                className="btn btn-primary search-button m-0"
                                            >
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </form>
                                    {/* </div> */}
                                </div>
                                <div className="col-md-6 mx-auto my-2">
                                        <div
                                            className="table-responsive"
                                            style={{
                                                // maxHeight: "300px",
                                                // overflowY: "auto",
                                                // width: "490px",
                                                border: "1px solid #ddd",
                                                maxHeight:'51vh',
                                            }}
                                        >
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
                                                    {filteredUsers.length > 0 ? (
                                                        filteredUsers.map((user) => (
                                                            <tr key={user.id}>
                                                                <td>
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id={`user${user.id}`}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                user.id,
                                                                                user.name,
                                                                                user.email
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
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
                                                maxHeight:'51vh',
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
                                                                project.users.map((user) => (
                                                                    <tr key={user.id}>
                                                                        <td>{user.name}</td>
                                                                        <td>{user.email}</td>
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
        </div>
    );
};

export default AddOrViewUsersModal;
