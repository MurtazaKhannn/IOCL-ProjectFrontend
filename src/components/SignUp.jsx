import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IOL from '../assets/logo.webp';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import authScreenAtom from '../atoms/authAtom';

const SignUp = () => {
  const apiUrl = process.env.API_URL;
  const navigate = useNavigate();
  const setAuthScreenState = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      localStorage.setItem("user-tender", JSON.stringify(data));
      setUser(data);

      navigate('/draft'); // Navigate to draft page after successful signup
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='font-bold text-4xl pt-5 text-zinc-800 font-teko text-5xl'>SignUp</h1>
        <img src={IOL} className='w-[25rem]' alt="" />
        <h1 className='text-2xl font-semibold font-roboto text-zinc-800 font-teko text-4xl'>Enter Your Details</h1>
        <form className='flex flex-col justify-center items-center gap-5' action="">
          <input className='bg-zinc-100 px-5 py-2 rounded-md w-full outline-none font-teko text-xl' name='name' value={inputs.name} placeholder='Enter your name' type="text" onChange={handleChange} />
          <input className='bg-zinc-100 px-5 py-2 rounded-md w-full outline-none font-teko text-xl' name='email' value={inputs.email} placeholder='Enter your email' type="email" onChange={handleChange} />
          <div className='flex flex justify-center items-center gap-5'>
            <input className='bg-zinc-100 px-5 py-2 rounded-md outline-none font-teko text-xl' name='password' value={inputs.password} placeholder='Enter your password' type="password" onChange={handleChange} />
            <input className='bg-zinc-100 px-5 py-2 rounded-md outline-none font-teko text-xl' name='confirmPassword' value={inputs.confirmPassword} placeholder='Confirm Password' type="password" onChange={handleChange} />
          </div>
          <p className='font-teko text-xl'>Already have an account? <i className='text-xl cursor-pointer' onClick={() => {navigate("/login") }}>Login</i></p>
          <button className=' px-3 py-1 rounded-md font-semibold hover:border-none hover:bg-orange-500 hover:text-white font-teko text-xl' type='button' onClick={handleSignup}>SignUp</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
