import React from 'react';
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  rows: any[];
  onEdit: (row: any) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<Props> = ({ columns, rows, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key}>{col.label}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(row.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
