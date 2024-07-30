import React, { useState, useEffect } from 'react';
import IOL from "../assets/logo.webp";
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../page/Spinner.jsx';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-tender'));
    if (user) {
      setUser(user);
      navigate('/draft', { replace: true });
    }
  }, [navigate, setUser]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });

       if (!res.ok) {
      // Log the response as text to see what is actually being returned
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

      const data = await res.json();
      console.log("Response data:", data); // Debugging line

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      localStorage.setItem("user-tender", JSON.stringify(data));
      setUser(data);

      console.log("Navigating to /draft"); // Debugging line
      navigate("/draft", { replace: true });
    } catch (error) {
      alert("Error: " + error);
      console.log("Error:", error); // Debugging line
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className='w-full h-[100vh]'>
      <div className='flex w-full h-full flex-col gap-5 items-center justify-center'>
        <h1 className='font-bold font-teko text-5xl'>Login</h1>
        <img src={IOL} alt="Indian Oil Logo" className='w-[25rem]' />
        <h1 className='font-bold font-roboto text-2xl text-zinc-700 font-teko'>ENTER YOUR DETAILS HERE</h1>
        <form className='flex flex-col gap-5 items-center justify-center' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5 w-[25vw] '>
            <input className='bg-zinc-100 rounded-md p-3 outline-none font-teko text-xl ' placeholder='Enter your email' type="email" name='email' value={inputs.email} onChange={handleChange} />
            <input className='bg-zinc-100 rounded-md p-3 outline-none font-teko text-xl ' placeholder='Enter your password ' type="password" name='password' value={inputs.password} onChange={handleChange} />
          </div>
          <p className='font-teko text-xl'>didn't have an account? <i className='cursor-pointer' onClick={() => { navigate("/signup") }}>signUp</i></p>
          <button className='border-3 border-zinc-500 px-5 py-1 rounded-md hover:bg-orange-500 hover:text-white hover:border-none font-teko text-2xl' type='submit'>{loading ? <ClipLoader size={20} color={"#000"} /> : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
