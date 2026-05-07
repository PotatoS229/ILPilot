import { Link } from 'react-router-dom';
import './PageFooter.css'

const PageFooter = () => (
  <div className="footer-links">
    <span>© 2025 ILPilot</span>
    <span>
      <Link to="/auth">🔄 Сменить профиль</Link> • <Link to="/">Настройки</Link>
    </span>
  </div>
);

export default PageFooter;