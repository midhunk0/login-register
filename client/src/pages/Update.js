/* eslint-disable no-undef */
// @ts-nocheck
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [updatedData, setUpdatedData] = useState({
        name: '',
        username: '',
        password: ''
    });

    const updateProfile = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.put(`/update/${user.id}`, updatedData);
            const updatedUser = res.data;
            setUser(updatedUser);
            toast.success('profile updated successfully');
            navigate('/dashboard');

        }   
        catch(error){
            toast.error('error while updating profile!!');
        }
    };

    return (
        <div className='register'>
            <img src='./register.png' alt='update' />
            <form onSubmit={updateProfile}>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Enter name..'
                    value={updatedData.name}
                    onChange={(e) => setUpdatedData({...updatedData, name: e.target.value})}
                />
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Enter username..'
                    value={updatedData.username}
                    onChange={(e) => setUpdatedData({...updatedData, username: e.target.value})}
                />
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter password..'
                    value={updatedData.password}
                    onChange={(e) => setUpdatedData({...updatedData, password: e.target.value})}
                />
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
