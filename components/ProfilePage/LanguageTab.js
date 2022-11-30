import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import privateApi from "../../services/privateApi";

const LanguageTab = ({ allLanguage, setUserLanguages }) => {
  const [languages, setLanguages] = useState([]);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [newLanguages, setNewLanguages] = useState({
    language_id: "",
    language: "",
    level: "",
    description: "",
    error_list: [],
  });

  const handleClose = () => setShow(false);

  const handleShow = (title) => {
    setNewLanguages({
      language_id: "",
      language: "",
      level: "",
      description: "",
      error_list: [],
    });
    setModalTitle(title);
    setShow(true);
  };

  const handleInput = (e) => {
    e.persist();
    setNewLanguages({
      ...newLanguages,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  useEffect(() => {
    setLanguages(allLanguage);
  }, [allLanguage, languages]);

  const fetchLanguages = async () => {
    const response = await privateApi.get(`candidate/languages`);

    if (response.status === 200) {
      setUserLanguages(response.data.data);
    } else {
      setNewLanguages({
        ...newLanguages,
        error_list: response.data.errors,
      });
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }
  };

  const formSubmit = async (e, id) => {
    e.preventDefault();

    const data = {
      //make education data object
      language: newLanguages.language,
      level: newLanguages.level,
      description: newLanguages.description,
    };

    let response = "";

    {
      id != ""
        ? (response = await privateApi.update(
            `candidate/languages/${id}`,
            data
          ))
        : (response = await privateApi.post(`candidate/languages`, data));
    }

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      fetchLanguages();
      setShow(false);
    } else {
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      setNewLanguages({
        ...newLanguages,
        error_list: response.data.errors,
      });
    }
  };

  const deleteHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await privateApi.delete(`candidate/languages/${id}`);

        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          fetchLanguages();
        } else {
          toast.warning(response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        }
      }
    });
  };

  const updateModalHandler = (i, title) => {
    setNewLanguages(languages[i]);
    setModalTitle(title);
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tab-language"
        role="tabpanel"
        aria-labelledby="tab-language"
      >
        <div className="row">
          <div className="col-9">
            <h3 className="mt-10 mb-10 color-brand-1">My languages</h3>
            <a className="font-md color-text-paragraph-2 mb-3" href="#">
              Update Your Languages
            </a>
          </div>
          <div className="col-3 text-end">
            <div
              className="btn btn-apply-now mt-2"
              onClick={() => handleShow("Add New Languages")}
            >
              <FaPlus /> Add New
            </div>
          </div>
        </div>

        <div className="row display-list mt-5">
          {languages?.map((language, i) => (
            <div key={i} className="col-xl-12 col-12">
              <div className="card-grid-2 hover-up">
                <span className="flash"></span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="right-info">
                        <a className="name-job" href="">
                          Language: {language.language}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                    <div className="pl-15 mb-15 mt-30">
                      <a
                        className="btn btn-red-small mr-5"
                        onClick={() => deleteHandler(language.language_id)}
                      >
                        <FaTrashAlt /> Delete
                      </a>
                      <a
                        className="btn btn-grey-small mr-5"
                        onClick={() => updateModalHandler(i, "update Language")}
                      >
                        <FaEdit /> Update
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-block-info">
                  {/* Show education info */}
                  <p>Language Level: {language.level}</p>
                  {language.description ? (
                    <p>Description: {language.description}</p>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={show} onHide={handleClose} keyboard="false">
          {/* Add a new education info */}
          <div className="modal-content apply-job-form">
            <button
              className="btn-close"
              type="button"
              onClick={handleClose}
            ></button>
            <div className="modal-body pl-30 pr-30 pt-50">
              <div className="text-center">
                <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">
                  {modalTitle}
                </h2>
                <p className="font-sm text-muted mb-30">
                  Please fill in your information and send it to the employer.{" "}
                </p>
              </div>
              <form
                className="col-12 box-skills"
                onSubmit={(e) => formSubmit(e, newLanguages.language_id)}
              >
                <div className="form-group">
                  <label className="font-sm  mb-10">
                    Language <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      newLanguages.error_list?.language && "is-invalid"
                    } form-control`}
                    type="text"
                    name="language"
                    onChange={handleInput}
                    value={newLanguages.language}
                  />
                  <p className="text-danger ">
                    {newLanguages.error_list?.language}
                  </p>
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">
                    Language Level <span className="required">*</span>
                  </label>
                  <select
                    className={`${
                      newLanguages.error_list?.level && "is-invalid"
                    } form-control`}
                    name="level"
                    onChange={handleInput}
                    value={newLanguages.level}
                  >
                    <option value="">Choose One</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advance">Advance</option>
                    <option value="Native"> Native </option>
                  </select>
                  <p className="text-danger ">
                    {newLanguages.error_list?.level}
                  </p>
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    onChange={handleInput}
                  >
                    {newLanguages.description}
                  </textarea>
                </div>

                <div className="border-bottom pt-10 pb-10"></div>

                <div className="box-button mt-15">
                  <button
                    type="submit"
                    className="btn btn-apply-big font-md font-bold"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default LanguageTab;
