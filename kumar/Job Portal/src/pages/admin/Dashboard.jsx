import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  
  return (
    <section className="dashboard">
      <div className="leftpanel">
        <img src="img/company/zoho.jpg" alt="Admin" />
        <h2>Admin</h2>
        <div className="navs">
          <ul className="uplinks">
            <li>Home</li>
            <li>Jobs</li>
            <li>Companies</li>
            <li>Chart</li>
            <li>Manage Jobs</li>
            <li>Users List</li>
            <li>Employees List</li>
          </ul>
          <ul className="logout">
            <li>Logout</li>
          </ul>
        </div>
      </div>
      <div className="rightpanel">
        <div className="cardspanel">
          <div className="card-users">
            <div className="card-header">
              <h2>Users</h2>
            </div>
            <hr />
            <div className="card-body">
              <p>Total:2</p>
            </div>
          </div>
          <div className="card-users">
            <div className="card-header">
              <h2>Jobs</h2>
            </div>
            <hr />
            <div className="card-body">
              <p>Total:2</p>
            </div>
          </div>
          <div className="card-users">
            <div className="card-header">
              <h2>JobSeekers</h2>
            </div>
            <hr />
            <div className="card-body">
              <p>Total:2</p>
            </div>
          </div>
          <div className="card-users">
            <div className="card-header">
              <h2>Companies</h2>
            </div>
            <hr />
            <div className="card-body">
              <p>Total:2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
