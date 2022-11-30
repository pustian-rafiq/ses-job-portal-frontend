import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";

import { appContext } from "../../../pages/_app";
import privateApi from "../../../services/privateApi";
import { getToken } from "../../../services/auth/token";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const dropzone = {
  textAlign: "center",
  padding: "10px",
  border: "3px dashed LightGray",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  cursor: "pointer",
  marginBottom: "20px",
};

function EditDocument({ editDocument, getUserDocuments, show, onHide }) {
  const router = useRouter();

  const handleClose = () => setShow(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //split file name
  const splitFile = editDocument.length > 0 && editDocument?.file.split("/");
  const fileName = splitFile[splitFile.length - 1];

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setSelectedFileName(acceptedFiles[0].name);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  // console.log(files[0].type);
  const thumbs = files.map((file) => {
    if (file.type === "application/pdf" || file.type === "application/doc") {
      return (
        <div key={file.name}>
          <FaFileUpload className="fs-3 bg-green" />
          <span> File name: {file.name}</span>
        </div>
      );
    } else {
      return (
        <div key={file.name} className="d-flex flex-column">
          <div style={thumb}>
            <div style={thumbInner}>
              <Image
                src={file.preview}
                style={img}
                alt=""
                width="100"
                height="100"
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div>
          <span className="p-2 bg-light"> File name: {file.name}</span>
        </div>
      );
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const documentUpdateHandler = async (data) => {
    const formData = new FormData();

    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("file", selectedFile, selectedFileName);

    if (getToken()) {
      const response = await privateApi.post(
        `candidate/documents/${editDocument?.document_id}?_method=PUT`,
        formData
      );
      if (response.status === 200) {
        toast.success("You have successfully updated your document", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        onHide();
        getUserDocuments();
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
    <Modal show={show} keyboard="false" backdrop="true" onHide={onHide}>
      <div className="modal-content apply-job-form">
        <button className="btn-close" type="button" onClick={onHide}></button>
        <div className="modal-body pl-30 pr-30 pt-50">
          <div className="text-center">
            <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">
              {/* {modalTitle} */}
              Update Your Document
            </h2>
            <p className="font-sm text-muted mb-30">
              Please fill in your information and send it to the employer.{" "}
            </p>
          </div>
          <form
            className="col-12 box-skills"
            onSubmit={handleSubmit(documentUpdateHandler)}
          >
            <div className="form-group">
              <label className="font-sm  mb-10">Document Name</label>
              <span className="text-danger">*</span>
              <input
                className="form-control"
                type="text"
                name="type"
                defaultValue={editDocument.document_type}
                {...register("type", { required: true })}
              />
              {errors.type && (
                <span className="text-danger">
                  Document type must not be required
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="font-sm  mb-10">Description</label>
              <textarea
                className="form-control"
                name="description"
                {...register("description")}
              >
                {editDocument.description}
              </textarea>
            </div>
            <div className="form-group">
              <label className="font-sm  mb-10">Upload File</label>
              <span className="text-danger">*</span>
              {fileName}
              <section>
                <div
                  style={dropzone}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <span className="state-highlight">
                    <FaCloudUploadAlt />{" "}
                  </span>
                  <p style={{ padding: "10px" }}>
                    <span className="fw-bold">Choose a file</span> or{" "}
                    <span className="fw-bold">Drag & Drop it here</span>
                  </p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
            </div>

            <div className="box-button mt-15">
              <button
                type="submit"
                className="btn btn-apply-big font-md font-bold"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default EditDocument;
