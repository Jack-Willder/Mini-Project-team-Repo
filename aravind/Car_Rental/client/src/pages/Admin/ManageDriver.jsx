import React from "react";

function ManageDrivers() {
  const drivers = [
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      licenseNo: "DL-1234567890",
      contact: "9876543210",
      address: "123, Main Street, City",
      availability: "Available",
    },
    {
      id: 2,
      name: "Jane Smith",
      gender: "Female",
      licenseNo: "DL-0987654321",
      contact: "9123456780",
      address: "456, Park Avenue, City",
      availability: "On Duty",
    },
  ];

  const handleUpdate = (id) => {
    console.log("Update driver id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete driver id:", id);
  };

  return (
    <div className="page-background">
      <div className="manage-drivers-container">
        <h1 className="header">My Drivers</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>License No</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Availability</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver, index) => (
                <tr key={driver.id}>
                  <td>{index + 1}</td>
                  <td>{driver.name}</td>
                  <td>{driver.gender}</td>
                  <td>{driver.licenseNo}</td>
                  <td>{driver.contact}</td>
                  <td>{driver.address}</td>
                  <td>{driver.availability}</td>
                  <td>
                    <div className="operation-buttons">
                      <button
                        className="update-btn"
                        onClick={() => handleUpdate(driver.id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(driver.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDrivers;
