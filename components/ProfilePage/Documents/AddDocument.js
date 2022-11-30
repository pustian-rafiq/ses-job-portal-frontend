import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { appContext } from "../../../pages/_app";
import privateApi from "../../../services/privateApi";
// import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";
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

function AddDocument({ getUserDocuments, show, onHide }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [isFileSelect, setIsFileSelect] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    // accept: {
    //   'image/*': []
    // },
    onDrop: (acceptedFiles) => {
      // console.log("file1", acceptedFiles[0].name);
      console.log("file2", acceptedFiles[0]);
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

  //
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

  // const fileHandler = (event) =>
  // {
  //     console.log("ddd",event.target.files[0]);
  // }

  const documentSubmitHandler = async (data) => {
    if (!selectedFile) {
      setIsFileSelect("Document file must be selected");
    } else {
      const formData = new FormData();
      formData.append("type", data.type);
      formData.append("description", data.description);
      formData.append("file", selectedFile, selectedFileName);

      if (getToken()) {
        const response = await privateApi.post(
          "/candidate/documents",
          formData
        );
        if (response.status === 200) {
          toast.success("You have successfully uploaded your document", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
          });
          reset();
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
              Add New Document
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
              <label className="font-sm  mb-10">Document Name</label>
              <span className="text-danger">*</span>
              <input
                className="form-control"
                type="text"
                name="type"
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
                placeholder="Description"
                {...register("description")}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="font-sm  mb-10">Document Type</label>
              <span className="text-danger">*</span>
              <section>
                <div
                  style={dropzone}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <span className="state-highlight">
                    <FaCloudUploadAlt />
                  </span>
                  <p style={{ padding: "10px" }}>
                    <span className="fw-bold">Choose a file</span> or{" "}
                    <span className="fw-bold">Drag & Drop it here</span>
                  </p>
                </div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
              <span className="text-danger">
                {isFileSelect && isFileSelect}
              </span>
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

export default AddDocument;
