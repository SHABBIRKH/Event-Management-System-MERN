import React, { useState } from 'react';
import axios from 'axios';

export default function Speaker() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: ''  // changed from contactEmail to email
  });

  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('bio', formData.bio);
    form.append('email', formData.email);  // changed here to email
    form.append('photo', photoFile);       // file field name remains 'photo'

    try {
      const response = await axios.post('http://localhost:5731/api/speaker', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Speaker submitted:', response.data);
      alert('Speaker submitted successfully');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-10 mx-auto'>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Speaker Form </h3>
              </div>
              <div className="row">
                <div className="col-md-10 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Add Speaker</h4>
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
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email</label> {/* changed label */}
                          <div className="col-sm-9">
                            <input 
                              type="email" 
                              className="form-control" 
                              name="email"    // changed name to email
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Submit</button>
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
