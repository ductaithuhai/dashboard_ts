import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/layout';
import Dashboard from './features/Dashboard';
import Users from './features/Users';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard />} />
            <Route path="/Users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
