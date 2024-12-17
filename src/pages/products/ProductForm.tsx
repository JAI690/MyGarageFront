import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { createProduct, updateProduct } from '../../utils/apiClient';
import { Product, ProductInput } from '../../interfaces/Product';

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  selectedProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose, onSubmit, selectedProduct }) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    barcode: '',
    productCode: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || '',
        barcode: selectedProduct.barcode || '',
        productCode: selectedProduct.productCode || '',
      });
    } else {
      setFormData({ name: '', barcode: '', productCode: '' });
    }
  }, [selectedProduct]);

  const handleChange = (field: keyof ProductInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (selectedProduct?.ProductID) {
      await updateProduct(selectedProduct.ProductID, formData);
    } else {
      await createProduct(formData);
    }
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedProduct ? 'Editar Producto' : 'Crear Producto'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre del Producto"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <TextField
          label="Código de Barras"
          fullWidth
          margin="normal"
          value={formData.barcode}
          onChange={(e) => handleChange('barcode', e.target.value)}
        />
        <TextField
          label="Código del Producto"
          fullWidth
          margin="normal"
          value={formData.productCode}
          onChange={(e) => handleChange('productCode', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
