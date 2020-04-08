import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarComponent from "./Navbar/NavbarComponent";
import LoginForm from "./Login/LoginForm";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <LoginForm />
    </div>
  );
}

export default App;
