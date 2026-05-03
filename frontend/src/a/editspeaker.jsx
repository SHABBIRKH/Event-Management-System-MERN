import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditSpeaker() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: ''
  });

  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    axios.get(`http://localhost:5731/speaker/${id}`)
      .then(res => {
        setFormData({
          name: res.data.name,
          bio: res.data.bio,
          email: res.data.email
        });
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Failed to load speaker data');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('bio', formData.bio);
    form.append('email', formData.email);
    if (photoFile) {
      form.append('photo', photoFile);
    }

    try {
      await axios.put(`http://localhost:5731/speaker/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Speaker updated successfully');
      navigate('/showspeaker');
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating speaker');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 mx-auto'>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Edit Speaker </h3>
              </div>
              <div className="row">
                <div className="col-md-10 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Update Speaker</h4>
                      <form className="forms-sample" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Bio</label>
                          <div className="col-sm-9">
                            <textarea
                              className="form-control"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Photo</label>
                          <div className="col-sm-9">
                            <input
                              type="file"
                              className="form-control"
                              name="photo"
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                           
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Update</button>
                        <button type="reset" className="btn btn-dark">Cancel</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
