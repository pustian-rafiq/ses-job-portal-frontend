import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { getToken } from "../../../services/auth/token";
import privateApi from "../../../services/privateApi";
import axios from "axios";

function JobModal({
  show,
  setShow,
  jobId,
  setJobs,
  categoryId,
  setIsAppliedId,
}) {
  const router = useRouter();

  const handleClose = () => setShow(false);
  const [isValidSalary, setIsValidSalary] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Check the salary validation
  const salaryChangeHandler = (e) => {
    const salary = e.target.value;
    if (isNaN(salary)) {
      setIsValidSalary("Salary must be a number");
    } else {
      setIsValidSalary("");
    }
  };

  const applyJobSubmit = async (data) => {
    // e.preventDefault();

    const applyJobData = {
      job_id: jobId,
      expected_salary: data.expected_salary,
      cover_letter: data.cover_letter,
    };

    if (getToken()) {
      const response = await privateApi.post(
        "/candidate/apply-job",
        applyJobData
      );
      if (response.status === 200) {
        toast.success("You have successfully applied for this job", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        setShow(false);
        reset();
        setIsAppliedId(jobId);
        if (categoryId) {
          axios
            .get(`/category/${categoryId}`)
            .then((response) => {
              if (response.status === 200) {
                setJobs(response.data.jobs);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        console.log("error", response);
      }
    } else {
      toast.warn("Please login your account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
      });
      setTimeout(() => {
        setShow(false);
        router.push("/auth/login");
      }, 3000);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} keyboard="false">
      <div className="modal-content apply-job-form">
        <button
          className="btn-close"
          type="button"
          onClick={handleClose}
        ></button>
        <div className="modal-body pl-30 pr-30 pt-50">
          <div className="text-center">
            <p className="font-sm text-brand-2">Job Application </p>
            <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">
              Start your career today
            </h2>
            <p className="font-sm text-muted mb-30">
              Please fill in your information and send it to the employer.{" "}
            </p>
          </div>
          <form
            className=" text-start mt-20 pb-30"
            action="#"
            onSubmit={handleSubmit(applyJobSubmit)}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Expected Salary
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                {...register("expected_salary")}
                placeholder="Ex: 15000.00"
                onChange={salaryChangeHandler}
              />

              <span className="text-danger">
                {isValidSalary && isValidSalary}
              </span>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-2">
                Cover letter
              </label>
              <textarea
                // value={applyJob.cover_letter}
                // onChange={inputChangeHandler}
                {...register("cover_letter")}
                className="form-control"
                name="cover_letter"
                cols="50"
                placeholder="Enter your cover letter here....."
              ></textarea>
              {errors.cover_letter && (
                <span className="text-danger">
                  A cover letter must not be empty
                </span>
              )}
            </div>

            <div className="form-group">
              <button
                className="btn btn-default hover-up w-100"
                type="submit"
                name="login"
              >
                Apply Job
              </button>
            </div>
            <div className="text-muted text-center">
              Do you need support? <a href="contact">Contact Us</a>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default JobModal;
