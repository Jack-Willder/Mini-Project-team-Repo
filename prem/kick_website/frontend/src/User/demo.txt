import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Report.css";

function Report() {
  const [reportType, setReportType] = useState("weekly");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReport = async (type) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/order/report/${type}`);
      setReportData(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("⚠️ Failed to load report data. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(reportType);
  }, [reportType]);

  return (
    <div className="report-page">
      <h2>📊 Sales Report Dashboard</h2>

      <div className="report-controls">
        {["weekly", "monthly", "yearly"].map((type) => (
          <button
            key={type}
            className={reportType === type ? "active" : ""}
            onClick={() => setReportType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p>⏳ Loading report...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : reportData ? (
        <div className="report-results">
          <h3>
            💰 Total Sales: ₹{reportData.totalSales?.toLocaleString()} | 🧾 Orders:{" "}
            {reportData.count} | 📦 Items Sold: {" "}
          </h3>

          {/* Table */}
          <table className="report-table">
            <thead>
              <tr>
                <th>{reportType === "weekly" ? "Week" : reportType === "monthly" ? "Month" : "Year"}</th>
                <th>Sales (₹)</th>
                <th>Items Sold</th>
              </tr>
            </thead>
            <tbody>
              {reportData.chartData?.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.sales.toLocaleString()}</td>
                  <td>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={reportData.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" name="Sales (₹)" />
                <Bar dataKey="items" fill="#82ca9d" name="Items Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p>No report data available.</p>
      )}
    </div>
  );
}

export default Report;
