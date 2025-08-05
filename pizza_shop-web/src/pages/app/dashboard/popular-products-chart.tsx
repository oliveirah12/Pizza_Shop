import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import {ResponsiveContainer, PieChart, Pie, Cell} from "recharts"
import colors from "tailwindcss/colors"


const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart(){

  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })

  return (
    <Card className="col-span-3">
      <CardHeader className=" pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Produtos Populares</CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground"/>
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart data={ popularProducts } style={{ fontSize: 12 }}>
              <Pie 
                data={popularProducts} 
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
                      {popularProducts[index].product.length > 6
                        ? popularProducts[index].product.substring(0, 6).concat('...')
                        : popularProducts[index].product}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {popularProducts.map((_, index) => {
                  return(
                    <Cell key={`cell-${index}`} fill={COLORS[index]}  className="hover:opacity-70 stroke-background"/>
                  )
                })}
              </Pie>
              
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}