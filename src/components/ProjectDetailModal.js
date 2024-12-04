// // // // // // import React from "react";
// // // // // // import { Modal, Button } from "react-bootstrap";

// // // // // // const ProjectDetailsModal = ({ show, onHide }) => {
// // // // // //     return (
// // // // // //         <Modal show={show} onHide={onHide} size="lg" centered>
// // // // // //             <div
// // // // // //                 className="modal-content"
// // // // // //                 style={{
// // // // // //                     borderRadius: "8px",
// // // // // //                     overflow: "hidden",
// // // // // //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // // // // //                 }}
// // // // // //             >
// // // // // //                 <div
// // // // // //                     className="modal-header"
// // // // // //                     style={{
// // // // // //                         background: "#2cb7fd",
// // // // // //                         color: "white",
// // // // // //                         padding: "1rem",
// // // // // //                         fontSize: "1.25rem",
// // // // // //                         fontWeight: "600",
// // // // // //                     }}
// // // // // //                 >
// // // // // //                     <h5 className="modal-title" id="projectDetailModalLabel">Project Details</h5>
// // // // // //                     <button
// // // // // //                         type="button"
// // // // // //                         className="btn-close"
// // // // // //                         onClick={onHide}
// // // // // //                         aria-label="Close"
// // // // // //                         style={{
// // // // // //                             background: "transparent",
// // // // // //                             border: "none",
// // // // // //                             fontSize: "1.25rem",
// // // // // //                             color: "white",
// // // // // //                         }}
// // // // // //                     ></button>
// // // // // //                 </div>

// // // // // //                 <div className="modal-body add_view_user">
// // // // // //                     <div className="row mt-3 mb-3">
// // // // // //                         <div className="col-md-12 d-flex justify-content-between">
// // // // // //                             <div className="col-md-12 mx-auto">
// // // // // //                                 <div
// // // // // //                                     className="card"
// // // // // //                                     style={{
// // // // // //                                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// // // // // //                                         border: "1px solid #e5e5e5",
// // // // // //                                         borderRadius: "6px",
// // // // // //                                         padding: "1rem",
// // // // // //                                         width: "49rem",
// // // // // //                                         marginLeft: "-10px",
// // // // // //                                     }}
// // // // // //                                 >
// // // // // //                                     {/* First Row */}
// // // // // //                                     {/* Your form inputs */}
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 <div
// // // // // //                     className="modal-footer"
// // // // // //                     style={{
// // // // // //                         padding: "1rem",
// // // // // //                         display: "flex",
// // // // // //                         justifyContent: "space-between",
// // // // // //                     }}
// // // // // //                 >
// // // // // //                     <Button
// // // // // //                         variant="info"
// // // // // //                         style={{
// // // // // //                             backgroundColor: "#2cb7fd",
// // // // // //                             border: "none",
// // // // // //                             padding: "0.5rem 1.5rem",
// // // // // //                             fontWeight: "600",
// // // // // //                             color: "white",
// // // // // //                         }}
// // // // // //                     >
// // // // // //                         Update
// // // // // //                     </Button>
// // // // // //                     <Button
// // // // // //                         variant="secondary"
// // // // // //                         onClick={onHide}
// // // // // //                         style={{
// // // // // //                             backgroundColor: "#e5e5e5",
// // // // // //                             color: "black",
// // // // // //                             padding: "0.5rem 1.5rem",
// // // // // //                             fontWeight: "600",
// // // // // //                             borderRadius: "6px",
// // // // // //                             border: "none",
// // // // // //                         }}
// // // // // //                     >
// // // // // //                         Cancel
// // // // // //                     </Button>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </Modal>
// // // // // //     );
// // // // // // };

// // // // // // // export default ProjectDetailsModal;
// // // // // // import React from "react";
// // // // // // import { Modal, Button, Form } from "react-bootstrap";

// // // // // // const ProjectDetailsModal = ({ show, onHide }) => {
// // // // // //     return (
// // // // // //         <Modal show={show} onHide={onHide} size="xl" centered>
// // // // // //             <div
// // // // // //                 className="modal-content"
// // // // // //                 style={{
// // // // // //                     borderRadius: "8px",
// // // // // //                     overflow: "hidden",
// // // // // //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // // // // //                 }}
// // // // // //             >
// // // // // //                 <div
// // // // // //                     className="modal-header"
// // // // // //                     style={{
// // // // // //                         background: "#2cb7fd",
// // // // // //                         color: "white",
// // // // // //                         padding: "1rem",
// // // // // //                         fontSize: "1.25rem",
// // // // // //                         fontWeight: "600",
// // // // // //                     }}
// // // // // //                 >
// // // // // //                     <h5 className="modal-title">Project Details</h5>
// // // // // //                     <button
// // // // // //                         type="button"
// // // // // //                         className="btn-close"
// // // // // //                         onClick={onHide}
// // // // // //                         aria-label="Close"
// // // // // //                         style={{
// // // // // //                             background: "transparent",
// // // // // //                             border: "none",
// // // // // //                             fontSize: "1.25rem",
// // // // // //                             color: "white",
// // // // // //                         }}
// // // // // //                     ></button>
// // // // // //                 </div>

// // // // // //                 <div className="modal-body">
// // // // // //                     {/* Form Area */}
// // // // // //                     <div className="row mt-3 mb-3">
// // // // // //                         <div className="col-md-12">
// // // // // //                             <div className="card p-3" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
// // // // // //                                 {/* First Row */}
// // // // // //                                 <div className="row mb-3">
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Name</Form.Label>
// // // // // //                                             <Form.Control type="text" placeholder="Enter Name" />
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Short Name</Form.Label>
// // // // // //                                             <Form.Control type="text" placeholder="Enter Short Name" />
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Description</Form.Label>
// // // // // //                                             <Form.Control type="text" placeholder="Enter Description" />
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                 </div>

// // // // // //                                 {/* Second Row */}
// // // // // //                                 <div className="row mb-3">
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Created Date</Form.Label>
// // // // // //                                             <Form.Control type="date" />
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Company Name</Form.Label>
// // // // // //                                             <Form.Control type="text" placeholder="Enter Company Name" />
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                     <div className="col-md-4">
// // // // // //                                         <Form.Group>
// // // // // //                                             <Form.Label style={{ fontWeight: "600" }}>Type</Form.Label>
// // // // // //                                             <Form.Select>
// // // // // //                                                 <option value="option1">Option 1</option>
// // // // // //                                                 <option value="option2">Option 2</option>
// // // // // //                                                 <option value="option3">Option 3</option>
// // // // // //                                             </Form.Select>
// // // // // //                                         </Form.Group>
// // // // // //                                     </div>
// // // // // //                                 </div>
// // // // // //                             </div>
// // // // // //                         </div>
// // // // // //                     </div>
// // // // // //                 </div>

// // // // // //                 <div
// // // // // //                     className="modal-footer"
// // // // // //                     style={{
// // // // // //                         padding: "1rem",
// // // // // //                         display: "flex",
// // // // // //                         justifyContent: "flex-end",
// // // // // //                         gap: "10px",
// // // // // //                     }}
// // // // // //                 >
// // // // // //                     <Button
// // // // // //                         style={{
// // // // // //                             backgroundColor: "#2cb7fd",
// // // // // //                             border: "none",
// // // // // //                             padding: "0.5rem 1.5rem",
// // // // // //                             fontWeight: "600",
// // // // // //                         }}
// // // // // //                     >
// // // // // //                         Update
// // // // // //                     </Button>
// // // // // //                     <Button
// // // // // //                         onClick={onHide}
// // // // // //                         style={{
// // // // // //                             backgroundColor: "#e5e5e5",
// // // // // //                             color: "black",
// // // // // //                             padding: "0.5rem 1.5rem",
// // // // // //                             fontWeight: "600",
// // // // // //                             borderRadius: "6px",
// // // // // //                             border: "none",
// // // // // //                         }}
// // // // // //                     >
// // // // // //                         Cancel
// // // // // //                     </Button>
// // // // // //                 </div>
// // // // // //             </div>
// // // // // //         </Modal>
// // // // // //     );
// // // // // // };

// // // // // // export default ProjectDetailsModal;
// // // // // import React from "react";
// // // // // import { Modal, Button, Form } from "react-bootstrap";

// // // // // const ProjectDetailsModal = ({ show, onHide }) => {
// // // // //     return (
// // // // //         <Modal show={show} onHide={onHide} size="xl" centered>
// // // // //             <div
// // // // //                 className="modal-content"
// // // // //                 style={{
// // // // //                     borderRadius: "8px",
// // // // //                     overflow: "hidden",
// // // // //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // // // //                 }}
// // // // //             >
// // // // //                 <div
// // // // //                     className="modal-header"
// // // // //                     style={{
// // // // //                         background: "#2cb7fd",
// // // // //                         color: "white",
// // // // //                         padding: "1rem",
// // // // //                         fontSize: "1.25rem",
// // // // //                         fontWeight: "600",
// // // // //                     }}
// // // // //                 >
// // // // //                     <h5 className="modal-title">Project Details</h5>
// // // // //                     <button
// // // // //                         type="button"
// // // // //                         className="btn-close"
// // // // //                         onClick={onHide}
// // // // //                         aria-label="Close"
// // // // //                         style={{
// // // // //                             background: "transparent",
// // // // //                             border: "none",
// // // // //                             fontSize: "1.25rem",
// // // // //                             color: "white",
// // // // //                         }}
// // // // //                     ></button>
// // // // //                 </div>

// // // // //                 <div
// // // // //                     className="modal-body"
// // // // //                     style={{
// // // // //                         padding: "2rem",
// // // // //                     }}
// // // // //                 >
// // // // //                     {/* Form Area */}
// // // // //                     <div className="row mt-3 mb-3">
// // // // //                         <div className="col-md-12">
// // // // //                             <div
// // // // //                                 className="card p-3"
// // // // //                                 style={{
// // // // //                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// // // // //                                 }}
// // // // //                             >
// // // // //                                 {/* First Row */}
// // // // //                                 <div className="row mb-3">
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Name
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Control
// // // // //                                                 type="text"
// // // // //                                                 placeholder="Enter Name"
// // // // //                                             />
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Short Name
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Control
// // // // //                                                 type="text"
// // // // //                                                 placeholder="Enter Short Name"
// // // // //                                             />
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Description
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Control
// // // // //                                                 type="text"
// // // // //                                                 placeholder="Enter Description"
// // // // //                                             />
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                 </div>

// // // // //                                 {/* Second Row */}
// // // // //                                 <div className="row mb-3">
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Created Date
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Control type="date" />
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Company Name
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Control
// // // // //                                                 type="text"
// // // // //                                                 placeholder="Enter Company Name"
// // // // //                                             />
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                     <div className="col-md-4">
// // // // //                                         <Form.Group>
// // // // //                                             <Form.Label
// // // // //                                                 style={{
// // // // //                                                     fontWeight: "600",
// // // // //                                                 }}
// // // // //                                             >
// // // // //                                                 Type
// // // // //                                             </Form.Label>
// // // // //                                             <Form.Select>
// // // // //                                                 <option value="option1">
// // // // //                                                     Option 1
// // // // //                                                 </option>
// // // // //                                                 <option value="option2">
// // // // //                                                     Option 2
// // // // //                                                 </option>
// // // // //                                                 <option value="option3">
// // // // //                                                     Option 3
// // // // //                                                 </option>
// // // // //                                             </Form.Select>
// // // // //                                         </Form.Group>
// // // // //                                     </div>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         </div>
// // // // //                     </div>
// // // // //                 </div>

// // // // //                 <div
// // // // //                     className="modal-footer"
// // // // //                     style={{
// // // // //                         padding: "1rem",
// // // // //                         display: "flex",
// // // // //                         justifyContent: "flex-end",
// // // // //                         gap: "10px",
// // // // //                     }}
// // // // //                 >
// // // // //                     <Button
// // // // //                         style={{
// // // // //                             backgroundColor: "#2cb7fd",
// // // // //                             border: "none",
// // // // //                             padding: "0.5rem 1.5rem",
// // // // //                             fontWeight: "600",
// // // // //                         }}
// // // // //                     >
// // // // //                         Update
// // // // //                     </Button>
// // // // //                     <Button
// // // // //                         onClick={onHide}
// // // // //                         style={{
// // // // //                             backgroundColor: "#e5e5e5",
// // // // //                             color: "black",
// // // // //                             padding: "0.5rem 1.5rem",
// // // // //                             fontWeight: "600",
// // // // //                             borderRadius: "6px",
// // // // //                             border: "none",
// // // // //                         }}
// // // // //                     >
// // // // //                         Cancel
// // // // //                     </Button>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </Modal>
// // // // //     );
// // // // // };

// // // // // export default ProjectDetailsModal;
// // // // import React from "react";
// // // // import { Modal, Button, Form } from "react-bootstrap";

// // // // const ProjectDetailsModal = ({ show, onHide }) => {
// // // //     const baseStyles = {
// // // //         "--bs-blue": "#0d6efd",
// // // //         "--bs-indigo": "#6610f2",
// // // //         "--bs-purple": "#6f42c1",
// // // //         "--bs-pink": "#d63384",
// // // //         "--bs-red": "#dc3545",
// // // //         "--bs-orange": "#fd7e14",
// // // //         "--bs-yellow": "#ffc107",
// // // //         "--bs-green": "#198754",
// // // //         "--bs-teal": "#20c997",
// // // //         "--bs-cyan": "#0dcaf0",
// // // //         "--bs-white": "#fff",
// // // //         "--bs-gray": "#6c757d",
// // // //         "--bs-gray-dark": "#343a40",
// // // //         "--bs-primary": "#0d6efd",
// // // //         "--bs-secondary": "#6c757d",
// // // //         "--bs-success": "#198754",
// // // //         "--bs-info": "#0dcaf0",
// // // //         "--bs-warning": "#ffc107",
// // // //         "--bs-danger": "#dc3545",
// // // //         "--bs-light": "#f8f9fa",
// // // //         "--bs-dark": "#212529",
// // // //         "--bs-font-sans-serif": 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
// // // //         "--bs-font-monospace": 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
// // // //         "--bs-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
// // // //         fontFamily: "var(--bs-font-sans-serif)",
// // // //         fontSize: "1rem",
// // // //         fontWeight: "400",
// // // //         lineHeight: "1.5",
// // // //         color: "#212529",
// // // //         WebkitTextSizeAdjust: "100%",
// // // //         WebkitTapHighlightColor: "transparent",
// // // //         "--bs-gutter-x": "1.5rem",
// // // //         "--bs-gutter-y": "0",
// // // //         wordWrap: "break-word",
// // // //         pointerEvents: "auto",
// // // //         boxSizing: "border-box",
// // // //         position: "relative",
// // // //         flex: "1 1 auto",
// // // //         padding: "1rem",
// // // //     };

// // // //     return (
// // // //         <Modal show={show} onHide={onHide} size="xl" centered>
// // // //             <div
// // // //                 className="modal-content"
// // // //                 style={{
// // // //                     borderRadius: "8px",
// // // //                     overflow: "hidden",
// // // //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // // //                 }}
// // // //             >
// // // //                 <div
// // // //                     className="modal-header"
// // // //                     style={{
// // // //                         background: "#2cb7fd",
// // // //                         color: "white",
// // // //                         padding: "1rem",
// // // //                         fontSize: "1.25rem",
// // // //                         fontWeight: "600",
// // // //                     }}
// // // //                 >
// // // //                     <h5 className="modal-title">Project Details</h5>
// // // //                     <button
// // // //                         type="button"
// // // //                         className="btn-close"
// // // //                         onClick={onHide}
// // // //                         aria-label="Close"
// // // //                         style={{
// // // //                             background: "transparent",
// // // //                             border: "none",
// // // //                             fontSize: "1.25rem",
// // // //                             color: "white",
// // // //                         }}
// // // //                     ></button>
// // // //                 </div>

// // // //                 <div
// // // //                     className="modal-body"
// // // //                     style={{
// // // //                         ...baseStyles, // Applying the base styles
// // // //                         padding: "2rem",
// // // //                     }}
// // // //                 >
// // // //                     {/* Form Area */}
// // // //                     <div className="row mt-3 mb-3">
// // // //                         <div className="col-md-12">
// // // //                             <div
// // // //                                 className="card p-3"
// // // //                                 style={{
// // // //                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// // // //                                 }}
// // // //                             >
// // // //                                 {/* First Row */}
// // // //                                 <div className="row mb-3">
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Name
// // // //                                             </Form.Label>
// // // //                                             <Form.Control
// // // //                                                 type="text"
// // // //                                                 placeholder="Enter Name"
// // // //                                             />
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Short Name
// // // //                                             </Form.Label>
// // // //                                             <Form.Control
// // // //                                                 type="text"
// // // //                                                 placeholder="Enter Short Name"
// // // //                                             />
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Description
// // // //                                             </Form.Label>
// // // //                                             <Form.Control
// // // //                                                 type="text"
// // // //                                                 placeholder="Enter Description"
// // // //                                             />
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                 </div>

// // // //                                 {/* Second Row */}
// // // //                                 <div className="row mb-3">
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Created Date
// // // //                                             </Form.Label>
// // // //                                             <Form.Control type="date" />
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Company Name
// // // //                                             </Form.Label>
// // // //                                             <Form.Control
// // // //                                                 type="text"
// // // //                                                 placeholder="Enter Company Name"
// // // //                                             />
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                     <div className="col-md-4">
// // // //                                         <Form.Group>
// // // //                                             <Form.Label
// // // //                                                 style={{
// // // //                                                     fontWeight: "600",
// // // //                                                 }}
// // // //                                             >
// // // //                                                 Type
// // // //                                             </Form.Label>
// // // //                                             <Form.Select>
// // // //                                                 <option value="option1">
// // // //                                                     Option 1
// // // //                                                 </option>
// // // //                                                 <option value="option2">
// // // //                                                     Option 2
// // // //                                                 </option>
// // // //                                                 <option value="option3">
// // // //                                                     Option 3
// // // //                                                 </option>
// // // //                                             </Form.Select>
// // // //                                         </Form.Group>
// // // //                                     </div>
// // // //                                 </div>
// // // //                             </div>
// // // //                         </div>
// // // //                     </div>
// // // //                 </div>

// // // //                 <div
// // // //                     className="modal-footer"
// // // //                     style={{
// // // //                         padding: "1rem",
// // // //                         display: "flex",
// // // //                         justifyContent: "flex-end",
// // // //                         gap: "10px",
// // // //                     }}
// // // //                 >
// // // //                     <Button
// // // //                         style={{
// // // //                             backgroundColor: "#2cb7fd",
// // // //                             border: "none",
// // // //                             padding: "0.5rem 1.5rem",
// // // //                             fontWeight: "600",
// // // //                         }}
// // // //                     >
// // // //                         Update
// // // //                     </Button>
// // // //                     <Button
// // // //                         onClick={onHide}
// // // //                         style={{
// // // //                             backgroundColor: "#e5e5e5",
// // // //                             color: "black",
// // // //                             padding: "0.5rem 1.5rem",
// // // //                             fontWeight: "600",
// // // //                             borderRadius: "6px",
// // // //                             border: "none",
// // // //                         }}
// // // //                     >
// // // //                         Cancel
// // // //                     </Button>
// // // //                 </div>
// // // //             </div>
// // // //         </Modal>
// // // //     );
// // // // };

// // // // export default ProjectDetailsModal;
// // // import React from "react";
// // // import { Modal, Button, Form } from "react-bootstrap";

// // // const ProjectDetailsModal = ({ show, onHide }) => {
// // //     const baseStyles = {
// // //         fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
// // //         color: "#212529",
// // //         padding: "1rem",
// // //         boxSizing: "border-box",
// // //         position: "relative",
// // //     };

// // //     return (
// // //         <Modal show={show} onHide={onHide} size="lg" centered>
// // //             <div
// // //                 className="modal-content"
// // //                 style={{
// // //                     borderRadius: "8px",
// // //                     overflow: "hidden",
// // //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // //                     backgroundColor: "#f0f9ff", // Light blue background
// // //                 }}
// // //             >
// // //                 <div
// // //                     className="modal-header"
// // //                     style={{
// // //                         backgroundColor: "#2cb7fd",
// // //                         color: "white",
// // //                         padding: "1rem",
// // //                         fontSize: "1.25rem",
// // //                         fontWeight: "600",
// // //                     }}
// // //                 >
// // //                     <h5 className="modal-title">Project Details</h5>
// // //                     <button
// // //                         type="button"
// // //                         className="btn-close"
// // //                         onClick={onHide}
// // //                         aria-label="Close"
// // //                         style={{
// // //                             background: "transparent",
// // //                             border: "none",
// // //                             fontSize: "1.25rem",
// // //                             color: "white",
// // //                         }}
// // //                     ></button>
// // //                 </div>

// // //                 <div
// // //                     className="modal-body"
// // //                     style={{
// // //                         ...baseStyles,
// // //                         padding: "2rem",
// // //                     }}
// // //                 >
// // //                     {/* Form Area */}
// // //                     <div className="row mt-3 mb-3">
// // //                         <div className="col-md-12">
// // //                             <div
// // //                                 className="card p-4"
// // //                                 style={{
// // //                                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
// // //                                     borderRadius: "8px",
// // //                                 }}
// // //                             >
// // //                                 {/* First Row */}
// // //                                 <div className="row mb-4">
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Name
// // //                                             </Form.Label>
// // //                                             <Form.Control
// // //                                                 type="text"
// // //                                                 placeholder="Enter Name"
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             />
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Short Name
// // //                                             </Form.Label>
// // //                                             <Form.Control
// // //                                                 type="text"
// // //                                                 placeholder="Enter Short Name"
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             />
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Description
// // //                                             </Form.Label>
// // //                                             <Form.Control
// // //                                                 type="text"
// // //                                                 placeholder="Enter Description"
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             />
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                 </div>

// // //                                 {/* Second Row */}
// // //                                 <div className="row mb-4">
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Created Date
// // //                                             </Form.Label>
// // //                                             <Form.Control
// // //                                                 type="date"
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             />
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Company Name
// // //                                             </Form.Label>
// // //                                             <Form.Control
// // //                                                 type="text"
// // //                                                 placeholder="Enter Company Name"
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             />
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                     <div className="col-md-4">
// // //                                         <Form.Group>
// // //                                             <Form.Label
// // //                                                 style={{
// // //                                                     fontWeight: "600",
// // //                                                     marginBottom: "0.5rem",
// // //                                                 }}
// // //                                             >
// // //                                                 Type
// // //                                             </Form.Label>
// // //                                             <Form.Select
// // //                                                 style={{
// // //                                                     padding: "0.8rem",
// // //                                                     fontSize: "1rem",
// // //                                                     borderRadius: "5px",
// // //                                                     border: "1px solid #ccc",
// // //                                                 }}
// // //                                             >
// // //                                                 <option value="option1">
// // //                                                     Option 1
// // //                                                 </option>
// // //                                                 <option value="option2">
// // //                                                     Option 2
// // //                                                 </option>
// // //                                                 <option value="option3">
// // //                                                     Option 3
// // //                                                 </option>
// // //                                             </Form.Select>
// // //                                         </Form.Group>
// // //                                     </div>
// // //                                 </div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 <div
// // //                     className="modal-footer"
// // //                     style={{
// // //                         padding: "1rem",
// // //                         display: "flex",
// // //                         justifyContent: "flex-end",
// // //                         gap: "10px",
// // //                     }}
// // //                 >
// // //                     <Button
// // //                         style={{
// // //                             backgroundColor: "#2cb7fd",
// // //                             border: "none",
// // //                             padding: "0.8rem 1.5rem",
// // //                             fontWeight: "600",
// // //                             borderRadius: "5px",
// // //                         }}
// // //                     >
// // //                         Update
// // //                     </Button>
// // //                     <Button
// // //                         onClick={onHide}
// // //                         style={{
// // //                             backgroundColor: "#e5e5e5",
// // //                             color: "black",
// // //                             padding: "0.8rem 1.5rem",
// // //                             fontWeight: "600",
// // //                             borderRadius: "5px",
// // //                             border: "none",
// // //                         }}
// // //                     >
// // //                         Cancel
// // //                     </Button>
// // //                 </div>
// // //             </div>
// // //         </Modal>
// // //     );
// // // };

// // // export default ProjectDetailsModal;
// // import React from "react";
// // import { Modal, Button, Form } from "react-bootstrap";

// // const ProjectDetailsModal = ({ show, onHide }) => {
// //     const baseStyles = {
// //         "--bs-blue": "#0d6efd",
// //         "--bs-indigo": "#6610f2",
// //         "--bs-purple": "#6f42c1",
// //         "--bs-pink": "#d63384",
// //         "--bs-red": "#dc3545",
// //         "--bs-orange": "#fd7e14",
// //         "--bs-yellow": "#ffc107",
// //         "--bs-green": "#198754",
// //         "--bs-teal": "#20c997",
// //         "--bs-cyan": "#0dcaf0",
// //         "--bs-white": "#fff",
// //         "--bs-gray": "#6c757d",
// //         "--bs-gray-dark": "#343a40",
// //         "--bs-primary": "#0d6efd",
// //         "--bs-secondary": "#6c757d",
// //         "--bs-success": "#198754",
// //         "--bs-info": "#0dcaf0",
// //         "--bs-warning": "#ffc107",
// //         "--bs-danger": "#dc3545",
// //         "--bs-light": "#f8f9fa",
// //         "--bs-dark": "#212529",
// //         "--bs-font-sans-serif": 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
// //         "--bs-font-monospace": 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
// //         "--bs-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))",
// //         fontFamily: "var(--bs-font-sans-serif)",
// //         fontSize: "1rem",
// //         fontWeight: "400",
// //         lineHeight: "1.5",
// //         color: "#212529",
// //         WebkitTextSizeAdjust: "100%",
// //         WebkitTapHighlightColor: "transparent",
// //         "--bs-gutter-x": "1.5rem",
// //         "--bs-gutter-y": "0",
// //         wordWrap: "break-word",
// //         pointerEvents: "auto",
// //         boxSizing: "border-box",
// //         position: "relative",
// //         flex: "1 1 auto",
// //         padding: "1rem",
// //     };

// //     return (
// //         <Modal show={show} onHide={onHide} size="xl" centered>
// //             <div
// //                 className="modal-content"
// //                 style={{
// //                     borderRadius: "8px",
// //                     overflow: "hidden",
// //                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
// //                 }}
// //             >
// //                 <div
// //                     className="modal-header"
// //                     style={{
// //                         backgroundColor: "#2cb7fd",  // Adjusted header background color
// //                         color: "white",
// //                         padding: "1rem 1.5rem",
// //                         fontSize: "1.5rem",  // Increased font size
// //                         fontWeight: "600",
// //                         borderBottom: "none",
// //                     }}
// //                 >
// //                     <h5 className="modal-title">Project Details</h5>
// //                     <button
// //                         type="button"
// //                         className="btn-close"
// //                         onClick={onHide}
// //                         aria-label="Close"
// //                         style={{
// //                             background: "transparent",
// //                             border: "none",
// //                             fontSize: "1.25rem",
// //                             color: "white",
// //                         }}
// //                     ></button>
// //                 </div>

// //                 <div
// //                     className="modal-body"
// //                     style={{
// //                         ...baseStyles, // Applying base styles
// //                         padding: "2rem 3rem",  // Increased padding for more space
// //                     }}
// //                 >
// //                     {/* Form Area */}
// //                     <div className="row mt-3 mb-3">
// //                         <div className="col-md-12">
// //                             <div
// //                                 className="card p-4"
// //                                 style={{
// //                                     boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",  // Subtle card shadow
// //                                     borderRadius: "10px",  // Rounded card edges
// //                                 }}
// //                             >
// //                                 {/* First Row */}
// //                                 <div className="row mb-4">
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Name
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="Enter Name"
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled input
// //                                             />
// //                                         </Form.Group>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Short Name
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="Enter Short Name"
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled input
// //                                             />
// //                                         </Form.Group>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Description
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="Enter Description"
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled input
// //                                             />
// //                                         </Form.Group>
// //                                     </div>
// //                                 </div>

// //                                 {/* Second Row */}
// //                                 <div className="row mb-4">
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Created Date
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="date"
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled input
// //                                             />
// //                                         </Form.Group>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Company Name
// //                                             </Form.Label>
// //                                             <Form.Control
// //                                                 type="text"
// //                                                 placeholder="Enter Company Name"
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled input
// //                                             />
// //                                         </Form.Group>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <Form.Group>
// //                                             <Form.Label
// //                                                 style={{
// //                                                     fontWeight: "600",
// //                                                 }}
// //                                             >
// //                                                 Type
// //                                             </Form.Label>
// //                                             <Form.Select
// //                                                 style={{ padding: "0.75rem", fontSize: "1rem" }}  // Styled select input
// //                                             >
// //                                                 <option value="option1">Option 1</option>
// //                                                 <option value="option2">Option 2</option>
// //                                                 <option value="option3">Option 3</option>
// //                                             </Form.Select>
// //                                         </Form.Group>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div
// //                     className="modal-footer"
// //                     style={{
// //                         padding: "1.5rem 2rem",  // Increased padding for the footer
// //                         display: "flex",
// //                         justifyContent: "flex-end",
// //                         gap: "10px",
// //                     }}
// //                 >
// //                     <Button
// //                         style={{
// //                             backgroundColor: "#2cb7fd",
// //                             border: "none",
// //                             padding: "0.75rem 2rem",  // Increased button size
// //                             fontWeight: "600",
// //                             borderRadius: "5px",  // Rounded corners for the button
// //                         }}
// //                     >
// //                         Update
// //                     </Button>
// //                     <Button
// //                         onClick={onHide}
// //                         style={{
// //                             backgroundColor: "#e5e5e5",
// //                             color: "black",
// //                             padding: "0.75rem 2rem",  // Increased button size
// //                             fontWeight: "600",
// //                             borderRadius: "5px",  // Rounded corners for the button
// //                             border: "none",
// //                         }}
// //                     >
// //                         Cancel
// //                     </Button>
// //                 </div>
// //             </div>
// //         </Modal>
// //     );
// // };

// // export default ProjectDetailsModal;/
// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// const ProjectDetailsModal = ({ show, onHide }) => {
//     return (
//         <Dialog open={show} onClose={onHide} fullWidth maxWidth="xl" style={{ maxWidth: '1088px', marginLeft: 'auto', marginRight: 'auto' }}>
//             <DialogTitle
//                 style={{
//                     backgroundColor: '#0d6efd', // Primary color
//                     color: 'white',
//                     padding: '1rem 1.5rem',
//                     fontSize: '1.5rem',
//                     fontWeight: '600',
//                 }}
//             >
//                 Project Details
//             </DialogTitle>


//             <div style={{
//                 position: 'relative',
//                 display: 'flex',
//                 margin: "30px",
//                 flexDirection: 'column',
//                 minWidth: '0',
//                 wordWrap: 'break-word',
//                 backgroundColor: '#fff',
//                 backgroundClip: 'borderBox',
//                 padding: '-10px',
//                 border: '1px solid rgba(0, 0, 0, .125)',
//                 boxShadow: '0px -2px 11px 0px rgba(0, 0, 0, .1), 4px 2px 4px 4px rgb(0 0 0 / 6%)',
  
//                 borderRadius: '.25rem'
//             }}>
//                 <DialogContent
//                     style={{
//                         fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
//                         fontSize: '1rem',

//                         border: '3px solid rgba(0, 0, 0, .125)',
//                     }}
//                 >
//                     <Grid container spacing={3}>
//                         {/* First Row */}
//                         <Grid item xs={12} sm={4}>
//                             <TextField
//                                 label="Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 placeholder="Enter Name"
//                                 style={{
//                                     marginBottom: '1rem',
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <TextField
//                                 label="Short Name"
//                                 variant="outlined"
//                                 fullWidth
//                                 placeholder="Enter Short Name"
//                                 style={{
//                                     marginBottom: '1rem',
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={4}>
//                             <TextField
//                                 label="Description"
//                                 variant="outlined"
//                                 fullWidth
//                                 placeholder="Enter Description"
//                                 style={{
//                                     marginBottom: '1rem',
//                                 }}
//                             />
//                         </Grid>

//                         {/* Second Row */}
//                         <Grid item xs={12} sm={4}>
//                             <TextField
//                                 label="Created Date"
//                                 variant="outlined"
//                                 type="date"
//                                 fullWidth
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                                 style={{
//                                     marginBottom: '1rem',
//                                 }}
//                             />
//                         </Grid>
                       
                        
//                     </Grid>
//                 </DialogContent>
//             </div>
//             <DialogActions style={{ padding: '1.5rem 2rem' }}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => console.log('Update clicked')}
//                     style={{
//                         fontWeight: '600',
//                         padding: '0.75rem 2rem',
//                         borderRadius: '0.3rem',
//                     }}
//                 >
//                     Update
//                 </Button>
//                 <Button
//                     onClick={onHide}
//                     variant="outlined"
//                     color="secondary"
//                     style={{
//                         fontWeight: '600',
//                         padding: '0.75rem 2rem',
//                         borderRadius: '0.3rem',
//                     }}
//                 >
//                     Cancel
//                 </Button>
//             </DialogActions>
//         </Dialog >
//     );
// };

// export default ProjectDetailsModal;

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';

const ProjectDetailsModal = ({ show, onHide, project }) => {
    return (
        <Dialog open={show} onClose={onHide} fullWidth maxWidth="xl" style={{ maxWidth: '1088px', marginLeft: 'auto', marginRight: 'auto' }}>
            <DialogTitle
                style={{
                    backgroundColor: '#0d6efd', // Primary color
                    color: 'white',
                    padding: '1rem 1.5rem',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                }}
            >
                Project Details
            </DialogTitle>

            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    margin: '30px',
                    flexDirection: 'column',
                    minWidth: '0',
                    wordWrap: 'break-word',
                    backgroundColor: '#fff',
                    backgroundClip: 'borderBox',
                    padding: '-10px',
                    border: '1px solid rgba(0, 0, 0, .125)',
                    boxShadow: '0px -2px 11px 0px rgba(0, 0, 0, .1), 4px 2px 4px 4px rgb(0 0 0 / 6%)',
                    borderRadius: '.25rem',
                }}
            >
                <DialogContent
                    style={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                        fontSize: '1rem',
                        border: '3px solid rgba(0, 0, 0, .125)',
                    }}
                >
                    <Grid container spacing={3}>
                        {/* First Row */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Name"
                                value={project?.projectName || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Short Name"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Short Name"
                                value={project?.shortName || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter Description"
                                value={project?.description || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>

                        {/* Second Row */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Created Date"
                                variant="outlined"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={project?.createdDate || ''}
                                style={{
                                    marginBottom: '1rem',
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </div>
            <DialogActions style={{ padding: '1.5rem 2rem' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log('Update clicked')}
                    style={{
                        fontWeight: '600',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.3rem',
                    }}
                >
                    Update
                </Button>
                <Button
                    onClick={onHide}
                    variant="outlined"
                    color="secondary"
                    style={{
                        fontWeight: '600',
                        padding: '0.75rem 2rem',
                        borderRadius: '0.3rem',
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDetailsModal;
