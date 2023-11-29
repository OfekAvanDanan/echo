import "../App.css";
import DropDownMenu from "./component/DropDownMenu";
import ListInput from "./component/ListInput";
import React, { useState } from "react";
import { countries, platforms } from "./assets/LongLists";
import logo from "./assets/logo.svg";
import catbamIcon from "./assets/catbam.svg";

export default function Home() {
  const [formData, setFormData] = useState({
    destination: "Israel",
    platform: "facebook",
    links: [],
    hashtags: [],
  });
  const serverLink = "http://172.20.16.163:8000";

  // Event handler to update form data on input change
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // window.location.href = `${serverLink}?name=${formData.links}`;
  };

  return (
    <div className="App">
      <div className="Main">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>
            <p>Select a Destination</p>
            <DropDownMenu name="destination" arr={countries} value={formData.destination} action={handleInputChange} />
          </label>
          <label>
            <p>Select a Platform</p>
            <DropDownMenu name="platform" arr={platforms} value={formData.platform} action={handleInputChange} />
          </label>

          <label>
            <p>Add Hashtag</p>
            <ListInput
              list={formData.hashtags}
              data={formData}
              listName="hashtags"
              setData={setFormData}
              action={handleInputChange}
            />
          </label>
          <label>
            <p>Add Links</p>
            <ListInput
              list={formData.links}
              data={formData}
              listName="links"
              setData={setFormData}
              action={handleInputChange}
            />
          </label>
          <button className="sha-ger" type="submit" onClick={handleSubmit}>
            SHA-GER!
            <img src={catbamIcon} className="App-icon" alt="icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
