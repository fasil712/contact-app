import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import {
  getContacts,
  saveContact,
  searchContacts,
  udpatePhoto,
} from "./api/ContactService";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import { toastError } from "./api/ToastService";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { debounce } from "lodash";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const location = useLocation();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
  });

  const getAllContacts = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const fetchSearchResults = useCallback(
    debounce(async (searchQuery) => {
      try {
        const response = await searchContacts(searchQuery);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    }, 500),
    []
  );

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const { data: photoUrl } = await udpatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "",
      });
      getAllContacts();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults(null);
      getAllContacts();
    }
  }, [query, fetchSearchResults]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      {location.pathname !== "/auth/login" &&
        location.pathname !== "/auth/register" && (
          <Header
            nbOfContacts={data.totalElements}
            query={query}
            handleInputChange={handleInputChange}
          />
        )}
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/contacts"} />} />
            {location.pathname !== "/auth/login" &&
              location.pathname !== "/auth/register" && (
                <>
                  <Route
                    path="/contacts"
                    element={
                      <ProtectedRoute
                        element={
                          <ContactList
                            data={data}
                            currentPage={currentPage}
                            getAllContacts={getAllContacts}
                          />
                        }
                      />
                    }
                  />
                  <Route
                    path="/contacts/:id"
                    element={<ProtectedRoute element={<ContactDetail />} />}
                  />
                </>
              )}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input
                  type="text"
                  value={values.name}
                  onChange={onChange}
                  name="name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  value={values.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input
                  type="text"
                  value={values.title}
                  onChange={onChange}
                  name="title"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="text"
                  value={values.phone}
                  onChange={onChange}
                  name="phone"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input
                  type="text"
                  value={values.address}
                  onChange={onChange}
                  name="address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input
                  type="text"
                  value={values.status}
                  onChange={onChange}
                  name="status"
                  required
                />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                  ref={fileRef}
                  name="photo"
                  required
                />
              </div>
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
}

export default App;
