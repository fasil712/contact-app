import React from "react";

const Header = ({ toggleModal, nbOfContacts, query, handleInputChange }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="auth__icon">
          <h3>Contact List ({nbOfContacts})</h3>
          <div className="search-bar">
            <span className="search-icon-left">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={query}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="auth__icon">
          <button onClick={() => toggleModal(true)} className="btn">
            <i className="bi bi-plus-square"></i> Add New Contact
          </button>
          <div className="auth__image">
            <img
              src="http://localhost:8080/api/v1/contacts/image/18501351-a61d-48f2-a51d-5854e143f409.jpg"
              alt="Account"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
