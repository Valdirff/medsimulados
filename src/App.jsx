import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExamDashboard } from './pages/ExamDashboard';
import { Simulator } from './pages/Simulator';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ExamDashboard />} />
          <Route path="/simulador/:examId" element={<Simulator />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
