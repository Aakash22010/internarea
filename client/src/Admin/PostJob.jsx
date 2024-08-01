import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostJob() {
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [aboutCompany, setAboutCompany] = useState('');
    const [aboutInternship, setAboutInternship] = useState('');
    const [whoCanApply, setWhoCanApply] = useState('');
    const [perks, setPerks] = useState('');
    const [numberOfOpening, setNumberOfOpening] = useState('');
    const [CTC, setCTC] = useState('');
    const [startDate, setStartDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [loading, setLoading] = useState(false);  // Add a loading state
    const navigate = useNavigate();

    const sendData = (e) => {
        e.preventDefault();
        if (
            !title ||
            !companyName ||
            !location ||
            !category ||
            !aboutCompany ||
            !aboutInternship ||
            !whoCanApply ||
            !perks ||
            !numberOfOpening ||
            !CTC ||
            !startDate ||
            !additionalInfo
        ) {
            alert("Please fill in all the required fields.");
            return;
        }
        
        setLoading(true);  // Set loading to true before starting request
        
        const bodyJson = {
            title,
            company: companyName,
            location,
            category,
            aboutCompany,
            aboutInternship,
            whoCanApply,
            perks,
            numberOfOpening,
            CTC,
            startDate,
            additionalInfo,
        };
        
        axios.post("https://internarea-p1go.onrender.com/api/job", bodyJson)
            .then((res) => {
                alert("Job posted successfully.");
                navigate("/adminpanel");  // Ensure the path is correct
            })
            .catch((err) => {
                console.error(err);
                alert("There was an error posting the job.");
            })
            .finally(() => {
                setLoading(false);  // Set loading to false after request is complete
            });
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Post A Job</h2>
                </div>
                <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" onSubmit={sendData}>
                    <div>
                        <label htmlFor="title" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Title*</label>
                        <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div>
                        <label htmlFor="company-name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Company Name*</label>
                        <input id="company-name" name="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="location" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Location</label>
                        <input id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="category" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Category*</label>
                        <input id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="aboutCompany" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">About Company*</label>
                        <input id="aboutCompany" name="aboutCompany" value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="aboutInternship" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">About the job*</label>
                        <textarea id="aboutInternship" name="aboutInternship" value={aboutInternship} onChange={(e) => setAboutInternship(e.target.value)} className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="whoCanApply" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Who Can Apply*</label>
                        <textarea id="whoCanApply" name="whoCanApply" value={whoCanApply} onChange={(e) => setWhoCanApply(e.target.value)} className="h-34 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="perks" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Perks*</label>
                        <input id="perks" name="perks" value={perks} onChange={(e) => setPerks(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="numberOfOpening" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Number Of Openings*</label>
                        <input id="numberOfOpening" name="numberOfOpening" value={numberOfOpening} onChange={(e) => setNumberOfOpening(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="CTC" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">CTC*</label>
                        <input id="CTC" name="CTC" value={CTC} onChange={(e) => setCTC(e.target.value)} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="startDate" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Start Date*</label>
                        <input id="startDate" type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} name="startDate" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></input>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="additionalInfo" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Additional Information*</label>
                        <textarea id="additionalInfo" name="additionalInfo" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} className="h-12 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>
                    <button type="submit" className="hover:bg-blue-600 py-2 px-4 rounded bg-blue-500 text-white">
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostJob;
