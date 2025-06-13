import { Helmet } from "react-helmet-async";




export function Orders(){
  return(
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2.5"></div>
      </div>
      <div></div>
    </>
  )
}