import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import './register.css';
import { auth, provider } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();
  const [ setDivVisible] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      toast(t("Login Success"));
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(t("Login Failed"));
    }
  };


  const showLogin = () => setDivVisible(true);

  return (
    <div>
      <div className="form">
        <h1>{t('signUp')}</h1>
        <p className='para3'>{t('companiesHiring')}</p>
        <div className="regi">
          <div className="py-6">
            <div className="flex bg-white rounded-lg justify-center shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="w-full p-8 lg:w-1/2">
                <button onClick={handleSignin} className="flex items-center h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                  <div className="px-4 py-3 cursor-pointer">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                      <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                      <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                  </div>
                  <h1 className="cursor-pointer px-4 py-3 w-5/6 text-center text-xl text-gray-600 font-bold">{t('signInWithGoogle')}</h1>
                </button>
                <div className="mt-4 flex items-center justify-between">
                  <span className='border-b w-1/5 lg:w-1/4'></span>
                  <a href="/" className='text-xs text-center text-gray-500 uppercase'>{t('or')}</a>
                  <span className='border-b w-1/5 lg:w-1/4'></span>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className='border-b text-gray-700 text-sm font-bold mb-2'>{t('email')}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none' id='email' />
                </div> 
                <div className="mt-4">
                  <label htmlFor="password" className='border-b text-gray-700 text-sm font-bold mb-2'>{t('password')}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none' id='password' />
                </div> 
                <div className="mt-4 flex justify-between">
                  <div>
                    <label htmlFor="Fname" className='border-b text-gray-700 text-sm font-bold mb-2'>{t('firstName')}</label>
                    <input type="text" className='text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none' id='Fname' value={fname} onChange={(e) => setFname(e.target.value)} />
                  </div>
                  <div className='ml-5'>
                    <label htmlFor="Lname" className='border-b text-gray-700 text-sm font-bold mb-2'>{t('lastName')}</label>
                    <input type="text" className='text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none' id='Lname' value={lname} onChange={(e) => setLname(e.target.value)} />
                  </div>
                </div>
                <small>{t('termsAndConditions')}</small>
                <button className='bg-blue-500 h-9 text-white font-bold py-2 mt-4 px-4 w-full rounded-lg hover:bg-blue-600'>{t('signUpButton')}</button>
                <p className='text-sm mt-4'>{t('alreadyHaveAccount')} <button href="#" className='text-blue-400'>{t('signIn')}</button></p>
                <p className='text-sm mt-4 cursor-pointer text-blue-400' onClick={showLogin}>{t('dontHaveAccount')} <span className='text-blue-500'>{t('registerHere')}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
