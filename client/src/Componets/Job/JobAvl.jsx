import React, { useEffect, useState } from 'react';
import "./job.css";
import compLogo from "../../Assets/netflix.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function JobAvl() {
  const [serachCategory, setSearchCategory] = useState("");
  const [searchLoaction, setSearchLocation] = useState("");
  const [jobData, setJobData] = useState([]);
  const [filterJob, setFilterJob] = useState([]);
  const [isDivVisible, setDivVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://internarea-p1go.onrender.com/api/job`);
        setJobData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const showDiv = () => {
    setDivVisible(true);
  };

  const hideDiv = () => {
    setDivVisible(false);
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSearchCategory(categoryValue);
    setFilterJob([categoryValue, searchLoaction]);
  };

  const handleLocationChange = (e) => {
    const locationValue = e.target.value;
    setSearchLocation(locationValue);
    setFilterJob([serachCategory, locationValue]);
  };

  const filterJobs = (category, location) => {
    const filterData = jobData.filter(
      (job) =>
        job.category.toLowerCase().includes(category.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );
    setFilterJob(filterData);
  };

  useEffect(() => {
    filterJobs(serachCategory, searchLoaction);
  }, [searchLoaction, serachCategory]);

  return (
    <>
      <div className='flex internship-filter'>
        <div className="first-int mb-14">
          <div className="filter-section w-1/6">
            <p className='text-center'>
              <i className="bi bi-funnel text-blue-400"></i> {t('Filter')}
            </p>
            <div className='fill flex flex-col ml-2'>
              <label htmlFor="pro">{t('Profile')}</label>
              <input 
                type="text" 
                id='pro'  
                value={serachCategory} 
                onChange={handleCategoryChange} 
                className='profile border-2 mr-3 w-full' 
                placeholder={t('Profile')} 
              />
              <label htmlFor="loc">{t('Location')}</label>
              <input 
                type="text" 
                id='loc'  
                value={searchLoaction}  
                onChange={handleLocationChange} 
                className='location border-2 -ml-8 w-full' 
                placeholder={t('Enter Location')} 
              />
            </div>
            <div className="preferences mt-8 flex flex-col">
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="wfh" id="whf" className='mr-2 ml-3' />
                <label htmlFor="wfh">{t('Work From Home')}</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3">
                <input type="checkbox" name="pt" id="whf" className='mr-2 ml-3' />
                <label htmlFor="pt">{t('Part-time')}</label>
              </div>
              <p>{t('Annual salary (in lakhs)')}</p>
              <input type="range" name="" id="" />
              <p className='mt-2 ml-3 mr-3'>0 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
            </div>

            <p className='mt-5 text-blue-400'>
              {t('View more filters')} <i className="bi bi-chevron-down"></i>
            </p>
            <span className='justify-end flex text-blue-400 mr-3'>{t('Clear all')}</span>
          </div>
          <div className="search-2">
            <div className="search-container">
              <label htmlFor="ex ">{t('Experience')}</label>
              <input type="text" id='ex' placeholder={`eg. 0-1 year`} />
              <div className="search-icon">
                <i className="bi bi-search"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="all-internships">
          <div className="show show2 flex justify-center">
            <p id='filter-ico' className='filterico text-center'>
              {t('Filter')} <i className="bi bi-funnel text-blue-400" onClick={showDiv}></i>
            </p>
          </div>
          <p className='head font-bold text-lg text-center'>
            {filterJob.length} {t('total Jobs')}
          </p>

          {filterJob.map((data, index) => (
            <div key={index} className='shadow-lg rounded-lg bg-white m-7' id='display'>
              <div className="m-4">
                <p className='mb-4 mt-3' id='boxer'>
                  <i className='bi bi-arrow-up-right text-blue-500'></i> {t('Actively Hiring')}
                </p>
                <div className="flex justify-end">
                  <img src={compLogo} className='w-14' alt="" />
                </div>
                <div className="all-ele">
                  <div className='text-lg text-black m-2 mt-7 font-bold'>{data.title}</div>
                  <div className="info">
                    <p className='text-sm text-slate-300 font-bold'>{data.company}</p>
                    <p className='mt-2'>{data.location}</p>
                  </div>
                  <div className="flex text-sm justify-between">
                    <p className='mt-3'>
                      <i className="bi bi-play-circle-fill"></i> {t('Start Date')} <br /> {data.StartDate}
                    </p>
                    <p className='mt-3'>
                      <i className="bi bi-calendar-check-fill"></i> {t('Experience')} <br />
                      {data.Experience}
                    </p>
                    <p className='mt-3'>
                      <i className="bi bi-cash"></i> {t('Salary')} <br /> {data.CTC}
                    </p>
                  </div>
                </div>
                <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>{t('Job')}</span>
                <br />
                <span><i className="bi bi-stopwatch text-green-300"></i>23/11/2065</span>
                <div className="flex justify-end" id='hr'>
                  <Link className='mt-10' to={`/detailjob?q=${data._id}`}>
                    <button id='viewButtons' className='bg-transparent text-blue-500'>
                      {t('View In Details')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDivVisible && (
        <>
          <div className="first2-int mb-14">
            <div className="filter-section w-1/6">
              <button id='close-btn' onClick={hideDiv}>
                <i className="text-3xl bi bi-x"></i>
              </button>
              <p className='text-center'>
                <i className="bi bi-funnel text-blue-400"></i> {t('Filter')}
              </p>
              <div className='fill flex flex-col ml-2'>
                <label htmlFor="pro">{t('Profile')}</label>
                <input 
                  type="text" 
                  id='pro'  
                  value={serachCategory} 
                  onChange={handleCategoryChange} 
                  className='profile border-2 mr-3 w-full' 
                  placeholder={t('Profile')} 
                />
                <label htmlFor="loc">{t('Location')}</label>
                <input 
                  type="text" 
                  id='loc'  
                  value={searchLoaction}  
                  onChange={handleLocationChange} 
                  className='location border-2 mt-10 -ml-8 w-full' 
                  placeholder={t('Enter Location')} 
                />
              </div>
              <div className="preferences mt-8 flex flex-col">
                <div className="flex mt-3 ml-3 mr-3">
                  <input type="checkbox" name="wfh" id="whf" className='mr-2 ml-3' />
                  <label htmlFor="wfh">{t('Work From Home')}</label>
                </div>
                <div className="flex mt-3 ml-3 mr-3">
                  <input type="checkbox" name="pt" id="whf" className='mr-2 ml-3' />
                  <label htmlFor="pt">{t('Part-time')}</label>
                </div>
                <p>{t('Annual salary (in lakhs)')}</p>
                <input type="range" name="" id="" />
                <p className='mt-2 ml-3 mr-3'>0 2K &nbsp; 4k &nbsp; 6K &nbsp; 8k &nbsp; 10K</p>
              </div>

              <p className='mt-5 text-blue-400'>
                {t('View more filters')} <i className="bi bi-chevron-down"></i>
              </p>
              <span className='justify-end flex text-blue-400 mr-3'>{t('Clear all')}</span>
            </div>
            <div className="search-2">
              <div className="search-container">
                <label htmlFor="ex ">{t('Experience')}</label>
                <input type="text" id='ex' placeholder={`eg. 0-1 year`} />
                <div className="search-icon">
                  <i className="bi bi-search"></i>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default JobAvl;
