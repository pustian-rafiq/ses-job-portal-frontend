import React,{useState,useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { appContext } from "../../../pages/_app";
import privateApi from "../../../services/privateApi";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificate";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Certification({ allSkills }) {
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userCertificates, setUserCertificate] = useState([])
  const [editUserCertificate, setEditUserCertificate] = useState([])


  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleShow = (title) => {
  // setModalTitle(title);
  setShow(true);
  };
  useEffect(() => {
  getUserCertificates()
  },[])

  //Fetch user certificates
  const getUserCertificates = async (e) => {
  const response = await privateApi.get("candidate/certifications");
  if (response.status === 200) {
    setUserCertificate(response.data.data);
    // setLoader(false);
  } else {
    console.log("Server Error");
  }
  };
 
  //Edit certificate handler
  const editCertificateHandler = (id,name,organization_name,issue_date, description) => {
  const editData = {
     certificate_id: id,
     name: name,
     organization_name: organization_name,
     issue_date: issue_date,
     description: description,
  }
    
  setEditUserCertificate(editData)
   setShowEditModal(true)
 }

 //Delete certificate   
 const deleteHandler = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        const response = await privateApi.delete(`candidate/certifications/${id}`);
        if (response.status === 200) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        getUserCertificates();
      }
    })
}  
return (
<>
<div
   className="tab-pane fade"
   id="tab-cirtification"
   role="tabpanel"
   aria-labelledby="tab-cirtification"
   >
   <div className="row">
      <div className="col-9">
         <h3 className="mt-10 mb-10 color-brand-1">My Certification</h3>
         <a className="font-md color-text-paragraph-2 mb-3" href="#">
         Update My Certification
         </a>
      </div>
      <div className="col-3 text-end">
         <div className="btn btn-apply-now mt-2" onClick={() =>
            handleShow('Add New Address')}>
            <FaPlus />
            Add New
         </div>
      </div>
   </div>
   <div className="row display-list mt-5">
      {userCertificates?.map((certificate, i) => (
      <div className="col-xl-12 col-12" key={i}>
         <div className="card-grid-2 hover-up">
            <span className="flash"></span>
            <div className="row">
               <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="card-grid-2-image-left">
                     <div className="card-block-info">
                        <h6>Name: {certificate.name}</h6>
                        <p>Organization Name: {certificate.organization_name}</p>
                        <p>Issue Date: {certificate.issue_date}</p>
                        <p>Description: {certificate.description}</p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                  <div className="pl-15 mb-15 mt-30">
                     <a className="btn btn-red-small mr-5" onClick={() =>
                        deleteHandler(certificate.certificate_id)}>
                        <FaTrashAlt />
                        Delete
                     </a>
                     <a className="btn btn-grey-small mr-5"
                       onClick={()=> editCertificateHandler(
                        certificate.certificate_id,
                        certificate.name,
                        certificate.organization_name,
                        certificate.issue_date,
                        certificate.description
                        )} 
                     >
                        <FaEdit />
                        Update
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      ))}
   </div>
</div>
<AddCertificate
   getUserCertificates={getUserCertificates}
   show={show}
   onHide={()=>
setShow(false)}
/>

<EditCertificate
   editUserCertificate={editUserCertificate}
   getUserCertificates={getUserCertificates}
   show={showEditModal}
   onHide={()=>
   setShowEditModal(false)}
/>
</>
);
}
export default Certification;
