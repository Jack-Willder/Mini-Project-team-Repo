import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function Invoice() {
  const navigate = useNavigate();

  // Example invoice data
  const invoiceData = {
    vehicleName: "Toyota Camry",
    vehicleNumber: "TN-01-AB-1234",
    fare: 5000,
    bookingDate: "2025-10-01",
    startDate: "2025-10-03",
    rentEndDate: "2025-10-07",
    returnDate: "2025-10-07",
    numberOfDays: 5,
    totalAmount: 5000,
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGoBack = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <>
    <PageHeader/>
    <div className="invoice-container">
      <h1 className="invoice-header">Invoice</h1>
      <div className="invoice-details">
        <div className="detail-row">
          <span className="field">Vehicle Name:</span>
          <span className="value">{invoiceData.vehicleName}</span>
        </div>
        <div className="detail-row">
          <span className="field">Vehicle Number:</span>
          <span className="value">{invoiceData.vehicleNumber}</span>
        </div>
        <div className="detail-row">
          <span className="field">Fare:</span>
          <span className="value">{invoiceData.fare}</span>
        </div>
        <div className="detail-row">
          <span className="field">Booking Date:</span>
          <span className="value">{invoiceData.bookingDate}</span>
        </div>
        <div className="detail-row">
          <span className="field">Start Date:</span>
          <span className="value">{invoiceData.startDate}</span>
        </div>
        <div className="detail-row">
          <span className="field">Rent End Date:</span>
          <span className="value">{invoiceData.rentEndDate}</span>
        </div>
        <div className="detail-row">
          <span className="field">Car Return Date:</span>
          <span className="value">{invoiceData.returnDate}</span>
        </div>
        <div className="detail-row">
          <span className="field">Number of Days:</span>
          <span className="value">{invoiceData.numberOfDays}</span>
        </div>
        <div className="detail-row">
          <span className="field">Total Amount:</span>
          <span className="value">{invoiceData.totalAmount}</span>
        </div>
      </div>

      <div className="invoice-buttons">
        <button className="btn print-btn" onClick={handlePrint}>Print Invoice</button>
        <button className="btn back-btn" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Invoice;
