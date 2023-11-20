import "../App.css";
import DropDownMenu from "./component/DropDownMenu";
import React, { useState } from "react";
import { countries, platforms } from "./assets/LongLists";
import logo from "./assets/logo.svg";
import removeIcon from "./assets/close.svg";
import addIcon from "./assets/add.svg";
import catbamIcon from "./assets/catbam.svg";

export default function Home() {
  const [formData, setFormData] = useState({
    destination: "Israel",
    platform: "facebook",
    links: [],
    hashtags: [],
  });
  const [link, setLink] = useState(""); // New state for the dynamic list link
  const [hashtag, setHashtag] = useState(""); // New state for the dynamic list hashtag
  const [destinationDrop, setDestinationDrop] = useState(false);
  const serverLink = "http://172.20.16.163:8000";

  function getDomainFromLink(link) {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch (error) {
      console.error("Invalid URL:", link);
      return null;
    }
  }

  // Event handler to update form data on input change
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addLinkToList = () => {
    setFormData({
      ...formData,
      links: [...formData.links, link], // Create a new array with the updated links
    });
    setLink(""); // Clear the input field after adding the link}
  };

  const removeLinkFromList = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks.splice(index, 1);
    setFormData({
      ...formData,
      links: updatedLinks,
    });
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleHashtagChange = (e) => {
    setHashtag(e.target.value);
  };

  const addHashtagToList = () => {
    setFormData({
      ...formData,
      hashtags: [...formData.hashtags, hashtag], // Create a new array with the updated links
    });
    setHashtag(""); // Clear the input field after adding the link
  };

  const removeHashtagFromList = (index) => {
    const updatedLinks = [...formData.links];
    updatedLinks.splice(index, 1);
    setFormData({
      ...formData,
      hashtags: updatedLinks,
    });
  };

  const handleFileChange = (e) => {
    const fileName = e.target.files[0].name;
    // Handle the file change event as needed
    console.log("Selected file:", fileName);
  };

  // Event handler to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    window.location.href = `${serverLink}?name=${formData.links}`;
  };

  return (
    <div className="App">
      <div className="Main">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>
            <p>Select a Destination</p>
            <DropDownMenu
              name="destination"
              arr={countries}
              value={formData.destination}
              showFlag={true}
              action={handleInputChange}
            />
          </label>
          <label>
            <p>Select a Platform</p>
            <DropDownMenu
              name="platform"
              arr={platforms}
              value={formData.platform}
              showFlag={true}
              action={handleInputChange}
            />
          </label>
          <label>
            Add Profile
            <br />
            <div className="field">
              <div>
                <input className="input-empty" type="text" value={link} onChange={handleLinkChange} />
              </div>
              <button className="input-empty" type="button" onClick={addLinkToList}>
                <img src={addIcon} className="App-icon" alt="icon" />
              </button>
            </div>
            <div className={formData.links.length !== 0 ? "list" : ""}>
              {formData.links.map((link, index) => (
                <div key={index} className="list-item">
                  {link}
                  <button className="input-empty" type="button" onClick={() => removeLinkFromList(index)}>
                    <img src={removeIcon} className="App-icon" alt="icon" />
                  </button>
                </div>
              ))}
            </div>
          </label>
          <label>
            Add Hashtag
            <div className="field">
              <div>
                <input className="input-empty" type="text" value={hashtag} onChange={handleHashtagChange} />
              </div>
              <button
                className="input-empty"
                type="button"
                value={hashtag}
                name="hashtags"
                id="hashtags"
                onClick={addHashtagToList}
              >
                <img src={addIcon} className="App-icon" alt="icon" />
              </button>
            </div>
            <div className={formData.hashtags.length !== 0 ? "list" : ""}>
              {formData.hashtags.map((hashtag, index) => (
                <div key={index} className="list-item">
                  {hashtag}
                  <button className="input-empty" type="button" onClick={() => removeHashtagFromList(index)}>
                    <img src={removeIcon} className="App-icon" alt="icon" />
                  </button>
                </div>
              ))}
            </div>
          </label>

          <button className="sha-ger" type="submit" onClick={handleSubmit}>
            SHA-GER!
            <img src={catbamIcon} alt="icon" />
          </button>
        </form>
      </div>
    </div>
  );
}