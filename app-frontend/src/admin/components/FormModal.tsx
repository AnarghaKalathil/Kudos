import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value: string) => {
    if (value && value.length > 0 && value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const onInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    if (key === 'password') validatePassword(value);
  };

  const onSubmit = () => {
    if (passwordError) return;
    handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground mb-2">{title}</DialogTitle>
        </DialogHeader>
        {isDeleteConfirm ? (
          <form className="space-y-3">
            <div className="flex flex-col gap-1">
              <span className="text-base font-medium mb-2">Are you sure you want to delete <span className="font-bold">{formData.username || formData.name}</span>?</span>
            </div>
          </form>
        ) : (
          <form className="space-y-3">
            {Object.keys(formData).map((key) => {
              if (key === 'id' || key === 'updatedTime') return null;
              return (
                <div key={key} className="flex flex-col gap-1">
                  <label htmlFor={key} className="text-sm font-medium text-muted-foreground">
                    {key.charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                  </label>
                  <Input
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={(e) => onInputChange(key, e.target.value)}
                    type={key === 'password' ? 'password' : 'text'}
                  />
                  {key === 'password' && passwordError && (
                    <span className="text-xs text-red-600 mt-1">{passwordError}</span>
                  )}
                </div>
              );
            })}
          </form>
        )}
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose} type="button">Cancel</Button>
          <Button
            onClick={onSubmit}
            variant={isDeleteConfirm ? 'destructive' : 'default'}
            type="button"
            disabled={!!passwordError}
          >
            {isDeleteConfirm ? 'Delete' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
