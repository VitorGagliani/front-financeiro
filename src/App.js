import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/sidebar/indes';
import { Dashboard } from './components/dashboard';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
