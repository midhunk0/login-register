// @ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        identifier: '',
        password: '',
    })

    const loginUser = async(e) => {
        e.preventDefault()
        const { identifier, password } = data;
        try{
            const { data } = await axios.post('/login', {
                identifier,
                password
            })
            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({...data, password: ''});
                toast.success('login successfull, welcome back')
                navigate('/dashboard')
            }
        }
        catch(error){
            console.log('login failed!!',error);
        }
    }

    return (
        <div className='login'>
            <img src='./login.png' alt='login'/>
            <form onSubmit={loginUser}>
                <label>Email or Username</label>
                <input
                    name='identifier'
                    placeholder={'Enter email or username'}
                    value={data.identifier}
                    onChange={(e) => setData({...data, identifier: e.target.value})}
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Enter password...'
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login