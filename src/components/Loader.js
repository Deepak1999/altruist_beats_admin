
import React from 'react';
import { RiseLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({ loading }) => {
    return (
        <div className="loader-container">
            <RiseLoader color="#1b7ae7" loading={loading} />
        </div>
    );
};

export default Loader;
