import { getMonthOrdersAmount } from "@/api/gat-month-orders-amount.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

export function MonthOrdersAmountCard(){


  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-order-amount'],
  })


  return(
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Pedidos (Mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1 " >
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    +{monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '} 
                  em relação ao mês passado
                </> 
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    {monthOrdersAmount.diffFromLastMonth}%
                  </span>{' '} 
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}