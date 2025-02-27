import React, { useState, useEffect } from "react";
import { api } from "../api";
import { Paper, Typography } from "@mui/material";
import WaterProgress from "./WaterProgress";
import WaterLogList from "./WaterLogList";
import WaterInput from "./WaterInput";

const WaterTracker: React.FC = () => {
  const [waterLogs, setWaterLogs] = useState<{ id: number; amount: number }[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [dailyGoal, setDailyGoal] = useState<number>(2);
  const [totalWaterIntake, setTotalWaterIntake] = useState<number>(0);

  useEffect(() => {
    api.get("/water/1").then(response => {
      setWaterLogs(response.data);
      setTotalWaterIntake(response.data.reduce((sum, log) => sum + log.amount, 0));
    });
    api.get("/users/1").then(response => setDailyGoal(response.data.dailyWaterGoal || 2));
  }, []);

  const handleAddWater = (amount: number) => {
    api.post("/water", { user: { id: 1 }, amount }).then(response => {
      setWaterLogs([...waterLogs, response.data]);
      setTotalWaterIntake(totalWaterIntake + amount);
    });
  };

  const handleDeleteWater = (id: number, amount: number) => {
    api.delete(`/water/${id}`).then(() => {
      setWaterLogs(waterLogs.filter(entry => entry.id !== id));
      setTotalWaterIntake(totalWaterIntake - amount);
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%", maxWidth: 400 }}>
      <Typography variant="h5" align="center" gutterBottom>💧 Water Tracker</Typography>
      <WaterProgress totalWaterIntake={totalWaterIntake} dailyGoal={dailyGoal} />
      <WaterInput handleAddWater={handleAddWater} />
      <WaterLogList 
        waterLogs={waterLogs}
        handleDeleteWater={handleDeleteWater}
        handleEditClick={(id, amount) => { setEditId(id); setEditAmount(amount.toString()); }}
        editId={editId}
        editAmount={editAmount}
        setEditAmount={setEditAmount}
        setEditId={setEditId}
        handleEditSave={() => {
          if (editId !== null && editAmount) {
            api.put(`/water/${editId}`, { amount: parseFloat(editAmount) }).then(response => {
              setWaterLogs(waterLogs.map(entry => (entry.id === editId ? response.data : entry)));
              setTotalWaterIntake(waterLogs.reduce((sum, log) => (log.id === editId ? sum + parseFloat(editAmount) - log.amount : sum + log.amount), 0));
              setEditId(null);
              setEditAmount("");
            });
          }
        }}
      />
    </Paper>
  );
};

export default WaterTracker;
