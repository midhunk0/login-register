// @ts-nocheck
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        try {
            await axios.post('/logout');
            localStorage.removeItem('token')
            navigate('/login')
        }
        catch(error){
            console.error('Logout failed:', error);
        }
    }
    if(!user){
        navigate('/login')
        return null;
    }

    const handleUpdate = async() =>{
        navigate('/update')
    }

    return (
        <div className='dashboard'>
            <img src='./dashboard.png' alt='dashboard'/>
            <div className='button-group'>
            {!!user && (<h2>Hi {user.username}!</h2>)}
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleLogout}>Logout</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Dashboard