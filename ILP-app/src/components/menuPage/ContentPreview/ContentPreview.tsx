import TrafficChart from './TrafficChart';
// import WelcomeHeader from '../../common/WelcomeHeader/WelcomeHeader'

const ContentPreview = () => {
  return (
    <div className="content-preview">
      {/* < WelcomeHeader name="Menu Page" label="123"/> */}
      {/* Две главные метрики: туннели + пропускная способность */}
      <div className="metrics-panel">
        <div className="metric-tile">
          <div className="metric-label">Активные туннели</div>
          <div className="metric-number">24 / 32</div>
          <div className="metric-footnote">Автосетка · 99,98% uptime</div>
        </div>
        <div className="metric-tile">
          <div className="metric-label">Глобальная пропускная способность</div>
          <div className="metric-number">187,4 МБ/с</div>
          <div className="metric-footnote">Прогноз ИИ: 210 МБ/с</div>
        </div>
      </div>

      {/* Информация о хранилище и регионах */}
      <div className="status-bar">
        <div className="status-chip">
          🔐 Повернуто 2 часа назад · <strong>Пост-квантовый + AES-256</strong>
        </div>
        <div className="status-chip">
          🌍 <strong>АКТИВНЫЙ-АКТИВНЫЙ</strong> · 3 региона · 99,98%
        </div>
      </div>

      {/* График */}
      <div className="chart-area">
        <div className="chart-head">
          <span>📈 Анализ трафика в реальном времени</span>
          <span>📊 Прогнозируемая ИИ скорость: 210 МБ/с</span>
        </div>
        <TrafficChart />
      </div>

      {/* Латенси / задержка — как на втором изображении */}
      <div className="latency-block">
        <div className="latency-item">
          📍 13:00<br />
          Задержка: <span className="latency-value">63.66 мс</span><br />
          Пропускная: <span className="latency-value">86.80 МБ/с</span>
        </div>
        <div className="latency-item">
          📈 Латент (мс)<br />
          █████░░ <span className="latency-value">40</span><br />
          ████████░░ <span className="latency-value">60</span><br />
          ██████████ <span className="latency-value">80</span>
        </div>
      </div>

      {/* Логи и безопасность (как на втором изображении снизу) */}
      <div className="status-bar" style={{ marginTop: '1rem' }}>
        <div className="status-chip">📋 Логи: аудиты SOC2</div>
        <div className="status-chip">👤 Администратор · Владелец платформы</div>
        <div className="status-chip">🔐 JWT + 2FA защита</div>
      </div>
    </div>
  );
};

export default ContentPreview;