import './style.css'
import { Link } from "react-router-dom";


export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
      <h2>FlowMoney</h2>
      <ul>
        
          <li>
            <Link to="/" className="links">
              <img src="./bar_grafico_sidebar.svg" alt="" />
              <p>Dashboard</p>
            </Link>
          </li>
        
        <li>
          <Link to="/entradas" className='links'>
          <img src="./arrow_up_sidebar.svg" alt="" />
          <p>Entradas</p>
          </Link>
        </li>
        <li>
          <Link to="/saidas" className='links'>
          <img src="./arrow_circle_down_sidebar.svg" alt="" />
          <p>Saídas</p>
          </Link>
        </li>
        <li>
          <img src="./add_circle_sidebar.svg" alt="" />
          <p>Cadastros</p>
        </li>
      </ul>
       </div>
    </nav>
  );
};