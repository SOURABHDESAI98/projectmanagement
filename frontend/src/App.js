import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from './Pages/loginPage';
import DashboardComponent from './Pages/dashboardPage';
import ProjectListComponent from './Pages/projectListPage';
import InsertProjectComponent from './Pages/projectInsertPage';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<LoginComponent />} />
        <Route path={'/dashboard'} element={<DashboardComponent />} />
        <Route path={'/project-listing'} element={<ProjectListComponent />} />
        <Route path={'/insert-project'} element={<InsertProjectComponent />} />
      </Routes>
    </div>
  );
}

export default App;
