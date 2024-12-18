import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { fetchProducts, assignProductLocation } from '../../utils/apiClient';
import { Product, WarehouseRecord } from '../../interfaces/Product';

interface WarehouseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  selectedAssignment?: WarehouseRecord;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({
  open,
  onClose,
  onSubmit,
  selectedAssignment,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<WarehouseRecord>({
    ProductID: '',
    name: '',
    barcode: '',
    productCode: '',
    zone: '',
    shelf: '',
    rack: '',
    niche: ''
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    if (open) {
      loadProducts();
      if (selectedAssignment) {
        setFormData(selectedAssignment);
      } else {
        setFormData({
            ProductID: '',
            name: '',
            barcode: '',
            productCode: '',
            zone: '',
            shelf: '',
            rack: '',
            niche: ''
        });
      }
    }
  }, [open, selectedAssignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    if (selectedAssignment?.ProductID) {
        //edit assignment
        //await assignProductLocation(selectedAssignment.ProductID, formData);
      } else {
        await assignProductLocation(formData);
      }
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {selectedAssignment ? 'Editar Asignación de Producto' : 'Nueva Asignación de Producto'}
      </DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Producto"
          name="ProductID"
          value={formData.ProductID}
          onChange={handleChange}
          disabled={!!selectedAssignment}
        >
          {products.map((product) => (
            <MenuItem key={product.ProductID} value={product.ProductID}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Zona"
          name="zone"
          value={formData.zone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Estante"
          name="shelf"
          value={formData.shelf}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Rack"
          name="rack"
          value={formData.rack}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nicho"
          name="niche"
          value={formData.niche}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!formData.ProductID || !formData.zone || !formData.shelf || !formData.rack || !formData.niche}
        >
          {selectedAssignment ? 'Guardar Cambios' : 'Asignar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarehouseForm;
