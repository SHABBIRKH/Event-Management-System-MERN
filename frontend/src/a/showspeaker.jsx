import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function Showspeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpeakers() {
      try {
        const res = await axios.get('http://localhost:5731/api/speaker');
        setSpeakers(res.data);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSpeakers();
  }, []);

  if (loading) {
    return <div>Loading speakers...</div>;
  }

  if (speakers.length === 0) {
    return <div>No speakers found.</div>;
  }
  function handleDelete(id){
    axios.delete(`http://localhost:5731/speaker/${id}`)
        .then(() => setSpeakers(speakers.filter(user => user._id !== id)))
       
};

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Speaker Tables</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Show Speaker</a></li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Speakers List</h4>
                
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Bio</th>
                        <th>Delete</th>
                        <th>EDIT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {speakers.map((speaker) => (
                        <tr key={speaker._id}>
                          <td>
                            {speaker.imageurl ? (
                              <img
                                src={`http://localhost:5731/${speaker.imageurl}`}
                                alt={speaker.name}
                                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                              />
                            ) : (
                              'No Image'
                            )}
                          </td>
                          <td>{speaker.name}</td>
                          <td>{speaker.email}</td>
                          <td>{speaker.bio}</td>
                          <td><button class="btn btn-danger" onClick={()=>{
                            handleDelete(speaker._id)
                          }}> delete</button></td>
                          <td> <NavLink  to={`/editspeaker/${speaker._id}`}><button class="btn btn-warning"> edit</button> </NavLink></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
