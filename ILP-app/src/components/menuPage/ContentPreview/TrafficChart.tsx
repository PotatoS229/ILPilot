import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TrafficDataProps {
  data: Array<{
    timestamp: string;
    throughput: number;
    latency: number;
  }>;
  title: string;
  predictedPeak?: number;
}




const TrafficChart = ({ data, title, predictedPeak}: TrafficDataProps) => {

  return (
    <div className="chart-container">
      <div className="chart-title">
        <h3>{title}</h3>
        {predictedPeak && (
          <div className="badge badge-info">
            AI predicted peak: {predictedPeak} MB/s
          </div>
        )}
      </div>
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="timestamp" 
              stroke="#64748b" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#64748b" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              label={{ value: 'Throughput MB/s', angle: -90, position: 'insideLeft', fill: '#8b5cf6', fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#64748b" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              label={{ value: 'Latency (ms)', angle: 90, position: 'insideRight', fill: '#06b6d4', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#13131a', 
                border: '1px solid #334155', 
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend 
              wrapperStyle={{ color: '#94a3b8', fontSize: '12px', paddingTop: '16px' }}
              iconType="circle"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="throughput" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={false}
              name="Throughput MB/s"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="latency" 
              stroke="#06b6d4" 
              strokeWidth={2}
              dot={false}
              name="Latency (ms)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
        Real-time traffic (WebSocket + Prometheus)
      </div>
    </div>
  );
};

export default TrafficChart;