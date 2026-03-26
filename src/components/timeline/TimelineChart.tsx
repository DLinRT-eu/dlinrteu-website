
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  AreaChart
} from 'recharts';
import { ProductDetails } from '@/types/productDetails';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TimelineChartProps {
  data: Array<{
    period: string;
    date: Date;
    count: number;
    products: ProductDetails[];
    [key: string]: any;
  }>;
  granularity: "monthly" | "quarterly" | "yearly";
  products: ProductDetails[];
  isCumulative: boolean;
  setIsCumulative: (value: boolean) => void;
}

const TimelineChart: React.FC<TimelineChartProps> = ({ 
  data, 
  granularity, 
  products,
  isCumulative,
  setIsCumulative
}) => {
  const categories = [...new Set(products.map(p => p.category))];
  
  const colors = [
    '#00A6D6', '#2563eb', '#dc2626', '#ea580c', '#65a30d', 
    '#7c3aed', '#db2777', '#0891b2', '#4338ca', '#059669'
  ];

  // Compute cumulative data
  const cumulativeData = useMemo(() => {
    let runningTotal = 0;
    const categoryTotals: Record<string, number> = {};
    
    return data.map(point => {
      const periodCount = point.count;
      runningTotal += periodCount;
      
      categories.forEach(cat => {
        categoryTotals[cat] = (categoryTotals[cat] || 0) + (point[cat] || 0);
      });
      
      return {
        ...point,
        count: runningTotal,
        periodCount, // Keep original count for tooltip
        ...Object.fromEntries(
          categories.map(cat => [cat, categoryTotals[cat] || 0])
        )
      };
    });
  }, [data, categories]);

  const chartData = isCumulative ? cumulativeData : data;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const tooltipData = payload[0]?.payload;
    if (!tooltipData) return null;

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {isCumulative ? (
          <>
            <p className="text-sm text-gray-600 mb-1">
              Total Products to Date: <span className="font-medium">{tooltipData.count}</span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Released This Period: <span className="font-medium">{tooltipData.periodCount}</span>
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-600 mb-2">
            Products Released: <span className="font-medium">{tooltipData.count}</span>
          </p>
        )}
        {tooltipData.products?.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-700">Released Products:</p>
            {tooltipData.products.slice(0, 5).map((product: ProductDetails, idx: number) => (
              <p key={idx} className="text-xs text-gray-600">
                • {product.name} ({product.company})
              </p>
            ))}
            {tooltipData.products.length > 5 && (
              <p className="text-xs text-gray-500">
                ... and {tooltipData.products.length - 5} more
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Cumulative Toggle */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <Switch
          id="cumulative-toggle"
          checked={isCumulative}
          onCheckedChange={setIsCumulative}
        />
        <Label htmlFor="cumulative-toggle" className="text-sm text-gray-600 cursor-pointer">
          Show Cumulative Growth
        </Label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A6D6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00A6D6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="period" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#00A6D6"
            strokeWidth={2}
            fill="url(#totalGradient)"
            name={isCumulative ? "Total Products" : "Products Released"}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Category breakdown chart */}
      {categories.length > 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            {isCumulative ? "Cumulative Releases by Category" : "Release Timeline by Category"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              {categories.map((category, index) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={category}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
