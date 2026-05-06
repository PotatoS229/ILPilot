import { Link } from 'react-router-dom';

const menuItems = [
  { id: 1, name: "⚙️ Docker", internalPath: "/menu" },
  { id: 2, name: "🛠 kltc", internalPath: "/kltc" },
  { id: 3, name: "🚀 UDP-тюнинг", internalPath: "/kltc" },
  { id: 4, name: "📊 Визуализация в реальном времени", internalPath: "/kltc" },
  { id: 5, name: "📋 Логи", internalPath: "/kltc" },
  { id: 6, name: "🔧 Настройки", internalPath: "/kltc"},
  { id: 7, name: "💬 Telegram", externalUrl: "https://t.me/@PotatoS229" },
  { id: 8, name: "⭐ Поставить звезду на GitHub", externalUrl: "https://github.com/PotatoS229/ILPilot" },
];

/**
 * «Другой MenuButton» – теперь это просто функция, возвращающая размеченный div.
 * При желании можно заменить на <button> или поменять классы.
 */
const renderButton = (id: number, name: string) => (
  <div className="menu-btn" role="button">
    <span>{id}.</span>{name}
  </div>
);

const SideMenu = () => (
  <aside className="menu-aside">
    <h2>📋 Меню возможностей</h2>
    <div className="menu-grid">
      {menuItems.map((item) => {
        const button = renderButton(item.id, item.name);

        if (item.internalPath) {
          return (
            <Link key={item.id} to={item.internalPath} style={{ textDecoration: 'none' }}>
              {button}
            </Link>
          );
        }

        if (item.externalUrl) {
          return (
            <a key={item.id} href={item.externalUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              {button}
            </a>
          );
        }

        return button;
      })}
    </div>
  </aside>
);

export default SideMenu;