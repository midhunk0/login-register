// @ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [updatedData, setUpdatedData] = useState({
        name: '',
        username: '',
        password: ''
    });

    const updateProfile = async (e) => {
        e.preventDefault();
        const { name, username, password } = updatedData;

        try {
            const { data } = await axios.put('/update-profile', {
                name,
                username,
                password
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                setUpdatedData({
                    name: '',
                    username: '',
                    password: ''
                });
                toast.success('Profile updated successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Profile update failed:', error);
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
                    onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                />
                <label>Username</label>
                <input
                    type='text'
                    placeholder='Enter username..'
                    value={updatedData.username}
                    onChange={(e) => setUpdatedData({ ...updatedData, username: e.target.value })}
                />
                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter password..'
                    value={updatedData.password}
                    onChange={(e) => setUpdatedData({ ...updatedData, password: e.target.value })}
                />
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;
