import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ProductForm from './ProductForm';
import { fetchProducts, deleteProduct } from '../../utils/apiClient';
import { Product } from '../../interfaces/Product';

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    const response = await fetchProducts();
    console.log(response)
    setProducts(response as Product[]);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedProduct(null);
          setOpenDialog(true);
        }}
      >
        Crear Producto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Código de Barras</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.ProductID}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.barcode}</TableCell>
                <TableCell>{product.productCode}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedProduct(product);
                      setOpenDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.ProductID)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={loadProducts}
        selectedProduct={selectedProduct || undefined}
      />
    </Container>
  );
};

export default ProductsManagement;
