import { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import {
  FaCreativeCommonsSamplingPlus,
  FaEdit,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Swal from "sweetalert2";

import privateApi from "../../services/privateApi";

function ExperienceTab({ allExperience, setUserInfo }) {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [experiences, setExperiences] = useState([]);

  const [newExp, setNewExp] = useState({
    experience_id: "",
    job_title: "",
    employee_type: "",
    designation: "",
    company_name: "",
    company_address: "",
    start_date: "",
    end_date: "",
    total_experience: "",
    description: "",
    error_list: [],
  });

  const handleClose = () => setShow(false);

  const handleShow = (title) => {
    setNewExp({
      experience_id: "",
      job_title: "",
      employee_type: "",
      designation: "",
      company_name: "",
      company_address: "",
      start_date: "",
      end_date: "",
      total_experience: "",
      description: "",
      error_list: [],
    });
    setModalTitle(title);
    setShow(true);
  };

  const handleInput = (e) => {
    e.persist();
    setNewExp({ ...newExp, [e.target.name]: e.target.value, error_list: [] });
  };

  useEffect(() => {
    setExperiences(allExperience);
  }, [allExperience]);

  const formSubmit = async (e, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      job_title: newExp.job_title,
      employee_type: newExp.employee_type,
      designation: newExp.designation,
      company_name: newExp.company_name,
      company_address: newExp.company_address,
      start_date: newExp.start_date,
      end_date: newExp.end_date,
      description: newExp.description,
    };

    let response = "";

    {
      id != ""
        ? (response = await privateApi.update(
            `candidate/experiences/${id}`,
            data
          ))
        : (response = await privateApi.post(`candidate/experiences`, data));
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
      setNewExp({
        ...newExp,
        error_list: response.data.errors,
      });
      // toast.warning(response.data.message, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      // });
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
        const response = await privateApi.delete(`candidate/experiences/${id}`);

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
    setNewExp(experiences[i]);
    setModalTitle(title);
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tab-experience"
        role="tabpanel"
        aria-labelledby="tab-experience"
      >
        <div className="row">
          <div className="col-9">
            <h3 className="mt-10 mb-10 color-brand-1">
              <FaCreativeCommonsSamplingPlus /> My Experience
            </h3>
            <a className="font-md color-text-paragraph-2 mb-3" href="#">
              Update Your Experience
            </a>
          </div>
          <div className="col-3 text-end">
            <div
              className="btn btn-apply-now mt-2"
              onClick={() => handleShow("Add New Experience")}
            >
              <FaPlus /> Add New
            </div>
          </div>
        </div>

        <div className="row display-list mt-5">
          {experiences?.map((exp, i) => (
            <div key={i} className="col-xl-12 col-12">
              <div className="card-grid-2 auto-height hover-up">
                <span className="flash"></span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="right-info">
                        <a className="name-job" href="">
                          Job Title: {exp.job_title}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                    <div className="pl-15 mb-15 mt-30">
                      <a
                        className="btn btn-red-small mr-5"
                        onClick={() => deleteHandler(exp.experience_id)}
                      >
                        <FaTrashAlt /> Delete
                      </a>
                      <a
                        className="btn btn-grey-small mr-5"
                        onClick={() =>
                          updateModalHandler(i, "Update Experience")
                        }
                      >
                        <FaEdit /> Update
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-block-info">
                  <h6>Employee Type: {exp.employee_type}</h6>
                  <p>Designation: {exp.designation}</p>
                  <p>Company Name: {exp.company_name}</p>
                  <p>Company Address: {exp.company_address}</p>
                  <p>Start Date: {moment(exp.start_date).format("LL")}</p>
                  <p>End Date: {moment(exp.end_date).format("LL")}</p>
                  <p>Total Experience: {exp.total_experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} keyboard="false">
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
              onSubmit={(e) => formSubmit(e, newExp.experience_id)}
            >
              <div className="form-group">
                <label className="font-sm  mb-10">
                  Job Title <span className="required">*</span>
                </label>
                <input
                  className={`${
                    newExp.error_list?.job_title && "is-invalid"
                  } form-control`}
                  type="text"
                  name="job_title"
                  onChange={handleInput}
                  value={newExp.job_title}
                />
                <p className="text-danger ">{newExp.error_list?.job_title}</p>
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">
                  Employee Type <span className="required">*</span>
                </label>
                <select
                  className={`${
                    newExp.error_list?.employee_type && "is-invalid"
                  } form-control`}
                  name="employee_type"
                  onChange={handleInput}
                  value={newExp.employee_type}
                >
                  <option value="">Choose One</option>
                  <option value="Parmanent">Permanent</option>
                  <option value="Temporary">Temporary</option>
                </select>
                <p className="text-danger ">
                  {newExp.error_list?.employee_type}
                </p>
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">Designation</label>
                <input
                  className="form-control"
                  type="text"
                  name="designation"
                  onChange={handleInput}
                  value={newExp.designation}
                />
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">
                  Company Name <span className="required">*</span>
                </label>
                <input
                  className={`${
                    newExp.error_list?.company_name && "is-invalid"
                  } form-control`}
                  type="text"
                  name="company_name"
                  onChange={handleInput}
                  value={newExp.company_name}
                />
                <p className="text-danger ">
                  {newExp.error_list?.company_name}
                </p>
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">
                  Company Address <span className="required">*</span>
                </label>
                <input
                  className={`${
                    newExp.error_list?.company_address && "is-invalid"
                  } form-control`}
                  type="text"
                  name="company_address"
                  onChange={handleInput}
                  value={newExp.company_address}
                />
                <p className="text-danger ">
                  {newExp.error_list?.company_address}
                </p>
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">Start Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="start_date"
                  onChange={handleInput}
                  value={newExp.start_date}
                  required="required"
                />
              </div>

              <div className="form-group">
                <label className="font-sm  mb-10">End Date</label>
                <input
                  className="form-control"
                  type="date"
                  name="end_date"
                  onChange={handleInput}
                  value={newExp.end_date}
                  required="required"
                />
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
    </>
  );
}

export default ExperienceTab;
