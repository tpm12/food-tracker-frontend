import React, { useState, useEffect } from "react";
import { api } from "../api";

const WaterTracker: React.FC = () => {
  const [water, setWater] = useState("");
  const [waterLogs, setWaterLogs] = useState<{ id: number; amount: number }[]>([]);

  // Fetch existing water intake logs
  useEffect(() => {
    api.get("/water/1") // Replace 1 with dynamic user ID later
      .then(response => setWaterLogs(response.data))
      .catch(error => console.error("Error fetching water logs:", error));
  }, []);

  const handleAddWater = () => {
    if (water) {
      const newEntry = {
        user: { id: 1 }, // Replace with dynamic user ID later
        amount: parseFloat(water),
      };

      api.post("/water", newEntry)
        .then(response => {
          setWaterLogs([...waterLogs, response.data]);
          setWater("");
        })
        .catch(error => console.error("Error adding water intake:", error));
    }
  };

  return (
    <div>
      <h2>Water Tracker</h2>
      <input type="number" placeholder="Water Intake (liters)" value={water} onChange={(e) => setWater(e.target.value)} />
      <button onClick={handleAddWater}>Log Water</button>

      <ul>
        {waterLogs.map((log) => (
          <li key={log.id}>{log.amount} L</li>
        ))}
      </ul>
    </div>
  );
};

export default WaterTracker;
