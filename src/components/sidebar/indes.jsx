import './style.css'


export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
      <h2>FlowMoney</h2>
      <ul>
        <li>
          <img src="./bar_grafico_sidebar.svg" alt="" />
          <p>Dashboard</p>
          </li>
        <li>
          <img src="./arrow_up_sidebar.svg" alt="" />
          <p>Entradas</p>
        </li>
        <li>
          <img src="./arrow_circle_down_sidebar.svg" alt="" />
          <p>Saídas</p>
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