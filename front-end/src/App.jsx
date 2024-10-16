import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";

// Styled components
const StyledPaper = styled(Paper)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: calc(100vh);
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;

  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #1976d2;
    }
  }
`;

const StyledCard = styled(Card)`
  width: 100%;
  margin-top: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
  padding: 8px 16px;
`;

const StyledTableHead = styled(TableHead)`
  background-color: #f5f5f5;

  & th {
    font-weight: 600;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const StyledDialogContent = styled(DialogContent)`
  min-width: 400px;
  padding: 24px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginCard = styled(Card)`
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loginData, setLoginData] = useState({ email: "default@example.com", password: "secauraeaaaaapassaword123" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    height: 0,
    length: 0,
    width: 0,
  });
  const [editingProduct, setEditingProduct] =useState(null);
  const [token, setToken] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        setToken(data.user.token);
        setIsLoggedIn(true);
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: 'Login failed', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Login error', severity: 'error' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setProducts([]);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/api/v1/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error fetching products",
        severity: "error",
      });
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await fetch("http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
        setNewProduct({
          name: "",
          description: "",
          height: 0,
          length: 0,
          width: 0,
        });
        setOpenDialog(false);
        setSnackbar({
          open: true,
          message: "Product created successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error creating product",
        severity: "error",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    try {
      const response = await fetch(
        `http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/api/v1/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingProduct),
        }
      );
      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
        setOpenEditDialog(false);
        setSnackbar({
          open: true,
          message: "Product updated successfully",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating product",
        severity: "error",
      });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://ec2-3-16-55-56.us-east-2.compute.amazonaws.com:3000/api/v1/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          fetchProducts();
          setSnackbar({
            open: true,
            message: "Product deleted successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error deleting product",
          severity: "error",
        });
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginContainer>
        <LoginCard>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Product Management Login
          </Typography>
          <p>Default user</p>
          <p>email: "default@example.com" password: "secauraeaaaaapassaword123" </p>
          <FormContainer onSubmit={handleLogin}>
            <StyledTextField
              required
              fullWidth
              label="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <StyledTextField
              required
              fullWidth
              label="Password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <StyledButton type="submit" fullWidth variant="contained">
              Sign In
            </StyledButton>
          </FormContainer>
        </LoginCard>
      </LoginContainer>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <StyledButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add New Product
          </StyledButton>
        </Box>

        <StyledPaper>
          <StyledTableContainer>
            <Table stickyHeader>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Height</TableCell>
                  <TableCell align="right">Length</TableCell>
                  <TableCell align="right">Width</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {products.map((product) => (
                  <StyledTableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell align="right">{product.height}</TableCell>
                    <TableCell align="right">{product.length}</TableCell>
                    <TableCell align="right">{product.width}</TableCell>
                    <TableCell>
                      <ActionContainer>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setEditingProduct(product);
                            setOpenEditDialog(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ActionContainer>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>

        {/* Create Product Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Product</DialogTitle>
          <StyledDialogContent>
            <StyledTextField
              autoFocus
              fullWidth
              label="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <StyledTextField
              fullWidth
              label="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <StyledTextField
              fullWidth
              label="Height"
              type="number"
              value={newProduct.height}
              onChange={(e) =>
                setNewProduct({ ...newProduct, height: Number(e.target.value) })
              }
            />
            <StyledTextField
              fullWidth
              label="Length"
              type="number"
              value={newProduct.length}
              onChange={(e) =>
                setNewProduct({ ...newProduct, length: Number(e.target.value) })
              }
            />
            <StyledTextField
              fullWidth
              label="Width"
              type="number"
              value={newProduct.width}
              onChange={(e) =>
                setNewProduct({ ...newProduct, width: Number(e.target.value) })
              }
            />
          </StyledDialogContent>
          <DialogActions>
            <StyledButton onClick={() => setOpenDialog(false)}>
              Cancel
            </StyledButton>
            <StyledButton onClick={handleCreateProduct} variant="contained">
              Create
            </StyledButton>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <StyledDialogContent>
            {editingProduct && (
              <>
                <StyledTextField
                  autoFocus
                  fullWidth
                  label="Name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />
                <StyledTextField
                  fullWidth
                  label="Description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                />
                <StyledTextField
                  fullWidth
                  label="Height"
                  type="number"
                  value={editingProduct.height}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      height: Number(e.target.value),
                    })
                  }
                />
                <StyledTextField
                  fullWidth
                  label="Length"
                  type="number"
                  value={editingProduct.length}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      length: Number(e.target.value),
                    })
                  }
                />
                <StyledTextField
                  fullWidth
                  label="Width"
                  type="number"
                  value={editingProduct.width}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      width: Number(e.target.value),
                    })
                  }
                />
              </>
            )}
          </StyledDialogContent>
          <DialogActions>
            <StyledButton onClick={() => setOpenEditDialog(false)}>
              Cancel
            </StyledButton>
            <StyledButton onClick={handleUpdateProduct} variant="contained">
              Update
            </StyledButton>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
