import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface WaterInputProps {
  handleAddWater: (amount: number) => void;
}

const WaterInput: React.FC<WaterInputProps> = ({ handleAddWater }) => {
  const [customWater, setCustomWater] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="contained" color="primary" fullWidth onClick={() => handleAddWater(0.25)}>
        🥛 Glass (250ml)
      </Button>
      <Button variant="contained" color="primary" fullWidth onClick={() => handleAddWater(0.5)}>
        🍼 Small Bottle (500ml)
      </Button>
      <Button variant="contained" color="primary" fullWidth onClick={() => handleAddWater(1)}>
        🏺 Large Bottle (1L)
      </Button>

      {/* Toggleable Custom Water Intake */}
      {showCustomInput ? (
        <Box display="flex" flexDirection="column" gap={1}>
          <TextField
            label="Custom Amount (Liters)"
            type="number"
            variant="outlined"
            fullWidth
            value={customWater}
            onChange={(e) => setCustomWater(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => customWater && handleAddWater(parseFloat(customWater))}
            disabled={!customWater}
          >
            Submit
          </Button>
        </Box>
      ) : (
        <Button variant="outlined" fullWidth onClick={() => setShowCustomInput(true)}>
          ➕ Add Custom Amount
        </Button>
      )}
    </Box>
  );
};

export default WaterInput;
