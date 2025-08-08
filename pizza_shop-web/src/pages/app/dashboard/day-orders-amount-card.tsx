import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrdersAmountCard(){

  const { data: dayOrdersAmount } = useQuery({
    queryFn: getDayOrdersAmount,
    queryKey: ['metrics', 'days-order-amount'],
  })

  return(
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Pedidos (Dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1 " >
        {dayOrdersAmount ? (
          <>
          <span className="text-2xl font-bold tracking-tight">
            {dayOrdersAmount.amount.toLocaleString('pt-BR')}
          </span>
          <p className="text-sm text-muted-foreground">
            {dayOrdersAmount.diffFromYesterday >= 0 ? (
              <>
                <span className="text-emerald-600 dark:text-emerald-400">
                  +{dayOrdersAmount.diffFromYesterday}%
                </span>{' '} 
                em relação a ontem
              </> 
            ) : (
              <>
                <span className="text-red-600 dark:text-red-400">
                  {dayOrdersAmount.diffFromYesterday}%
                </span>{' '} 
                em relação a ontem
              </>
            )}
          </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}