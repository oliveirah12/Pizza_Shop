import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogTitle } from "@radix-ui/react-dialog";


export interface OrderDetailsProps{}

export function OrderDetails(){
  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 1241412412</DialogTitle>
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
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Xabéu dos Santos
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (19) 99999-9999
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                xabeudossantos@gmail.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Realizado há</TableCell>
              <TableCell className="flex justify-end">
                3 minutos
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
            <TableRow>
              <TableCell>Pizza de Brócolis</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 80,00</TableCell>
              <TableCell className="text-right">R$ 160,00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Pizza de Mussarela</TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">R$ 50,00</TableCell>
              <TableCell className="text-right">R$ 50,00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total do Pedido</TableCell>
              <TableCell className="text-right font-medium">R$ 210,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>


      </div>
    </DialogContent>
  )
}