import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Currency, DollarSign } from "lucide-react";

export function MonthRevenueCard(){

  const { data: monthRevenue } = useQuery({
    queryFn: getMonthRevenue,
    queryKey: ['metrics', 'month-revenue'],
  })

  return(
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Receita Total (Mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1 " >
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>

            <p className="text-sm text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span> em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    {monthRevenue.diffFromLastMonth}%
                  </span> em relação ao mês passado
                </>
              )}
            </p>
            
          </>
        )}
      </CardContent>
    </Card>
  )
}