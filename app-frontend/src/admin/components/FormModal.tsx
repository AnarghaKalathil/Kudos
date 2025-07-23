import React from 'react';
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
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                </div>
              );
            })}
          </form>
        )}
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose} type="button">Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant={isDeleteConfirm ? 'destructive' : 'default'}
            type="button"
          >
            {isDeleteConfirm ? 'Delete' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
