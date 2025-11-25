import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/sidebar/indes';
import { Dashboard } from './components/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Entradas } from './components/entradas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/entradas" element={<Entradas />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
