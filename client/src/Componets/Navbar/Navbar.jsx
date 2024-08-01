import React, { useState, useEffect } from 'react';
import logo from '../../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Sidebar from './Sidebar';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Feature/Userslice';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isDivVisibleForIntern, setDivVisibleForIntern] = useState(false);
  const [isDivVisibleForJob, setDivVisibleForJob] = useState(false);
  const [isDivVisibleForLogin, setDivVisibleForLogin] = useState(false);
  const [isStudent, setStudent] = useState(true);
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const showInternships = () => setDivVisibleForIntern(true);
  const hideInternships = () => setDivVisibleForIntern(false);

  const showJobs = () => setDivVisibleForJob(true);
  const hideJobs = () => setDivVisibleForJob(false);

  const showLogin = () => setDivVisibleForLogin(true);
  const closeLogin = () => setDivVisibleForLogin(false);


  const setFalseForStudent = () => setStudent(false);
  const setTrueForStudent = () => setStudent(true);

  // Add this function to your Navbar component
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

const checkAccessTime = () => {
  const now = new Date();
  const hours = now.getHours();
  if (getSystemInfo().deviceType === 'Mobile' && (hours < 10 || hours >= 13)) {
      alert('Access is allowed only between 10 AM and 1 PM on mobile devices.');
      window.location.href = '/'; // Redirect or block access
  }
};

// Call this function on component mount or when needed
useEffect(() => {
  checkAccessTime();
});



  

const handleEmailSubmit = async () => {
  try {
    const response = await axios.post('https://internarea-p1go.onrender.com/send-otp', { email });
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
    const response = await axios.post('https://internarea-p1go.onrender.com/verify-otp', { email, otp, language: selectedLanguage });
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
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
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
            // setSelectedLanguage(selectedLanguage);
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
    <div>
      <nav className='nav1'>
        <ul className='ul'>
          <div className="img">
            <Link to={"/"}><img src={logo} alt="Logo" /></Link>
          </div>
          <div className="elem">
            <Link to={"/Internship"}>
              <p id='int' onMouseEnter={showInternships}>{t('Internships')}
                <i onClick={hideInternships} id='ico' className="bi bi-caret-down-fill"></i>
              </p>
            </Link>
            <Link to={"/Jobs"}>
              <p onMouseOver={showJobs}>{t('Jobs')}
                <i className="bi bi-caret-down-fill" id='ico2' onClick={hideJobs}></i>
              </p>
            </Link>
          </div>
          <div className="search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder={t('Search')} />
          </div>
          {user ? (
            <>
              <div className='Profile'>
                <Link to={"/profile"}>
                  <img
                    src={user.photo}
                    alt={t('Profile')}
                    className='rounded-full w-12'
                    id='picpro'
                  />
                  <i className='bi bi-caret-up-fill' id='ico3'></i>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="auth">
                <button onClick={showLogin} className="custom-button1">
                  {t('Login')}
                </button>
                <button className="custom-button">
                  <Link to="/register">{t('Register')}</Link>
                </button>
              </div>
            </>
          )}
          <div className="language-selector">
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
          {!user && (
            <Link to={"/adminLogin"}>
              <button className="loginAdmin">
                <span className="text">{t('Admin')}</span>
                <span className="marquee">{t('Admin')}</span>
              </button>
            </Link>
          )}
          {user && (
              <button onClick={logoutFunction} className="group flex items-center justify-start w-11 h-11 bg-blue-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  {t('Logout')}
                </div>
              </button>
          )}
        </ul>
      </nav>
      {isDivVisibleForIntern && (
        <div id='Container1' onMouseLeave={hideInternships} className="flex bg-slate-100">
          <div className="left-section">
            <Link to={"/Internship"}>
              <p>{t('Internships')}</p>
            </Link>
            <Link to={"/Top Internships"}>
              <p>{t('Top Internships')}</p>
            </Link>
            <Link to={"/Certificate Internship"}>
              <p>{t('Certificate Internship')}</p>
            </Link>
            <Link to={"/Work From Home Internship"}>
              <p>{t('Work From Home Internship')}</p>
            </Link>
            <Link to={"/Internship In Delhi"}>
              <p>{t('Internship In Delhi')}</p>
            </Link>
            <Link to={"/Internship In Bangalore"}>
              <p>{t('Internship In Bangalore')}</p>
            </Link>
            <Link to={"/Internship In Mumbai"}>
              <p>{t('Internship In Mumbai')}</p>
            </Link>
          </div>
          <div className="line flex bg-slate-400"></div>
          <div className="right-section">
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
          </div>
        </div>
      )}
      {isDivVisibleForJob && (
        <div id='Container2' onMouseLeave={hideJobs} className="flex bg-slate-100">
          <div className="left-section">
            <Link to={"/Jobs"}>
              <p>{t('Jobs')}</p>
            </Link>
            <Link to={"/Top Jobs"}>
              <p>{t('Top Jobs')}</p>
            </Link>
            <Link to={"/Government Jobs"}>
              <p>{t('Government Jobs')}</p>
            </Link>
            <Link to={"/MNC Jobs"}>
              <p>{t('MNC Jobs')}</p>
            </Link>
            <Link to={"/Startup Jobs"}>
              <p>{t('Startup Jobs')}</p>
            </Link>
            <Link to={"/Part Time Jobs"}>
              <p>{t('Part Time Jobs')}</p>
            </Link>
            <Link to={"/Walk-In Jobs"}>
              <p>{t('Walk-In Jobs')}</p>
            </Link>
            <Link to={"/Work From Home Jobs"}>
              <p>{t('Work From Home Jobs')}</p>
            </Link>
          </div>
          <div className="line flex bg-slate-400"></div>
          <div className="right-section">
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
            <p>{t('Intern at India')}</p>
          </div>
        </div>
      )}
      {isDivVisibleForLogin && (
        <div className="login">
          <button id='cross' onClick={closeLogin}><i className="bi bi-x"></i></button>
          <h5 id='state' className='mb-4 justify-center text-center'>
            <span id='Sign-in' style={{ cursor: "pointer" }} className={`auth-tab ${isStudent ? 'active' : ""}`} onClick={setFalseForStudent}>
              {t('Student')}
            </span>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <span id='Sign-up' style={{ cursor: "pointer" }} className={`auth-tab ${!isStudent ? 'active' : ""}`} onClick={setTrueForStudent}>
              {t('Employee and T&P')}
            </span>
          </h5>
          <div className='login-options'>
            <button onClick={loginFunction} id='log1' className='flex justify-center'>
              <i className="bi bi-google"></i>
              <p id='font1' className='ml-2'>{t('Login With Google')}</p>
            </button>
            <h4 className='text-center mt-4'>{t('or')}</h4>
            <div id='Email'>
              <input type="email" placeholder={t('Email')} className='email' />
              <input type="password" placeholder={t('Password')} className='email' />
              <p id='forpass' className='text-center'>{t('Forget Password?')}</p>
            </div>
            <button id='log2' className='flex justify-center'>
              <p className='ml-2'>{t('Login')}</p>
            </button>
          </div>
          <Link to={"/register"} target='_top'>
          <p id='signup1' className='flex justify-center'>{t('new to internarea? Register')}</p>
          </Link>
        </div>
      )}
      
      
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


      <Sidebar setDivVisibleForLogin={setDivVisibleForLogin} />
    </div>
  );
}

export default Navbar;
