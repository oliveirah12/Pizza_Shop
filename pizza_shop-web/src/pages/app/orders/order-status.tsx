

type OrderStatus =
  | "pending" 
  | "canceled" 
  | "processing" 
  | "delivering" 
  | "delivered"

interface OrderStatusProps{
  status: OrderStatus,
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  delivering: 'Entregando',
  processing: 'Em preparo',
  canceled: 'Cancelado',
  delivered: 'Entregue',
}

export function OrderStatus({ status }: OrderStatusProps){
  return(
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {['delivering', 'processing'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      
      <span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
    </div>
  )
}