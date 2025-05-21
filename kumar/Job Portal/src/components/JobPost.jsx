import { Link } from 'react-router-dom';

function JobPost() {
  return (
    <section className="bg-blue-600 text-white p-10 text-center">
      <h3 className="text-2xl font-semibold mb-2">Are you hiring?</h3>
      <p className="mb-4">Post a job and reach thousands of job seekers today.</p>

      <Link to="/PostingJobs">
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100">Post a Job</button>
      </Link>
    </section>
  );
}

export default JobPost;