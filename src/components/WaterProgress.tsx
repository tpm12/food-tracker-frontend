import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

interface WaterProgressProps {
  totalWaterIntake: number;
  dailyGoal: number;
}

const WaterProgress: React.FC<WaterProgressProps> = ({ totalWaterIntake, dailyGoal }) => {
  const progress = Math.min((totalWaterIntake / dailyGoal) * 100, 100);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1">
        {`Daily Goal: ${totalWaterIntake.toFixed(2)}L / ${dailyGoal}L`}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
    </Box>
  );
};

export default WaterProgress;