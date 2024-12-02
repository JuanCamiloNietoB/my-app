/*import logo from './logo.svg';
import './App.css';


import React, { useState, useEffect } from "react";

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

  // Fetch data on component mount
  useEffect(() => {
    fetch(LINK)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or update a cart
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `${LINK}/${editingId}` : LINK;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ title: "", description: "", value: "", images: "" });
        setIsEditing(false);
        setEditingId(null);
        return fetch(LINK).then((res) => res.json()).then(setCarts);
      })
      .catch((err) => console.error(err));
  };

  // Delete a cart
  const handleDelete = (id) => {
    fetch(`${LINK}/${id}`, { method: "DELETE" })
      .then(() => setCarts(carts.filter((cart) => cart.id !== id)))
      .catch((err) => console.error(err));
  };

  // Edit a cart
  const handleEdit = (cart) => {
    setFormData(cart);
    setIsEditing(true);
    setEditingId(cart.id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
      <h1>{isEditing ? "Editar" : "Crear"} Carta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
      </form>

      <h2>Cartas</h2>
      <div className="card-grid">
        {carts.map((cart) => (
          <div key={cart.id} className="card">
            <img src={cart.images} alt={cart.title} />
            <h3>{cart.title}</h3>
            <p>{cart.description}</p>
            <p><strong>Valor:</strong> {cart.value}</p>
            <button onClick={() => handleEdit(cart)}>Editar</button>
            <button onClick={() => handleDelete(cart.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
      </header>
    </div>
    
  );
}
*/
/*
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GachaPage from "./GachaPage"; // Página de la mecánica gacha
import React, { useState, useEffect } from "react";
import './App.css';
import logo from './logo.svg';

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
  const [isFormVisible, setIsFormVisible] = useState(false); // Nuevo estado

  // Fetch data on component mount
  useEffect(() => {
    fetch(LINK)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or update a cart
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `${LINK}/${editingId}` : LINK;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ title: "", description: "", value: "", images: "" });
        setIsEditing(false);
        setEditingId(null);
        setIsFormVisible(false); // Oculta el formulario después de enviar
        return fetch(LINK).then((res) => res.json()).then(setCarts);
      })
      .catch((err) => console.error(err));
  };

  // Delete a cart
  const handleDelete = (id) => {
    fetch(`${LINK}/${id}`, { method: "DELETE" })
      .then(() => setCarts(carts.filter((cart) => cart.id !== id)))
      .catch((err) => console.error(err));
  };

  // Edit a cart
  const handleEdit = (cart) => {
    setFormData(cart);
    setIsEditing(true);
    setEditingId(cart.id);
    setIsFormVisible(true); // Muestra el formulario para editar
  };

  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav>
            <Link to="/">Inicio</Link> | <Link to="/gacha">Mecánica Gacha</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={

        <div className="container">
        // aqui iva h1
          <button onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? "Cerrar Formulario" : "Crear Carta"}
          </button>
          {isFormVisible && (
            <form onSubmit={handleSubmit}>
              <h2>{isEditing ? "Editar" : "Crear"} Carta</h2>
              <div>
                <label>Título:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Valor:</label>
                <input
                  type="text"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Imagen:</label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>
            </form>
          )}
          <h1>Cartas</h1>

          <div className="card-grid">
            {carts.map((cart) => (
              <div key={cart.id} className="card">
                <img src={cart.images} alt={cart.title} />
                <h3>{cart.title}</h3>
                <p>{cart.description}</p>
                <p><strong>Valor:</strong> {cart.value}</p>
                <button onClick={() => handleEdit(cart)}>Editar</button>
                <button onClick={() => handleDelete(cart.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
        />
            <Route path="/gacha" element={<GachaPage />} />
          </Routes>
      </header>
    </div>
    </Router>
  );
}
*/
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './App.css';
import logo from './logo.svg';
import GachaPage from "./GachaPage"; // Página de la mecánica gacha

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
  const [isFormVisible, setIsFormVisible] = useState(false); // Controla visibilidad del formulario

  // Fetch data on component mount
  useEffect(() => {
    fetch(LINK)
      .then((res) => res.json())
      .then((data) => setCarts(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or update a cart
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing ? `${LINK}/${editingId}` : LINK;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ title: "", description: "", value: "", images: "" });
        setIsEditing(false);
        setEditingId(null);
        setIsFormVisible(false); // Oculta el formulario después de enviar
        return fetch(LINK).then((res) => res.json()).then(setCarts);
      })
      .catch((err) => console.error(err));
  };

  // Delete a cart
  const handleDelete = (id) => {
    fetch(`${LINK}/${id}`, { method: "DELETE" })
      .then(() => setCarts(carts.filter((cart) => cart.id !== id)))
      .catch((err) => console.error(err));
  };

  // Edit a cart
  const handleEdit = (cart) => {
    setFormData(cart);
    setIsEditing(true);
    setEditingId(cart.id);
    setIsFormVisible(true); // Muestra el formulario para editar
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <Link to="/">Inicio</Link> | <Link to="/gacha">Mecánica Gacha</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <button onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? "Cerrar Formulario" : "Crear Carta"}
                  </button>
                  {isFormVisible && (
                    <form onSubmit={handleSubmit}>
                      <h2>{isEditing ? "Editar" : "Crear"} Carta</h2>
                      <div>
                        <label>Título:</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Descripción:</label>
                        <input
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Valor:</label>
                        <input
                          type="text"
                          name="value"
                          value={formData.value}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label>Imagen:</label>
                        <input
                          type="text"
                          name="images"
                          value={formData.images}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="submit">
                        {isEditing ? "Actualizar" : "Crear"}
                      </button>
                    </form>
                  )}
                  <h1>Cartas</h1>
                  <div className="card-grid">
                    {carts.map((cart) => (
                      <div key={cart.id} className="card">
                        <img src={cart.images} alt={cart.title} />
                        <h3>{cart.title}</h3>
                        <p>{cart.description}</p>
                        <p>
                          <strong>Valor:</strong> {cart.value}
                        </p>
                        <button onClick={() => handleEdit(cart)}>Editar</button>
                        <button onClick={() => handleDelete(cart.id)}>
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="/gacha" element={<GachaPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

