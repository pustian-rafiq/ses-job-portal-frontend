import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import privateApi from "../../services/privateApi";

function EducationTab({ allEducations, setUserInfo }) {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [educations, setEducations] = useState([]);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [newEducations, setNewEducations] = useState({
    education_id: "",
    degree: "",
    institute_name: "",
    start_year: "",
    passing_year: "",
    result: "",
    description: "",
    error_list: [],
  });

  const handleClose = () => setShow(false);

  const handleShow = (title) => {
    setNewEducations({
      education_id: "",
      degree: "",
      institute_name: "",
      start_year: "",
      passing_year: "",
      result: "",
      description: "",
      error_list: [],
    });
    setModalTitle(title);
    setShow(true);
  };

  const handleInput = (e) => {
    e.persist();
    setNewEducations({
      ...newEducations,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  useEffect(() => {
    setEducations(allEducations);
    console.log("education_list", allEducations);
  }, [allEducations]);

  const formSubmit = async (e, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      //make education data object
      degree: newEducations.degree,
      institute_name: newEducations.institute_name,
      start_year: newEducations.start_year,
      passing_year: newEducations.passing_year,
      result: newEducations.result,
      description: newEducations.description,
    };

    let response = "";

    {
      id != ""
        ? (response = await privateApi.update(
            `candidate/educations/${id}`,
            data
          ))
        : (response = await privateApi.post(`candidate/educations`, data));
    }

    if (response.status === 200) {
      setLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      getUserData();
      setShow(false);
    } else {
      setLoading(false);
      toast.warning(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
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
        const response = await privateApi.delete(`candidate/educations/${id}`);

        if (response.status === 200) {
          setLoading(false);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          getUserData();
        } else {
          setLoading(false);
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

  //Update New Data
  const getUserData = async (e) => {
    const response = await privateApi.get("candidate/profile");
    if (response.status === 200) {
      setUserInfo(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const updateModalHandler = (i, title) => {
    setNewEducations(educations[i]);
    setModalTitle(title);
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tab-education"
        role="tabpanel"
        aria-labelledby="tab-education"
      >
        <div className="row">
          <div className="col-9">
            <h3 className="mt-10 mb-10 color-brand-1">My Educations</h3>
            <a className="font-md color-text-paragraph-2 mb-3" href="#">
              Update Your Educations
            </a>
          </div>
          <div className="col-3 text-end">
            <div
              className="btn btn-apply-now mt-2"
              onClick={() => handleShow("Add New Education")}
            >
              <FaPlus /> Add New
            </div>
          </div>
        </div>

        <div className="row display-list mt-5">
          {educations?.map((education, i) => (
            <div key={i} className="col-xl-12 col-12">
              <div className="card-grid-2 hover-up">
                <span className="flash"></span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="right-info">
                        <a className="name-job" href="">
                          Degree: {education.degree}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                    <div className="pl-15 mb-15 mt-30">
                      <a
                        className="btn btn-red-small mr-5"
                        onClick={() => deleteHandler(education.education_id)}
                      >
                        <FaTrashAlt /> Delete
                      </a>
                      <a
                        className="btn btn-grey-small mr-5"
                        onClick={() =>
                          updateModalHandler(i, "update Education")
                        }
                      >
                        <FaEdit /> Update
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-block-info">
                  {/* Show education info */}
                  <p>institute Name: {education.institute_name}</p>
                  <p>
                    Year: {education.start_year} - {education.passing_year}{" "}
                  </p>
                  <p>Result: {education.result}</p>
                  <p>Description: {education.description}</p>
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
                onSubmit={(e) => formSubmit(e, newEducations.education_id)}
              >
                <div className="form-group">
                  <label className="font-sm  mb-10">Degree</label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    type="text"
                    name="degree"
                    onChange={handleInput}
                    value={newEducations.degree}
                  />
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">institute name</label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    name="institute_name"
                    onChange={handleInput}
                    value={newEducations.institute_name}
                  />
                </div>
                <div className="from-group">
                  <label className="font-sm  mb-10">Start Year</label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    name="start_year"
                    onChange={handleInput}
                    value={newEducations.start_year}
                  />
                </div>
                <div className="from-group">
                  <label className="font-sm  mb-10">Passing Year</label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    name="passing_year"
                    onChange={handleInput}
                    value={newEducations.passing_year}
                  />
                </div>
                <div className="from-group">
                  <label className="font-sm  mb-10">Result</label>
                  <input
                    className="form-control"
                    name="result"
                    onChange={handleInput}
                    value={newEducations.result}
                  />
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    onChange={handleInput}
                  >
                    {newEducations.description}
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
}

export default EducationTab;
