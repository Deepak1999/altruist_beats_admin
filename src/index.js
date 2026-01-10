// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import axios from 'axios';

// axios.interceptors.request.use((request)=>{
//   console.log("request",request); 
//   return request;
// }
// );

// axios.interceptors.request.use((response)=>{
//   console.log("response",response); 
//   return response;
// }
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// // );
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// axios.interceptors.request.use(
//   (request) => {
//     console.log("Request:", request);
//     return request;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   (response) => {
//     console.log("Response:", response);
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 404) {
//         alert("Error 404: Resource Not Found!");
//         navigate("/");
//       } else if (error.response.status === 500) {
//         alert("Error 500: Internal Server Error!");
//             navigate("/");
//       }
//     } else {
//       alert("An unknown error occurred!");
//           navigate("/");
//     }

//     console.error("Response Error:", error);
//     return Promise.reject(error);
//   }
// );

// // axios.interceptors.response.use(
// //   (response) => {
// //     console.log("Response:", response);
// //     return response;
// //   },
// //   (error) => {
// //     if (error.response && error.response.status === 404) {
// //       alert("Error 404: Resource Not Found!");
// //     }
// //     else if (error.response && error.response.status === 500) {
// //       alert("Error 500: Internal Server Error!");
// //     }
// //     console.error("Response Error:", error);
// //     return Promise.reject(error);
// //   }
// // );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>

//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
    console.log("Request:", request);
    return request;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        alert("Error 404: Resource Not Found!");
        // window.location.href = "/"; // Redirects to home page
      } else if (error.response.status === 500) {
        // alert("Error 500: Internal Server Error!");
        // window.location.href = "/"; // Redirects to home page
      }
    } else {
      // alert("An unknown error occurred!");
      // window.location.href = "/"; // Redirects to home page
    }

    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
