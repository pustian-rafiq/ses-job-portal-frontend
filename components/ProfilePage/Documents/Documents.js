import React,{useState,useEffect} from "react";

import { FaEdit, FaFileDownload, FaPlus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import AddDocument from "./AddDocument";
import EditDocument from "./EditDocument";
import privateApi from "../../../services/privateApi";



function Documents() {
    const [show, setShow] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userDocument, setUserDocument] = useState([]);
    const [editUserDocument, setEditUserDocument] = useState([]);
    
    console.log("Dosument Error");
    // const handleClose = () => setShow(false);
    useEffect(() => {
      getUserDocuments();
    }, []);

    const handleShow = () => {
        setShow(true);
      };

      //Fetch user documents
      const getUserDocuments = async (e) => {
        const response = await privateApi.get("candidate/documents");
        if (response.status === 200) {
          setUserDocument(response.data.data);
          // setLoader(false);
        } else {
          console.log("Server Error");
        }
      };

      
//Delete document   
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
            const response = await privateApi.delete(`candidate/documents/${id}`);
            if (response.status === 200) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
            getUserDocuments();
          }
        })
        
      }    
//Edit the document
const editDocumentHandler = (id,type,file,description) => {
 const editData = {
    document_id: id,
    document_type: type,
    file: file,
    description: description,
 }
   
  setEditUserDocument(editData)
  setShowEditModal(true)
}

// const downloadImage = (image_url) => {
//   // console.log(image_url)
//   saveAs(image_url, 'image.jpg') // Put your image url here.
// }
  return (
    <>
       <div
        className="tab-pane fade"
        id="tab-documents"
        role="tabpanel"
        aria-labelledby="tab-documents"
      >
       <div className="row">
          <div className="col-md-9">
            <h3 className="mt-10 mb-10 color-brand-1">Uploaded Documents</h3>
            
          </div>
          <div className="col-md-3 text-end">
          
            <div className="btn btn-apply-now mt-2" onClick={handleShow}>
              <FaPlus /> Add New
            </div>
       
          </div>
        </div>

        <div className="row display-list mt-5">
        {
          userDocument?.map((document,i) => {
            const fileArray = (document?.file).split('.')
           const fileExtension = fileArray[fileArray.length-1]
            return (
            <div className="col-xl-12 col-12" key={i} >
                  <div className="card-grid-2 hover-up" >  
                  <span className="flash"></span>
                  <div className="row">
                    <div className="col-lg-9 col-md-10 col-sm-12">
                      <div className="p-3">
                      
                          <div className="row">
                            <div className="col-lg-2 col-md-3 col-sm-3 col-3 document-type ">
                              <p>{fileExtension}</p>
                            </div>
                            <div className="col-lg-10 col-md-9 col-sm-9 col-9">
                              <h3>{document?.document_type}</h3>
                              <p>{document?.description}</p>
                            </div>
                          </div>
                      </div>                  
                    </div>
                    <div className="text-start text-md-end pr-60 col-lg-3 col-md-2 col-sm-12">
                      <div className="pl-15 mb-15 mt-30">
                        <a href={document.file}  target="_blank" rel="noopener noreferrer" download className="btn btn-green-small mr-5  mt-1"  >
                          <FaFileDownload />  
                        </a>
                        <a className="btn btn-grey-small mr-5 mt-1">
                          <FaEdit onClick={()=> editDocumentHandler(document.document_id,document.document_type,document.file,document.description)} />  
                        </a>
                        <a className="btn btn-red-small mr-5 mt-1"  >
                          <FaTrashAlt onClick={()=> deleteHandler(document.document_id)} />  
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
               )
              })
            }
        </div>
      </div>
      <AddDocument
        getUserDocuments={getUserDocuments}
        show={show}
        onHide={()=> setShow(false)}
      />
      <EditDocument
        editDocument={editUserDocument ? editUserDocument : ""}
        getUserDocuments={getUserDocuments}
        show={showEditModal}
        onHide={()=> setShowEditModal(false)}
      />
    </>
  );
}

export default Documents;


 