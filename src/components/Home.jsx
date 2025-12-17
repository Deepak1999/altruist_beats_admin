import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
const navigate = useNavigate();
  return (
    <div>
      <button style={{
        backgroundColor: '#007BFF', 
        color: '#fff', 
        padding: '10px 20px', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '10px'
      }}
      onClick={() => navigate('/projects')}
      
      >
       Home
      </button>
    </div>
  );
}

export default Home;
