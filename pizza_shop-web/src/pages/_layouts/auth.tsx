import { Outlet } from "react-router-dom";
import { Pizza } from 'lucide-react'

export function AuthLayout() {
  return(
    <div className="min-h-screen grid grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground flex flex-col justify-between">

      <div className="flex items-center gap-3 text-lg font-medium text-foreground">
        <Pizza className="h-5 w-5" />
        <span className="font-semibold">pizza.shop</span>
      </div>

      <div className="text-sm">
        Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
      </div>
      
      </div>
      
      <div className="flex flex-col items-center justify-center relative">
        <Outlet />
      </div>
    </div>
  )
}