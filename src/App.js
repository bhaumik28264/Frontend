import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Optional if you want to style

function App() {
  const [asinInput, setAsinInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://backend-t3p0.onrender.com"; // 🔁 Replace with your actual backend URL

  const handleSubmit = async () => {
    if (!asinInput.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/track_asin`, {
        asins: asinInput.split(",").map((asin) => asin.trim()),
      });
      console.log("📦 Response:", response.data);
      setResults(response.data);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong! Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>🕵️ Amazon ASIN Tracker</h2>
      <input
        type="text"
        placeholder="Enter ASIN(s), comma separated"
        value={asinInput}
        onChange={(e) => setAsinInput(e.target.value)}
        style={{ width: "400px", padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Tracking..." : "Track"}
      </button>

      {results.length > 0 && (
        <table
          style={{
            marginTop: "30px",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={thStyle}>ASIN</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Rating</th>
              <th style={thStyle}>Reviews</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{item.asin}</td>
                <td style={tdStyle}>{item.title}</td>
                <td style={tdStyle}>{item.price}</td>
                <td style={tdStyle}>{item.rating}</td>
                <td style={tdStyle}>{item.reviews}</td>
                <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

export default App;
