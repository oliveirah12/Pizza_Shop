import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard(){
  return(
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Pedidos (Dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1 " >
        <span className="text-2xl font-bold tracking-tight">
          15
        </span>
        <p className="text-sm text-muted-foreground">
          <span className="text-red-600 dark:text-red-400">-1%</span> em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}