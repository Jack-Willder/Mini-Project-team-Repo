import { Link } from 'react-router-dom';
function Dashboard(){
    return(
        <section className="dashboard">
            <section className="navpanel">
                <div className="avatar">
                    <img src="/img/avatar/userimage2.jpg" alt="Admin" />
                    <h4 className="text-center text-amber-300 text-4xl font-bold mb-5 mt-5">Admin</h4>
                </div>
                <div className="links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/companies">Companies</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/jobseekers">Job Seekers</Link></li>
                        <li><Link to="/charts">Charts</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </section>
            <section className="mainpanel">
                <div className="card bg-gray-50 p-10">
                    <div className="card-head">
                        <h4>Jobs</h4>
                    </div>
                    <div className="card-body">
                        <p>Total Jobs: 5</p>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Dashboard