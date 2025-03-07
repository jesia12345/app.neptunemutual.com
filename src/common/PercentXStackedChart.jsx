import {
  Chart as ChartJS,
  defaults,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'
import { each } from 'chart.js/helpers'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title)

defaults.font.family = 'Poppins, sans-serif'

export const PercentXStackedChart = ({ data }) => {
  return (
    <>
      <div className='w-full'>
        <Bar
          data={data}
          height={100}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                grid: {
                  drawBorder: false
                },
                ticks: {
                  stepSize: 20,
                  callback: (val) => `${val * 100}%`
                }
              },
              y: {
                display: false,
                stacked: true,
                beginAtZero: true,
                grid: { display: false }
              }
            },
            events: [
              /* "mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend" */
            ],
            animation: {
              onComplete: function (self) {
                const chartInstance = self.chart
                const ctx = chartInstance.ctx
                ctx.textAlign = 'center'
                ctx.font = '14px Poppins'
                ctx.fillStyle = '#fff'
                let prevX = 0

                each(
                  self.chart.data.datasets.forEach(function (dataset, i) {
                    const meta = chartInstance.getDatasetMeta(i)

                    each(
                      meta.data.forEach(function (bar, index) {
                        const _data = dataset.data[index]
                        const start = prevX
                        const end = bar.x

                        if (!_data) return

                        ctx.fillText(
                          `${(_data * 100).toFixed(2)}%`,
                          (start + end) / 2,
                          bar.y + 4
                        )
                        prevX = bar.x
                      }),
                      self
                    )
                  }),
                  self
                )
              }
            },
            plugins: {
              legend: false,
              tooltip: false
            }
          }}
          data-testid='percent-x-stacked-chart'
        />
      </div>
    </>
  )
}
