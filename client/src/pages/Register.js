// @ts-nocheck
import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const registerUser = async(e) => {
        e.preventDefault()
        const { name, username, email, password, confirmPassword } = data;
        //check if the passwords match
        if(password !== confirmPassword){
            toast.error("password don't match")
            return
        }
        try{
            const { data } = await axios.post('/register', {
                name, username, email, password
            })
            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({})
                toast.success('register successfull, welcome');
                navigate('/login');
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className='register'>
            <img src='./register.png' alt='register'/>
            <form onSubmit={registerUser}>
                <label>Name</label>
                <input type='text' placeholder='enter name..' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                <label>Username</label>
                <input type='text' placeholder='enter username..' value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                <label>Email</label>
                <input type='email' placeholder='enter email..' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                <label>Password</label>
                <input type='password' placeholder='enter password..' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <label>Confirm Password</label>
                <input type='password' placeholder='confirm password..' value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})}/>
                <button type='submit'>register</button>
            </form>
        </div>
    )
}

export default Register