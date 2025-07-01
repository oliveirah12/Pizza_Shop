import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import {ResponsiveContainer, PieChart, Pie, Cell} from "recharts"
import colors from "tailwindcss/colors"


const data = [
  {name: 'Peperoni', amount: 10},
  {name: 'Calabresa', amount: 50},
  {name: 'Marguerita', amount: 17},
  {name: 'Milho c/ catupiry', amount: 60},
  {name: 'Atum', amount: 36},
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart(){
  return (
    <Card className="col-span-3">
      <CardHeader className=" pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos Populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground"/>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart data={ data } style={{ fontSize: 12 }}>
            <Pie 
              data={data} 
              dataKey="amount" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                if (typeof index !== "number" || typeof midAngle !== "number") return null

                const RADIAN = Math.PI / 180
                const radius = 6 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].name.length > 6
                      ? data[index].name.substring(0, 6).concat('...')
                      : data[index].name}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((_, index) => {
                return(
                  <Cell key={`cell-${index}`} fill={COLORS[index]}  className="hover:opacity-70 stroke-background"/>
                )
              })}
            </Pie>
            
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}