import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

function Invoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.bookingDetails;

  if (!booking) {
    return (
      <>
        <PageHeader />
        <div className="invoice-container">
          <h1 className="invoice-header">Invoice</h1>
          <p>No booking details found.</p>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <Footer />
      </>
    );
  }

  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);
  const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const handlePrint = () => {
    const printContent = document.querySelector(".invoice-container").innerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .invoice-container { width: 100%; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .field { font-weight: bold; }
            /* Hide buttons when printing */
            .invoice-buttons { display: none; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <>
      <PageHeader />
      <div className="invoice-container">
        <h1 className="invoice-header">Invoice</h1>
        <div className="invoice-details">
          <div className="detail-row">
            <span className="field">Vehicle Name:</span>
            <span className="value">{booking.car?.carName}</span>
          </div>
          <div className="detail-row">
            <span className="field">Vehicle Number:</span>
            <span className="value">{booking.car?.vehicleNumber}</span>
          </div>
          <div className="detail-row">
            <span className="field">Fare per Day:</span>
            <span className="value">
              {booking.carType === "With AC"
                ? booking.car?.acFarePerDay
                : booking.car?.nonAcFarePerDay}
            </span>
          </div>
          <div className="detail-row">
            <span className="field">Booking Date:</span>
            <span className="value">{new Date(booking.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="field">Start Date:</span>
            <span className="value">{start.toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="field">Rent End Date:</span>
            <span className="value">{end.toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="field">Car Return Date:</span>
            <span className="value">{end.toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="field">Number of Days:</span>
            <span className="value">{numberOfDays}</span>
          </div>
          <div className="detail-row">
            <span className="field">Total Amount:</span>
            <span className="value">{booking.totalAmount}</span>
          </div>
        </div>

        <div className="invoice-buttons">
          <button className="btn print-btn" onClick={handlePrint}>Print Invoice</button>
          <button className="btn back-btn" ><Link to='/customer-dashboard'>Dashboard</Link></button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Invoice;
