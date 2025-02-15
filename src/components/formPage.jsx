import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import Upload from "../assets/upload.svg";
import EmailIcon from "../assets/emailIcon.svg";
import "./formPage.css";

const FormPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryImage, setCloudinaryImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const cloudKey = import.meta.env.VITE_CLOUD_NAME;
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TICZ Images");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudKey}/image/upload`,
        formData
      );

      // Set the uploaded image URL
      setImageUrl(response.data.secure_url);

      // Create a CloudinaryImage object for display
      const uploadedImage = cld
        .image(response.data.public_id)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(200).height(200));
      setCloudinaryImage(uploadedImage);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate({ name, email }, { abortEarly: false });
      setErrors({});

      if (!imageUrl) {
        setErrors({ ...errors, image: "Please upload an image." });
        return;
      }

      const userData = {
        name,
        email,
        about,
        imageUrl,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/my-tickets");
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="formWrapper">
      <div className="container">
        <div className="form-header">
          <p className="formTic">Attendee Details</p>
          <p className="formStep">Step 2/3</p>
        </div>
        <div className="progress-container">
          <div className="progress-bars"></div>
        </div>
        <div className="event-details">
          <form onSubmit={handleSubmit}>
            <div className="headSection">
              <p className="photo">Upload Profile Photo</p>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
                id="file-input"
              />
              <div className="uploadWrapper">
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  <div className="upload-box">
                    {cloudinaryImage ? (
                      <AdvancedImage
                        cldImg={cloudinaryImage}
                        className="AdvancedImage"
                      />
                    ) : (
                      <div className="plus">
                        <img src={Upload} alt="Upload Icon" />
                        <span>Drag & drop or click to upload</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              {errors.image && <p className="error">{errors.image}</p>}
            </div>
            <div className="progress-barContainers"></div>
            <div className="form-group">
              <label>Enter your name</label>
              <input
                type="text"
                className="inputName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label>Enter your email*</label>
              <div className="email-input-wrapper">
                <input
                  type="email"
                  value={email}
                  placeholder="hello@avioflagos.io"
                  onChange={(e) => setEmail(e.target.value)}
                  className="emailText"
                />
                <img src={EmailIcon} alt="Email Icon" className="email-icon" />
              </div>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Special Note</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button type="button" className="back" onClick={handleBack}>
                Back
              </button>
              <button className="submit" type="submit">
                Get My Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
