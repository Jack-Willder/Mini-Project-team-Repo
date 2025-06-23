import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import axios from "axios";
import defaultAvatar from "../../assets/react.svg";
import Jsheader from "../../components/Jsheader";

function JobSeekerProfile() {
  const navigate = useNavigate();
  const [jobseeker, setJobseeker] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jsToken");
    const jsData = localStorage.getItem("jsData");

    if (!token || !jsData) {
      navigate("/jslogin");
    } else {
      const parsedData = JSON.parse(jsData);
      setJobseeker(parsedData);
      fetchAppliedJobs(parsedData.id);
    }
  }, [navigate]);

  const fetchAppliedJobs = async (jobseekerId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/jobseekers/applied/${jobseekerId}`);
      setAppliedJobs(res.data);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    alert(`Selected resume: ${file.name}`);
  };

  if (!jobseeker) return <div className="loading">Loading...</div>;

  return (
    <>
      <Jsheader />

      <section className="jobseekerprofile-section">
        <div className="profile-card">
          <img src={defaultAvatar} alt="Profile" className="profile-avatar" />
          <h2><strong>Name:</strong> {jobseeker.name || "Jobseeker"}</h2>
          <p><strong>Email:</strong> {jobseeker.email}</p>
          <p><strong>Address:</strong> Not Provided</p>
          <label htmlFor="resumeUpload" className="upload-label">Upload Resume</label>
          <input type="file" id="resumeUpload" className="hidden-input" accept=".pdf,.doc,.docx" onChange={handleResumeUpload}/>
        </div>

        <div className="applied-jobs">
          <h3>Applied Jobs</h3>
          {appliedJobs.length === 0 ? (
            <p>No jobs applied yet.</p>
          ) : (
            <ul>
              {appliedJobs.map((job) => (
                <li key={job._id} className="job-item">
                  <strong>{job.title}</strong>
                  <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default JobSeekerProfile;