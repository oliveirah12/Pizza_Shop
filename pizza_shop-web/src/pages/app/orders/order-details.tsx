import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";



export interface OrderDetailsProps{
  orderId: string,
  open: boolean,
}

export function OrderDetails({ orderId, open }: OrderDetailsProps){


  const { data: order} = useQuery({
    queryKey:['order', orderId],
    queryFn: () => getOrderDetails({orderId}),
    enabled: open,

  })

  if(!order){
    return null
  }


  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <OrderStatus status={order.status} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.phone ?? 'Não informado'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                {order.customer.email}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há
              </TableCell>
              <TableCell className="flex justify-end"
                         title={new Date(order.createdAt).toLocaleString('pt-BR')}
              >
                {formatDistanceToNow(order.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>

        <Separator className="border-b-foreground h-1"/>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orderItems.map(item => {
                return(
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {(item.priceInCents / 100).toLocaleString('pt-Br',{
                        style:'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {((item.quantity * item.priceInCents) / 100).toLocaleString('pt-Br',{
                        style:'currency',
                        currency: 'BRL'
                      })}
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do Pedido</TableCell>
              <TableCell className="text-right font-medium">
                {(order.totalInCents / 100).toLocaleString('pt-Br',{
                  style:'currency',
                  currency: 'BRL'
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>


      </div>
    </DialogContent>
  )
}