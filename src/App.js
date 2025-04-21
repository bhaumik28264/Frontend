
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [asins, setAsins] = useState("");
  const [data, setData] = useState([]);

  const trackASINs = async () => {
    const asinArray = asins.split(",").map((a) => a.trim());
    const response = await axios.post("http://localhost:8000/track_asin", {
      asins: asinArray,
    });
    setData(response.data.tracked);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Amazon ASIN Tracker</h1>
      <input
        value={asins}
        onChange={(e) => setAsins(e.target.value)}
        placeholder="Enter ASINs comma separated"
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={trackASINs}>Track</button>

      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ASIN</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{item.asin}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.rating}</td>
              <td>{item.reviews}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
