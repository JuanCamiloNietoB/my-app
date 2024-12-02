
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GachaPage from "./GachaPage";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "./App.css";

const LINK = "https://backend-api-mcp3.onrender.com/carts";

export default function App() {
  const [carts, setCarts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    images: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    fetch(LINK)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `${LINK}/${editingId}` : LINK;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ title: "", description: "", value: "", images: "" });
        setIsEditing(false);
        setEditingId(null);
        setIsFormVisible(false);
        return fetch(LINK).then((res) => res.json()).then(setCarts);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`${LINK}/${id}`, { method: "DELETE" })
      .then(() => setCarts(carts.filter((cart) => cart.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleEdit = (cart) => {
    setFormData(cart);
    setIsEditing(true);
    setEditingId(cart.id);
    setIsFormVisible(true);
  };

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/gacha">
            Mecánica Gacha
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsFormVisible(true)}
                  style={{ marginTop: "20px" }}
                >
                  Crear Carta
                </Button>
                <Dialog
                  open={isFormVisible}
                  onClose={() => setIsFormVisible(false)}
                >
                  <DialogTitle>
                    {isEditing ? "Editar Carta" : "Crear Nueva Carta"}
                  </DialogTitle>
                  <DialogContent>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Título"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        label="Descripción"
                        name="description"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        label="Valor"
                        name="value"
                        fullWidth
                        value={formData.value}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        label="Imagen (URL)"
                        name="images"
                        fullWidth
                        value={formData.images}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <DialogActions>
                        <Button onClick={() => setIsFormVisible(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                          {isEditing ? "Actualizar" : "Crear"}
                        </Button>
                      </DialogActions>
                    </form>
                  </DialogContent>
                </Dialog>

                <Typography variant="h4" gutterBottom>
                  Cartas Disponibles
                </Typography>
                <Grid container spacing={3}>
                  {carts.map((cart) => (
                    <Grid item xs={12} sm={6} md={4} key={cart.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={cart.images}
                          alt={cart.title}
                        />
                        <CardContent>
                          <Typography variant="h5">{cart.title}</Typography>
                          <Typography>{cart.description}</Typography>
                          <Typography>
                            <strong>Valor:</strong> {cart.value}
                          </Typography>
                          <Button
                            onClick={() => handleEdit(cart)}
                            color="primary"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => handleDelete(cart.id)}
                            color="secondary"
                          >
                            Eliminar
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={generateRandomNumber}
                  style={{ marginTop: "20px" }}
                >
                  Generar Número Aleatorio
                </Button>
                {randomNumber && (
                  <Typography variant="h6">
                    Número Generado: {randomNumber}
                  </Typography>
                )}
              </>
            }
          />
          <Route path="/gacha" element={<GachaPage cards={carts} />} />
        </Routes>
      </Container>
    </Router>
  );
}
