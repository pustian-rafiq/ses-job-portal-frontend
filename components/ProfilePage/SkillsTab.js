import { useState, useEffect } from "react";

import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import privateApi from "../../services/privateApi";

function SkillsTab({ allSkills, setUserInfo }) {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [newSkills, setNewSkills] = useState({
    skill_id: "",
    candidate_skill: "",
    skill_level: "",
    skill_description: "",
    error_list: [],
  });

  const handleClose = () => setShow(false);

  const handleShow = (title) => {
    setNewSkills({
      skill_id: "",
      candidate_skill: "",
      skill_level: "",
      skill_description: "",
      error_list: [],
    });
    setModalTitle(title);
    setShow(true);
  };

  const handleInput = (e) => {
    e.persist();
    setNewSkills({
      ...newSkills,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  useEffect(() => {
    setSkills(allSkills);
  }, [allSkills]);

  const formSubmit = async (e, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      skill: newSkills.candidate_skill,
      level: newSkills.skill_level,
      description: newSkills.skill_description,
    };

    let response = "";

    {
      id != ""
        ? (response = await privateApi.update(`candidate/skills/${id}`, data))
        : (response = await privateApi.post(`candidate/skills`, data));
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
      setNewSkills({
        ...newSkills,
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
        const response = await privateApi.delete(`candidate/skills/${id}`);

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
    setNewSkills(skills[i]);
    setModalTitle(title);
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tab-skills"
        role="tabpanel"
        aria-labelledby="tab-skills"
      >
        <div className="row">
          <div className="col-9">
            <h3 className="mt-10 mb-10 color-brand-1">My Skills</h3>
            <a className="font-md color-text-paragraph-2 mb-3" href="#">
              Update Your Skills Info
            </a>
          </div>
          <div className="col-3 text-end">
            <div
              className="btn btn-apply-now mt-2"
              onClick={() => handleShow("Add New Skill")}
            >
              <FaPlus /> Add New
            </div>
          </div>
        </div>

        <div className="row display-list mt-5">
          {skills?.map((skill, i) => (
            <div key={i} className="col-xl-12 col-12">
              <div className="card-grid-2 hover-up">
                <span className="flash"></span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="right-info">
                        <a className="name-job" href="">
                          {skill.candidate_skill}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                    <div className="pl-15 mb-15 mt-30">
                      <a
                        className="btn btn-red-small mr-5"
                        onClick={() => deleteHandler(skill.skill_id)}
                      >
                        <FaTrashAlt /> Delete
                      </a>
                      <a
                        className="btn btn-grey-small mr-5"
                        onClick={() => updateModalHandler(i, "Update Skill")}
                      >
                        <FaEdit /> Update
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-block-info">
                  <p>Level: {skill.skill_level}</p>
                  <p>Description: {skill.skill_description}</p>
                </div>
              </div>
            </div>
          ))}
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
                onSubmit={(e) => formSubmit(e, newSkills.skill_id)}
              >
                <div className="form-group">
                  <label className="font-sm  mb-10">
                    Skill Name <span className="required">*</span>
                  </label>
                  <input
                    className={`${
                      newSkills.error_list?.skill && "is-invalid"
                    } form-control`}
                    type="text"
                    name="candidate_skill"
                    onChange={handleInput}
                    value={newSkills.candidate_skill}
                  />
                  <p className="text-danger ">{newSkills.error_list?.skill}</p>
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">
                    Skill Type <span className="required">*</span>
                  </label>
                  <select
                    className={`${
                      newSkills.error_list?.level && "is-invalid"
                    } form-control`}
                    name="skill_level"
                    onChange={handleInput}
                    value={newSkills.skill_level}
                  >
                    <option value="Intermidiate Level">
                      Intermidiate Level
                    </option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Pro Level">Pro Level</option>
                  </select>
                  <p className="text-danger ">{newSkills.error_list?.level}</p>
                </div>

                <div className="form-group">
                  <label className="font-sm  mb-10">Description</label>
                  <textarea
                    className="form-control"
                    name="skill_description"
                    onChange={handleInput}
                  >
                    {newSkills.skill_description}
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

export default SkillsTab;
