import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HrdetailsForm() {
  const baseurl = import.meta.env.VITE_REACT_APP_API_URL;
  const userid = '6469efc566559014433a7112';
  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyWebsite: '',
    companyEmail: '',
    title: '',
    country: '',
    userid: userid,
  });

  useEffect(() => {
    // Fetch country list from API

    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const postHrDetails = async (formData) => {
    try {
      const res = await axios.post(
        `${baseurl}/hr/hrDetails/${userid}`,
        formData
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // reset the form
    setFormData({
      firstName: '',
      lastName: '',
      companyName: '',
      companyWebsite: '',
      companyEmail: '',
      title: '',
      country: '',
    });

    postHrDetails(formData);
    console.log(formData);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="text-gray-700 font-bold mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="text-gray-700 font-bold mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="companyName" className="text-gray-700 font-bold mb-2">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Company Name"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.companyName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="companyWebsite"
            className="text-gray-700 font-bold mb-2"
          >
            Company Website
          </label>
          <input
            id="companyWebsite"
            type="text"
            placeholder="Company Website"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.companyWebsite}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="companyEmail"
            className="text-gray-700 font-bold mb-2"
          >
            Company Email
          </label>
          <input
            id="companyEmail"
            type="email"
            placeholder="Company Email"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.companyEmail}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-gray-700 font-bold mb-2">
            Title/ Designation
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title/ Designation"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.title}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="text-gray-700 font-bold mb-2">
            Country
          </label>
          <select
            id="country"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-700"
            value={formData.country}
            onChange={handleChange}
            required={true}
          >
            <option value="">Select Country</option>
            {countryList.map((country) => (
              <option key={country.name.common} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-3 rounded-lg font-medium w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default HrdetailsForm;
