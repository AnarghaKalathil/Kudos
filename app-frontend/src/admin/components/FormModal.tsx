import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, Box, Typography
} from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: () => void;
  title: string;
  isDeleteConfirm?: boolean;
}

const FormModal: React.FC<Props> = ({
  open,
  handleClose,
  formData,
  setFormData,
  handleSubmit,
  title,
  isDeleteConfirm = false
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {isDeleteConfirm ? (
          <Typography>
            Are you sure you want to delete <strong>{formData.username}</strong>?
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            {Object.keys(formData).map((key) => {
              if (key === 'id' || key === 'updatedTime') return null;
              return (
                <TextField
                  key={key}
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                  fullWidth
                  margin="normal"
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color={isDeleteConfirm ? 'error' : 'primary'}
        >
          {isDeleteConfirm ? 'Delete' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
