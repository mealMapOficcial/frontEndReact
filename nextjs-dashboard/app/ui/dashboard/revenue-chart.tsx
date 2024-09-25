import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const chartHeight = 350;

const dummyRevenue = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 800 },
  { month: 'Mar', revenue: 600 },
  { month: 'Apr', revenue: 900 },
  { month: 'May', revenue: 1100 },
  { month: 'Jun', revenue: 1300 },
  { month: 'Jul', revenue: 1000 },
  { month: 'Aug', revenue: 950 },
  { month: 'Sep', revenue: 1150 },
  { month: 'Oct', revenue: 1250 },
  { month: 'Nov', revenue: 1050 },
  { month: 'Dec', revenue: 1400 },
];

const yAxisLabels = [0, 500, 1000, 1500];
const topLabel = 1500;

export default function RevenueChart() {
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-orange-500 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {dummyRevenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-orange-500"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-white" />
          <h3 className="ml-2 text-sm text-white ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
