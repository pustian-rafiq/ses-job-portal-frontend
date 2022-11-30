import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import privateApi from "../../services/privateApi";

function AddressTab({ allAddress, setUserInfo }) {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [newAddress, setNewAddress] = useState({
    address_id: "",
    address_type: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    error_list: "",
  });

  const handleClose = () => setShow(false);

  const handleShow = (title) => {
    setNewAddress({
      address_id: "",
      address_type: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      error_list: "",
    });
    setModalTitle(title);
    setShow(true);
  };

  const handleInput = (e) => {
    e.persist();
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  useEffect(() => {
    setAddresses(allAddress);
  }, [allAddress]);

  const handleInput2 = (e, i) => {
    e.persist();

    const arr = [...addresses];
    arr[i] = { ...arr[i], [e.target.name]: e.target.value };
    setAddresses(arr);
  };

  const formSubmit = async (e, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      type: newAddress.address_type,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      country: newAddress.country,
      zip: newAddress.zip,
    };

    let response = "";

    {
      id != ""
        ? (response = await privateApi.update(`candidate/address/${id}`, data))
        : (response = await privateApi.post(`candidate/address`, data));
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

  const formSubmit2 = async (e, i, id) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      type: addresses[i].address_type,
      address: addresses[i].address,
      city: addresses[i].city,
      state: addresses[i].state,
      country: addresses[i].country,
      zip: addresses[i].zip,
    };

    const response = await privateApi.update(`candidate/address/${id}`, data);

    if (response.status === 200) {
      setLoading(false);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
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
        const response = await privateApi.delete(`candidate/address/${id}`);

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
    setNewAddress(addresses[i]);
    setModalTitle(title);
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="tab-address"
        role="tabpanel"
        aria-labelledby="tab-address"
      >
        <div className="row">
          <div className="col-9">
            <h3 className="mt-10 mb-10 color-brand-1">My Address</h3>
            <a className="font-md color-text-paragraph-2 mb-3" href="#">
              Update Your Address
            </a>
          </div>
          <div className="col-3 text-end">
            {addresses?.length < 2 && (
              <div
                className="btn btn-apply-now mt-2"
                onClick={() => handleShow("Add New Address")}
              >
                <FaPlus /> Add New
              </div>
            )}
          </div>
        </div>

        <div className="row display-list mt-5">
          {addresses?.map((address, i) => (
            <div className="col-xl-12 col-12" key={i}>
              <div className="card-grid-2 hover-up">
                <span className="flash"></span>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="right-info">
                        <a className="name-job" href="">
                          {address.address_type}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                    <div className="pl-15 mb-15 mt-30">
                      <a
                        className="btn btn-red-small mr-5"
                        onClick={() => deleteHandler(address.address_id)}
                      >
                        <FaTrashAlt /> Delete
                      </a>
                      <a
                        className="btn btn-grey-small mr-5"
                        onClick={() => updateModalHandler(i, "Update Address")}
                      >
                        <FaEdit /> Update
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-block-info">
                  <h6>Country: {address.country}</h6>
                  <p>State: {address.state}</p>
                  <p>City: {address.city}</p>
                  <p>City: {address.zip}</p>
                  <p>Address: {address.address}</p>
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
                onSubmit={(e) => formSubmit(e, newAddress.address_id)}
              >
                <div className="form-group">
                  <label className="font-sm  mb-10">Address Type</label>
                  <select
                    className="form-control"
                    name="address_type"
                    onChange={handleInput}
                    value={newAddress.address_type}
                  >
                    <option value="">Select One</option>
                    <option value="Parmanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="font-sm  mb-10">Country</label>
                  <input
                    className="form-control"
                    type="text"
                    name="country"
                    onChange={handleInput}
                    value={newAddress.country}
                  />
                </div>
                <div className="form-group">
                  <label className="font-sm  mb-10">State</label>
                  <input
                    className="form-control"
                    type="text"
                    name="state"
                    onChange={handleInput}
                    value={newAddress.state}
                  />
                </div>
                <div className="form-group">
                  <label className="font-sm  mb-10">City</label>
                  <input
                    className="form-control"
                    type="text"
                    name="city"
                    onChange={handleInput}
                    value={newAddress.city}
                  />
                </div>
                <div className="form-group">
                  <label className="font-sm  mb-10">Zip</label>
                  <input
                    className="form-control"
                    type="text"
                    name="zip"
                    onChange={handleInput}
                    value={newAddress.zip}
                  />
                </div>
                <div className="form-group">
                  <label className="font-sm  mb-10">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    onChange={handleInput}
                  >
                    {newAddress.address}
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

export default AddressTab;
