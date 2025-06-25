import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthRevenueCard(){
  return(
    <Card>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Receita Total (Mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1 " >
        <span className="text-2xl font-bold tracking-tight">
          R$ 1248,60
        </span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-600 dark:text-emerald-400">+2%</span> em relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}