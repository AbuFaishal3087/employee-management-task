// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';
import AddEditEmployee from './components/AddEditEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/edit/:id" element={<AddEditEmployee />} />
        <Route path="/add" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
