import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createCustomPage, updateCustomPage, fetchCustomPages } from "../../../redux/customPagesSlice";
import toast from "react-hot-toast";

function DC_CustomEdit() {
  const { id } = useParams(); // page id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pages = useSelector(state => state.customPages.pages);
  const [form, setForm] = useState({
    reference_name: "",
    website_url: "",
    custom_title: "",
    custom_message: "",
    custom_logo: null,
    banner: null,
  });

  // Load page data if editing
  useEffect(() => {
    if (id && pages.length) {
      const page = pages.find(p => p.id.toString() === id.toString());
      if (page) {
        setForm({
          reference_name: page.reference_name || "",
          website_url: page.website_url || "",
          custom_title: page.custom_title || "",
          custom_message: page.custom_message || "",
          custom_logo: null, // file input cannot be prefilled
          banner: null, // file input cannot be prefilled
        });
      }
    }
  }, [id, pages]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) setForm({ ...form, [id]: files[0] });
    else setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (let key of Object.keys(form)) {
      if (!form[key]) {
        toast.error(`Field "${key.replace("_", " ")}" is required!`);
        return;
      }
    }

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    try {
      if (id) {
        // ✅ Update
        await dispatch(updateCustomPage({ id, formData })).unwrap();
        toast.success("Custom Page updated successfully!");
      } else {
        // ✅ Create
        await dispatch(createCustomPage(formData)).unwrap();
        toast.success("Custom Page created successfully!");
      }
      navigate("/user/custom-pages"); // Redirect back to list
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <h5 className="fw-bold mb-4 text-center">{id ? "Edit Custom Page" : "Create Custom Page"}</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reference_name" className="form-label">Reference name</label>
          <input type="text" id="reference_name" className="form-control" value={form.reference_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="website_url" className="form-label">Website URL</label>
          <input type="url" id="website_url" className="form-control" value={form.website_url} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="custom_title" className="form-label">Custom Title</label>
          <input type="text" id="custom_title" className="form-control" value={form.custom_title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="custom_message" className="form-label">Custom Message</label>
          <textarea id="custom_message" className="form-control" rows="3" value={form.custom_message} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="custom_logo" className="form-label">Upload Logo</label>
          <input type="file" id="custom_logo" className="form-control" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="banner" className="form-label">Upload Banner</label>
          <input type="file" id="banner" className="form-control" onChange={handleChange} />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success">{id ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}

export default DC_CustomEdit;
