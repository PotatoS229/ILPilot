import './Menu.css';
import {Link} from 'react-router-dom'
import MenuButton from '../../components/MenuButton/MenuButton.tsx'
import ThemeToggle from '../../components/themes/themes.tsx'

const MenuPage = () => {
    return (
    <div className="dashboard-card">
        <ThemeToggle></ThemeToggle>
        <div className="welcome-header">
            <h1>⚙️ Панель управления</h1>
            <p>ILPilot • выберите модуль для настройки</p>
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
                        href="https://github.com/PotatoS229/ILPilot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        <MenuButton index={8} name={"⭐ Поставить звезду на GitHub"} />
                    </a>
                </div>
            </aside>


            <div className="content-preview">
                <div className="placeholder-icon">📊</div>
                <h3>Сводка по выбранному модулю</h3>
                <p>Здесь появится интерфейс настройки, визуализация или результаты работы модуля, выбранного слева. Используйте меню для навигации.</p>
                

                <div className="mock-stat">
                    <div className="mock-stat-item">
                        <div className="label">активные агенты</div>
                        <div className="value">18</div>
                    </div>
                    <div className="mock-stat-item">
                        <div className="label">задач в очереди</div>
                        <div className="value">7</div>
                    </div>
                    <div className="mock-stat-item">
                        <div className="label">поверхность</div>
                        <div className="value">143</div>
                    </div>
                </div>

            </div>
        </div>


        <div className="footer-links">
            <span>© 2025 ILPilot</span>
            <span>
                <Link to='/auth'>🔄 Сменить профиль</Link> • <Link to="/">Настройки</Link>
            </span>
        </div>
    </div>
    )
}

export default MenuPage;


  