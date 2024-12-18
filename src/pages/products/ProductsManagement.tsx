import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ProductForm from './ProductForm';
import { fetchProducts, deleteProduct } from '../../utils/apiClient';
import { Product } from '../../interfaces/Product';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

  // Cargar productos
  const loadProducts = async () => {
    setLoading(true); // Inicia el estado de carga
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.ProductID);
      setProducts((prev) => prev.filter((p) => p.ProductID !== productToDelete.ProductID));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  // Filtrar productos
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery) ||
    String(product.productCode || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular los productos visibles en la página actual
  const visibleProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        sx={{ marginBottom: 2 }}
      >
        Agregar Producto
      </Button>

      {/* Buscador */}
      <TextField
        fullWidth
        label="Buscar productos"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        margin="normal"
        placeholder="Buscar por nombre, código de barras o código del producto"
      />

      {/* Indicador de carga */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tabla de productos */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Código de Barras</TableCell>
                  <TableCell>Código del Producto</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleProducts.map((product) => (
                  <TableRow key={product.ProductID}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.productCode}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          setProductToDelete(product);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
          />
        </>
      )}

      {/* Formulario de producto */}
      <ProductForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={loadProducts}
        selectedProduct={selectedProduct || undefined}
      />

      {/* Confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>¿Estás seguro de que deseas eliminar este producto?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
