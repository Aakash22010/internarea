import React, { useEffect, useState } from 'react';
import "./inter.css";
import compLogo from "../../Assets/netflix.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Intern() {
  const { t } = useTranslation();
  const [serachCategory, setSearchCategory] = useState("");
  const [searchLoaction, setSearchLocation] = useState("");
  const [filterInternship, setFilterInternship] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const [InternData, setInternData] = useState([]);

  const showDiv = () => {
    setDivVisible(true);
  };

  const hidediv = () => {
    setDivVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://internarea-p1go.onrender.com/api/internship`);
        setInternData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const categeoryValue = e.target.value;
    setSearchCategory(categeoryValue);
    setFilterInternship([categeoryValue, searchLoaction]);
  };

  const handleCategoryLocationChange = (e) => {
    const loactionValue = e.target.value;
    setSearchLocation(loactionValue);
    setFilterInternship([serachCategory, loactionValue]);
  };

  const filterInterships = (category, location) => {
    if (InternData && InternData.length > 0) {
      const filterData = InternData.filter(
        (internship) =>
          internship.category.toLowerCase().includes(category.toLowerCase()) &&
          internship.location.toLowerCase().includes(location.toLowerCase())
      );
      setFilterInternship(filterData);
    }
  };

  useEffect(() => {
    filterInterships(serachCategory, searchLoaction);
  });

  return (
    <>
      <div className='flex internship-filter'>
        <div className="first-int mb-14">
          <div className="filter-section w-1/6">
            <p id='filter-ico' className='text-center'>
              <i onClick={showDiv} className="bi bi-funnel text-blue-400"></i> {t('filter')}
            </p>
            <div className='fill flex flex-col ml-2'>
              <label htmlFor="pro">{t('profile')}</label>
              <input
                type="text"
                id='pro'
                value={serachCategory}
                onChange={handleCategoryChange}
                className='profile border-2 mr-3 w-full'
                placeholder={t('profile')}
              />
              <label htmlFor="loc">{t('location')}</label>
              <input
                type="text"
                id='loc'
                value={searchLoaction}
                onChange={handleCategoryLocationChange}
                className='location border-2 -ml-8 w-full'
                placeholder={t('location')}
              />
            </div>
            <div className="preferences mt-8 flex flex-col">
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="wfh" id="whf" className='mr-2 ml-3' />
                <label htmlFor="wfh">{t('workFromHome')}</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="pt" id="pt" className='mr-2 ml-3' />
                <label htmlFor="pt">{t('partTime')}</label>
              </div>
              <p>{t('stipend')}</p>
              <input type="range" name="" id="" />
              <p className='mt-2 ml-3 mr-3'>0 2K  &nbsp; 4k  &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
            </div>

            <p className='mt-5 text-blue-400'>{t('viewMoreFilters')} <i className="bi bi-chevron-down"></i></p>
            <span className='justify-end flex text-blue-400 mr-3'>{t('clearAll')}</span>
          </div>
          <div className="search-2">
            <div className="search-container">
              <input type="text" placeholder={t('experience')} />
              <div className="search-icon">
                <i className="bi bi-search"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="all-internships">
          <div className="show show2 flex justify-center">
            <p className='filterico text-center' onClick={showDiv}>{t('filter')} <i className="bi bi-funnel text-blue-400"></i></p>
          </div>
          <p className='head font-bold text-lg text-center'>{filterInternship.length} {t('totalInternships')}</p>

          {filterInternship.map((data, index) => (
            <div className='shadow-lg rounded-lg bg-white m-7' id='display' key={data._id}>
              <div className="m-4">
                <p className='mb-4 mt-3' id='boxer'><i className='bi bi-arrow-up-right text-blue-500'></i> {t('activeHiring')}</p>
                <div className="flex justify-end">
                  <img src={compLogo} className='w-14' alt="" />
                </div>
                <div className="all-ele">
                  <div className='text-lg text-black m-2 mt-7 font-bold'>{data.title}</div>
                  <div className="info">
                    <p className='text-sm text-slate-300 font-bold'>{'aakashOrg Ltd.'}</p>
                    <p className='mt-2'>{data.location}</p>
                  </div>
                  <div className="flex text-sm justify-between">
                    <p className='mt-3'><i className="bi bi-play-circle-fill"></i> {t('startDate')} <br /> {data.StartDate}</p>
                    <p className='mt-3'><i className="bi bi-calendar-check-fill"></i> {t('duration')} <br /> {data.Duration}</p>
                    <p className='mt-3'><i className="bi bi-cash"></i> {t('stipendLabel')} <br /> {data.stipend}</p>
                  </div>
                </div>
                <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('internship')}</span>
                <br />
                <span><i className="bi bi-stopwatch text-green-300"></i>23/11/2065</span>
                <div className="flex justify-end" id='hr'>
                  <Link to={`/detailInternship?q=${data._id}`} className='mt-10'><button id='viewButtons' className='bg-transparent text-blue-500'>{t('viewDetails')}</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isDivVisible && (
          <>
            <div className="first2-int mb-14">
              <div className="filter-section w-1/6">
                <button id='close-btn' onClick={hidediv}><i className="text-3xl bi bi-x"></i></button>
                <p className='text-center'><i className="bi bi-funnel text-blue-400"></i> {t('filter')}</p>
                <div className='fill flex flex-col ml-2'>
                  <label htmlFor="pro">{t('profile')}</label>
                  <input
                    type="text"
                    id='pro'
                    value={serachCategory}
                    onChange={handleCategoryChange}
                    className='profile border-2 mr-3 w-full'
                    placeholder={t('profile')}
                  />
                  <label htmlFor="loc">{t('location')}</label>
                  <input
                    type="text"
                    id='loc'
                    value={searchLoaction}
                    onChange={handleCategoryLocationChange}
                    className='location border-2 mt-10 -ml-8 w-full'
                    placeholder={t('location')}
                  />
                </div>
                <div className="preferences mt-8 flex flex-col">
                  <div className="flex mt-3 ml-3 mr-3">
                    <input type="checkbox" name="wfh" id="whf" className='mr-2 ml-3' />
                    <label htmlFor="wfh">{t('workFromHome')}</label>
                  </div>
                  <div className="flex mt-3 ml-3 mr-3">
                    <input type="checkbox" name="pt" id="pt" className='mr-2 ml-3' />
                    <label htmlFor="pt">{t('partTime')}</label>
                  </div>
                  <p>{t('stipend')}</p>
                  <input type="range" name="" id="" />
                  <p className='mt-2 ml-3 mr-3'>0 2K  &nbsp; 4k  &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
                </div>
                <p className='mt-5 text-blue-400'>{t('viewMoreFilters')} <i className="bi bi-chevron-down"></i></p>
                <span className='justify-end flex text-blue-400 mr-3'>{t('clearAll')}</span>
              </div>
              <div className="search-2">
                <div className="search-container">
                  <label htmlFor="ex">{t('experience')}</label>
                  <input type="text" id='ex' placeholder={t('experience')} />
                  <div className="search-icon">
                    <i className="bi bi-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Intern;
