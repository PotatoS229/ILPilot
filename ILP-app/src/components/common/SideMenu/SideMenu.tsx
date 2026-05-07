
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Network, Shield, Brain, Server, FileText,
  Activity, TrendingUp, Lock, Sparkles
} from 'lucide-react';
import './SideMenu.css';

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, section: 'main', path: '/menu' },
  { id: 'tunnels', name: 'Tunnels & Mesh', icon: Network, section: 'main', path: '/kltc' },
  { id: 'vault', name: 'Zero Trust & Vault', icon: Shield, section: 'security', path: '/' },
  { id: 'forecasting', name: 'AI Forecasting', icon: Brain, section: 'insights', path: '/' },
  { id: 'cluster', name: 'HA Cluster', icon: Server, section: 'infrastructure', path: '/' },
  { id: 'audit', name: 'Audit & SOC2', icon: FileText, section: 'compliance', path: '/' },
];

const sections = {
  main: { label: 'MAIN', icon: Activity },
  security: { label: 'SECURITY', icon: Lock },
  insights: { label: 'INSIGHTS', icon: TrendingUp },
  infrastructure: { label: 'INFRASTRUCTURE', icon: Server },
  compliance: { label: 'COMPLIANCE', icon: FileText },
};

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем активный пункт по текущему пути
  const activePage = menuItems.find(item => item.path === location.pathname)?.id || 'dashboard';

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    const section = item.section;
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {/* <div className="logo-wrapper">
        </div> */}
        <div style={{ fontSize: '0.7rem', color: 'var(--text-gray-500)', marginTop: '0.5rem' }}>
          Enterprise · Zero Trust Mesh
        </div>
      </div>

      <div className="sidebar-nav">
        {Object.entries(groupedItems).map(([section, items]) => {
          const SectionIcon = sections[section as keyof typeof sections]?.icon;
          return (
            <div key={section} className="nav-section">
              <div className="nav-label">
                {SectionIcon && <SectionIcon size={10} style={{ display: 'inline', marginRight: '4px' }} />}
                {' '}{sections[section as keyof typeof sections]?.label || section.toUpperCase()}
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                    {item.id === 'forecasting' && !isActive && (
                      <span className="notification-badge">AI</span>
                    )}
                    {item.id === 'audit' && !isActive && (
                      <span className="notification-badge" style={{ background: 'var(--accent-green)' }}>NEW</span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            <Sparkles size={16} />
          </div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">Platform Owner</div>
          </div>
          <div className="status-indicator" />
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.7rem', textAlign: 'center', color: 'var(--text-gray-500)' }}>
          JWT + 2FA Protected
        </div>
      </div>
    </aside>
  );
};

export default SideMenu;