import React, { useEffect, useState } from 'react';
import logo from "../../Assets/logo.png";
import './sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useTranslation } from 'react-i18next';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

function Sidebar({ setDivVisibleForLogin }) {
  const provider = new GoogleAuthProvider();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');



  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/send-otp', { email });
      if (response.data.success) {
        setMessage('OTP has been sent to your email');
        setStep(2);
        setTimeout(() => {
          setMessage('');
        }, 5000); // Clear message after 5 seconds
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data : error.message);
    }
  };
  
    
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', { email, otp, language: selectedLanguage });
      if (response.data.success) {
        // Handle language-specific settings
        switch (selectedLanguage) {
          case 'es':
            document.body.style.backgroundColor = 'white'; // Set color for Spanish
            alert('Su correo electrónico ha sido verificado');
            break;
          case 'hi':
            document.body.style.backgroundColor = 'blue'; // Set color for Hindi
            alert('आपका ईमेल सत्यापित हो गया है');
            break;
          case 'pt':
            document.body.style.backgroundColor = 'white'; // Set color for Portuguese
            alert('Seu e-mail foi verificado');
            break;
          case 'zh':
            document.body.style.backgroundColor = 'green'; // Set color for Chinese
            alert('您的电子邮件已验证');
            break;
          case 'fr':
            document.body.style.backgroundColor = 'yellow'; // Set color for French
            alert('Votre e-mail est vérifié');
            break;
          case 'en':
            document.body.style.backgroundColor = 'white'; // Set color for English
            alert('Your email has been verified');
            break;
          default:
            document.body.style.backgroundColor = 'white'; // Default color
            alert('Your email has been verified');
            break;
        }
        setShowPopup(false);
        setEmail('');
        setOtp('');
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
    }
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

          // Handle authentication based on browser


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.open-btn')) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  
    switch (language) {
      case 'hi':
        document.body.style.backgroundColor = 'blue';
        break;
      case 'zh':
        document.body.style.backgroundColor = 'green';
        break;
      case 'fr':
        document.body.style.backgroundColor = 'yellow';
        setShowPopup(true);
        setStep(1);
        return;
      default:
        document.body.style.backgroundColor = 'white';
        break;
    }
  
    setShowPopup(true);
    setStep(1);
  };

  const logoutFunction = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const getSystemInfo = () => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    let os = 'Unknown';
    let deviceType = /Mobi|Android/i.test(userAgent) ? 'Mobile' : 'Desktop';
  
    // Detect browser
    if (userAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
    } else if (userAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browser = 'Safari';
    } else if (userAgent.indexOf('Edge') > -1) {
        browser = 'Edge';
    }
  
    // Detect OS
    if (userAgent.indexOf('Win') > -1) {
        os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
        os = 'Mac OS';
    } else if (userAgent.indexOf('X11') > -1) {
        os = 'UNIX';
    } else if (userAgent.indexOf('Linux') > -1) {
        os = 'Linux';
    }
  
    return { browser, os, deviceType };
  };

  const loginFunction = async () => {
    try {
      signInWithPopup(auth, provider)
        .then(async (res) => {
          console.log('User object:', res.user);
  
          // Get system information
          const systemInfo = getSystemInfo();
          const { browser, os, deviceType } = systemInfo;
  
          // Obtain the IP address from a server-side function if needed
  
          // Send system info to backend
          await axios.post('https://internarea-p1go.onrender.com/api/store-login-info', {
            email: res.user.email, // Include user email or other identifier
            browser,
            os,
            deviceType,
            ipAddress: '', // Obtain IP address from backend or server
          });
  
          // Handle authentication based on browser
          if (browser === 'Chrome') {
            setShowPopup(true);
            setStep(1);
          } else if (browser === 'Edge') {
            setSelectedLanguage(selectedLanguage);
            setShowPopup(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error('Error during login:', error);
    }  
    setDivVisibleForLogin(false);
};



  return (
    <>
      <div className="App2 -mt-2 overflow-hidden">
        <Link to="/">
          <img src={logo} alt="Logo" id="nav2-img" />
        </Link>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <span className="cursor-pointer close-btn" onClick={closeSidebar}>
            &times;
          </span>

          {user && (
            <div className="user-info">
              <img
                src={user?.photo || 'default-profile-pic.png'}
                alt="User Profile"
                className="user-profile-pic"
              />
              <div className="user-details">
                <p className="user-email">{user?.email || 'N/A'}</p>
              </div>
              <button
                onClick={logoutFunction}
                className="group flex items-center justify-start w-11 h-11 bg-blue-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
              >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  {t('Logout')}
                </div>
              </button>
            </div>
          )}

          <div className="sidebar-content">
            {user ? (
              <>
                <div className="Profile">
                  <Link to="/profile">
                    <img
                      src={user?.photo || 'default-profile-pic.png'}
                      alt="Profile"
                      className="rounded-full w-12 user-profile-pic"
                      id="picpro"
                    />
                    <i className="bi bi-caret-up-fill" id="ico3"></i>
                  </Link>
                </div>
                <div className="addmore">
                  <Link to="/userapplication">
                    <p>{t('My Applications')}</p>
                  </Link>
                  <Link>
                    <p>{t('View Resume')}</p>
                  </Link>
                  <Link>
                    <p>{t('More')}</p>
                  </Link>
                  <br />
                </div>
              </>
            ) : (
              <>
                <div className="logg">
                  <button onClick={loginFunction} className="custom1">
                    {t('Login')}
                  </button>
                  <Link to="/register">
                  <button className="custom">
                    {t('Register')}
                  </button>
                  </Link>
                </div>
                <div className="addmore">
                  <p>{t('Register- As a Student')}</p>
                  <p>{t('Register- As an Employer')}</p>
                </div>
              </>
            )}
            <div className="addmore">
              <Link to="/internship" className="am">
                <p>{t('Internships')}</p>
              </Link>
              <Link className="am" to="/Jobs">
                <p>{t('Jobs')}</p>
              </Link>
              <Link className="am" to="/">
                <p>{t('Contact Us')}</p>
              </Link>
              <div className="language-">
            <i className="bi bi-translate"></i>
            <select className='custom-select' onChange={(e) => handleLanguageChange(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="hi">हिन्दी</option>
              <option value="pt">Português</option>
              <option value="zh">中文</option>
              <option value="fr">Français</option>
            </select>
          </div>
            </div>
            {!user && (
              <>
                <div className="reg">
                  <Link to="/register">
                    <button className="btn4">{t('Register')}</button>
                  </Link>
                </div>
                <div className="admin">
                  <Link to="/adminLog">
                    <button id="admin">{t('Admin Login')}</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="main">
          <span style={{ fontSize: '22px' }} className="open-btn" onClick={openSidebar}>
            &#9776;
          </span>
        </div>
        <div className="search2">
          <i className="bi bi-search"></i>
          <input type="search" placeholder={t('Search')} />
        </div>
        <p className="text-red-300">{t('Hire Talent')}</p>
      </div>
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup">
      <div className="popup-content">
        {message && <p className="message">{message}</p>}
        {step === 1 && (
          <>
            <label>{t('Enter Email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailSubmit}>{t('Submit')}</button>
          </>
        )}
        {step === 2 && (
          <>
            <label>{t('Enter OTP')}</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtpSubmit}>{t('Submit')}</button>
          </>
        )}
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default Sidebar;
