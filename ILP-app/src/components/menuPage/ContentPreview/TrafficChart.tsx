const TrafficChart = () => {
  // Данные пропускной способности за 24 часа (МБ/с)
  const values = [45, 62, 58, 70, 89, 112, 135, 148, 155, 160, 170, 185, 190, 178, 165, 150, 140, 130, 125, 115, 100, 85, 70, 60];
  const height = 100;
  const width = 600;
  const step = width / (values.length - 1);
  const maxY = 200;

  const pathData = values.map((v, i) => {
    const x = i * step;
    const y = height - (v / maxY) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height + 30}`} style={{ width: '100%', height: 'auto' }} className="chart-svg">
      {/* Сетка Y */}
      {[0, 50, 100, 150, 200].map((label) => {
        const y = height - (label / maxY) * height;
        return (
          <g key={label}>
            <line x1="0" y1={y} x2={width} y2={y} stroke="#2a2e3a" strokeDasharray="3 3" strokeWidth="0.8" />
            <text x="0" y={y - 3} fill="#5a687c" fontSize="8">{label}</text>
          </g>
        );
      })}
      {/* Линия данных */}
      <path d={pathData} fill="none" stroke="#2f6ef0" strokeWidth="2" strokeLinecap="round" />
      {/* Заливка под графиком */}
      <defs>
        <linearGradient id="tunnelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f6ef0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2f6ef0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathData} L ${width} ${height} L 0 ${height} Z`} fill="url(#tunnelGrad)" />
      
      {/* Метки оси X (часы) */}
      {[0, 4, 8, 12, 16, 20].map(hour => {
        const x = (hour / 24) * width;
        return (
          <text key={hour} x={x} y={height + 14} fill="#5a687c" fontSize="8">
            {hour}:00
          </text>
        );
      })}
    </svg>
  );
};

export default TrafficChart;