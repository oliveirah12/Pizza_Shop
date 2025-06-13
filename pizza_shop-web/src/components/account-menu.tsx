import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenu, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";


export function AccountMenu(){
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className="flex items-center gap-2 select-none cursor-pointer">
          Pizza Shop

          <ChevronDown className="w-4 h-4"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-auto">
        
        <DropdownMenuLabel className="flex flex-col">
          <span>Matheus Oliveira</span>
          <span className="text-xs font-normal text-muted-foreground">
            matheus-homem2001@hotmail.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator/>

        <DropdownMenuItem className="cursor-pointer">
          <Building className="w-4 h-4 mr-2" />
          <span>Perfil da Loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sair</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}