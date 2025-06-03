function PostingJobs(){
  return(
    <div class="jobpost-container mt-10">
      <h1 className="text-4xl font-bold">Post a Job</h1>
      <form id="jobPostForm" action="#" method="POST">
        <label for="jobTitle">Job Title <span className="text-red-500">*</span></label>
        <input type="text" id="jobTitle" name="jobTitle" required placeholder="e.g. Frontend Developer" />
        <label for="jobDescription">Job Description <span className="text-red-500">*</span></label>
        <textarea id="jobDescription" name="jobDescription" required placeholder="Describe the job role, responsibilities, and requirements..."></textarea>
        <label for="jobCategory">Job Category <span className="text-red-500">*</span></label>
        <select id="jobCategory" name="jobCategory" required>
          <option value="" disabled selected>Select category</option>
          <option>Software Development</option>
          <option>Marketing</option>
          <option>Design</option>
          <option>Sales</option>
          <option>Customer Service</option>
          <option>Finance</option>
          <option>Other</option>
        </select>
        <label for="location">Location <span className="text-red-500">*</span></label>
        <input type="text" id="location" name="location" required placeholder="e.g. New York, NY" />
        <label for="salary">Salary (Optional)</label>
        <input type="text" id="salary" name="salary" placeholder="e.g. Rs.50,000 - Rs.70,000" />
        <div class="note">Provide salary range or leave blank if negotiable.</div>
        <label for="contactEmail">Contact Email <span className="text-red-500">*</span></label>
        <input type="email" id="contactEmail" name="contactEmail" required placeholder="xyz@gmail.com" />
        <button type="submit">Post Job</button>
      </form>
    </div>
  )
}

export default PostingJobs