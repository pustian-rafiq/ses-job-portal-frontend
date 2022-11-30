import React,{useState,useContext,useEffect} from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {useRouter} from 'next/router';
import { useForm } from "react-hook-form";
import { appContext } from "../../../pages/_app";
import privateApi from "../../../services/privateApi";
import { getToken } from "../../../services/auth/token";
function AddCertificate({ getUserCertificates,show, onHide }) {

const router = useRouter()

const { register, handleSubmit, reset, formState: { errors } } = useForm();
const documentSubmitHandler = async (data ) => {

  if(getToken()){
    const response = await privateApi.post("/candidate/certifications",data);
      if (response.status === 200) {
      toast.success("You have successfully added your certificate", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      });
      reset()
      onHide()
      getUserCertificates()
    
    } else {
    console.log('error', response)
    }
  }else{
    toast.warn("Please login your account", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    });
    setTimeout(() => {
    setShow(false)
    router.push("/auth/login")
    },3000)
    }
  };
return (
<Modal show={show} keyboard="false"  onHide={onHide}>
   <div className="modal-content apply-job-form">
      <button
         className="btn-close"
         type="button"
         onClick={onHide}
         ></button>
      <div className="modal-body pl-30 pr-30 pt-50">
         <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">
               {/* {modalTitle} */}
               Add New Certification
            </h2>
            <p className="font-sm text-muted mb-30">
               Please fill in your information and send it to the employer.{" "}
            </p>
         </div>
         <form
            className="col-12 box-skills"
            onSubmit={handleSubmit(documentSubmitHandler)}
            >
            <div className="form-group">
               <label className="font-sm  mb-10">Name</label><span className="text-danger">*</span>
               <input
               className="form-control"
               type="text"
               name="name"
               {...register("name", { required: true })}
               />
                 {errors.name &&  <span className="text-danger">Certificate name must not be empty</span>}
            </div>
            <div className="form-group">
               <label className="font-sm  mb-10">Organization Name</label><span className="text-danger">*</span>
               <input
               className="form-control"
               type="text"
               name="organization_name"
               {...register("organization_name", { required: true })}
               />
                {errors.organization_name &&  <span className="text-danger">Organization name must not be empty</span>}
            </div>
            <div className="form-group">
               <label className="font-sm  mb-10">Issue Date</label>
               <input
               className="form-control"
               type="date"
               name="issue_date"
               {...register("issue_date")}
               />
            </div>
            <div className="form-group">
               <label className="font-sm  mb-10">Description</label>
               <textarea className="form-control" name="description" {...register("description")}>
               </textarea>
            </div>
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
);
}
export default AddCertificate;
