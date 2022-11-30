import React, { useEffect, useRef, useState } from "react";

import {FaEdit, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

import privateApi from "../../services/privateApi";
import { set } from "nprogress";

import Image from "next/image";
import userImage from "../../assets/imgs/user.webp"

function ShortBio({ userInfo, setUserInfo }) {
  const [user, setUser] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    photo: "",
    total_experience: "",
    current_position: "",
    expected_salary: "",
    current_salary: "",
    preferred_work_location: "",
    other_information: "",
    about: "",
    error_list: [],
  });

  const filePro = useRef();

  const [loading, setLoading] = useState("");
  const [file, setFile] = useState("");
  const [imagedata, setImagedata] = useState("");

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value, error_list: [] });
  };

  useEffect(() => {
    setUser(userInfo);
    setFile(userInfo.photo);
    // setFile('http://52.68.248.212:8001/storage/candidate/documents/1665033891Capturepp.PNG')
  }, [userInfo]);

  const handleChange = (file) => {
    setFile(URL.createObjectURL(file[0]));
    console.log("imageData", file[0]);
    setImagedata(file[0]);
  };

  const formSubmit = async (e, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      expected_salary: user.expected_salary,
      photo: file,
    };

    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("phone", user.phone);
    formData.append("email", user.email);
    formData.append("about", user.about);
    formData.append("current_position", user.current_position);
    formData.append("current_salary", user.current_salary);
    formData.append("preferred_work_location", user.preferred_work_location);
    formData.append("expected_salary", user.expected_salary);
    formData.append("photo", imagedata);

    const response = await privateApi.post(
      `candidate/profile-update`,
      formData
    );

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
      setUser({
        ...user,
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

  //Update New Data
  const getUserData = async (e) => {
    const response = await privateApi.get("candidate/profile");
    if (response.status === 200) {
      setUserInfo(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <>
      {/* Bio Tab */}

      <div
        className="tab-pane fade show active"
        id="tab-short-bio"
        role="tabpanel"
        aria-labelledby="tab-short-bio"
      >
        <h3 className="mt-10 mb-10 color-brand-1">My Account</h3>
        <a className="font-md color-text-paragraph-2" href="#">
          Update your profile
        </a>

        <form className="" onSubmit={formSubmit}>
          <div className="wrapper mt-35 mb-40 box-info-profie">
            <div className="img-box" onClick={() => filePro.current.click()}>
              <input
                ref={filePro}
                onChange={(e) => handleChange(e.target.files)}
                multiple={false}
                type="file"
                hidden
              />

              <Image
                src={file ? file : userImage}
                height={200}
                width={200}
                className="avater-img-src"
                alt={user.first_name}
              />
            </div>
            <div className="text text-light">
              {/* <FaCameraRetro className="text-light"/> */}
              <FaEdit /> <b className="pt-2">Edit</b>
            </div>
          </div>

          <div className="row form-contact">
            <div className="col-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">
                      First Name<span className="required">*</span>
                    </label>
                    <input
                      className={`${
                        user.error_list?.first_name && "is-invalid"
                      } form-control`}
                      type="text"
                      value={user.first_name }
                      name="first_name"
                      onChange={handleInput}
                   

                    />
                    <p className="text-danger ">
                      {user.error_list?.first_name}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">
                      Last Name<span className="required">*</span>
                    </label>
                    <input
                      className={`${
                        user.error_list?.last_name && "is-invalid"
                      } form-control`}
                      type="text"
                      name="last_name"
                      onChange={handleInput}
                      value={user.last_name}
                    />
                    <p className="text-danger ">
                      {user.error_list?.last_name}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">
                      Email<span className="required">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">
                      Phone<span className="required">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      value={user.phone}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="font-sm  mb-10">About</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="about"
                  onChange={handleInput}
                  value={user.about == 'null' ? '' : user.about}
                >
                </textarea>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">Current Position</label>
                    <input
                      className="form-control"
                      type="text"
                      name="current_position"
                      onChange={handleInput}
                      value={user.current_position == 'null' ? '' : user.current_position}
                      placeholder="Enter current position"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">Current Salary</label>
                    <input
                      className="form-control"
                      type="text"
                      name="current_salary"
                      onChange={handleInput}
                      value={user.current_salary == 'null' ? '' : user.current_salary}
                      placeholder="Enter current salary"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">
                      Preferred Work Location
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="preferred_work_location"
                      onChange={handleInput}
                      value={user.preferred_work_location == 'null' ? '' : user.preferred_work_location}
                      placeholder="Enter work location"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="font-sm  mb-10">Expected Salary</label>
                    <input
                      className="form-control"
                      type="text"
                      name="expected_salary"
                      onChange={handleInput}
                      value={user.expected_salary == 'null' ? '' : user.expected_salary}
                      placeholder="Enter expected salary"
                    />
                  </div>
                </div>
              </div>

              <div className="border-bottom pt-10 pb-10"></div>

              <div className="box-button mt-15">
                {/* <button
                  type="submit"
                  className="btn btn-apply-big font-md font-bold"
                >
                  Update
                </button> */}

                <div className="form-group">
                  {loading ? (
                    <button
                      className=" btn-brand-1 hover-up w-100"
                      disabled
                      type="submit"
                    >
                      <FaSpinner icon="spinner" className="spinner" /> &nbsp;
                      Updating...
                    </button>
                  ) : (
                    <button
                      className=" btn-brand-1 hover-up w-100"
                      type="submit"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ShortBio;
