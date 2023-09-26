// @ts-nocheck
import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Dashboard = () => {
    const { user } = useContext(UserContext);
    return (
        <div className='dashboard'>
            {!!user && (<h2>Hi {user.name}!</h2>)}
            <img src='./dashboard.png' alt='dashboard'/>
        </div>
    )
}

export default Dashboard