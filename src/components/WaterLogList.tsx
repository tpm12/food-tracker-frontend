import React from "react";
import { List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface WaterLog {
  id: number;
  amount: number;
}

interface WaterLogListProps {
  waterLogs: WaterLog[];
  handleDeleteWater: (id: number, amount: number) => void;
  handleEditClick: (id: number, amount: number) => void;
  editId: number | null;
  editAmount: string;
  setEditAmount: (value: string) => void;
  setEditId: (id: number | null) => void;
  handleEditSave: () => void;
}

const WaterLogList: React.FC<WaterLogListProps> = ({
  waterLogs,
  handleDeleteWater,
  handleEditClick,
  editId,
  editAmount,
  setEditAmount,
  setEditId,
  handleEditSave,
}) => {
  return (
    <>
      <List sx={{ mt: 2 }}>
        {waterLogs.map((log) => (
          <ListItem key={log.id} divider secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleEditClick(log.id, log.amount)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteWater(log.id, log.amount)} color="error">
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={`${log.amount} L`} />
          </ListItem>
        ))}
      </List>

      {/* Edit Water Log Dialog */}
      <Dialog open={editId !== null} onClose={() => setEditId(null)}>
        <DialogTitle>Edit Water Intake</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount (Liters)"
            type="number"
            fullWidth
            variant="outlined"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditId(null)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WaterLogList;
