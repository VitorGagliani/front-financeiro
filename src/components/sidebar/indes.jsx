import './style.css'


export const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-content">
      <h2>FlowMoney</h2>
      <ul>
        <li>Dashboard</li>
        <li>Entradas</li>
        <li>Saídas</li>
        <li>Cadastros</li>
      </ul>
       </div>
    </nav>
  );
};