import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';

function Logout(){
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/');
        message.success('You have been logged out successfully!');
    }
    return (
        <Button 
        style={{background:'#d9d9d9', border:"#ffffff"}}
        onClick={handleLogout} type="primary">
          Logout
        </Button>
      );
}

export default Logout;