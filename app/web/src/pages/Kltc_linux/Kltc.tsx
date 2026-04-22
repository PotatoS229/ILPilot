import './Kltc.css';
import {Link} from 'react-router-dom'
import MenuButton from '../../components/MenuButton/MenuButton.tsx'
import ThemeToggle from '../../components/themes/themes.tsx'

const KltcPage = () => {
    return (
    <div className="dashboard-card">
        <ThemeToggle></ThemeToggle>
        <div className="welcome-header">
            <h1>⚙️ Панель управления</h1>
            <p>UDPilot • выберите модуль для настройки</p>
        </div>
        <div className="main-layout">

            <aside className="menu-aside">
                <h2>📋 Меню возможностей</h2>
                <div className="menu-grid">

                    <Link 
                        to="/menu" 
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuButton index={1} name={"⚙️ Docker"}></MenuButton>
                    </Link>

                    <Link 
                        to="/kltc" 
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuButton index={2} name={"🛠 kltc"}></MenuButton>
                    </Link>

                    <MenuButton index={3} name={"🚀 UDP-тюнинг"}></MenuButton>

                    <MenuButton index={4} name={"📊 Визуализация в реальном времени"}></MenuButton>

                    <MenuButton index={5} name={"📋 Логи"}></MenuButton>

                    <MenuButton index={6} name={"🔧 Настройки"}></MenuButton>
                    
                    <a 
                        href="https://t.me/@PotatoS229" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuButton index={7} name={"💬 Telegram"} />
                    </a>

                    <a 
                        href="https://github.com/PotatoS229/UDPilot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuButton index={8} name={"⭐ Поставить звезду на GitHub"} />
                    </a>
                </div>
            </aside>


            <div className="content-preview">
                <h3>OS</h3>
                <div className="os-buttons-container">
                    <button className="os-btn windows-btn">
                        <span className="os-icon">🪟</span>
                        <span className="os-name">Windows</span>
                        <span className="os-version">11/10/8</span>
                    </button>
                    <button className="os-btn linux-btn">
                        <span className="os-icon">🐧</span>
                        <span className="os-name">Linux</span>
                        <span className="os-version">Ubuntu/Debian/CentOS</span>
                    </button>
                </div>
            </div>
        </div>


        <div className="footer-links">
            <span>© 2025 UDPilot</span>
            <span>
                <Link to='/auth'>🔄 Сменить профиль</Link> • <Link to="/">Настройки</Link>
            </span>
        </div>
    </div>
    )
}

export default KltcPage;