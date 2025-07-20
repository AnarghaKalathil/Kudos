import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Box
} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: () => void;
  title: string;
}

const FormModal: React.FC<Props> = ({
  open,
  handleClose,
  formData,
  setFormData,
  handleSubmit,
  title
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
       {Object.keys(formData).map((key) => {
  if (key === 'id' || key === 'updatedTime') return null; // ⛔ Skip these fields
  return (
    <TextField
      key={key}
      label={key.charAt(0).toUpperCase() + key.slice(1)}
      fullWidth
      margin="normal"
      value={formData[key]}
      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
    />
  );
})}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
