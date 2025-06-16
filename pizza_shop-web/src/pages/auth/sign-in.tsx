import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"



const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn(){

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try{
      console.log(data)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Opa deu bom', {
        action: {
          label: 'Reenviar',
          onClick: () =>{handleSignIn(data)}
        }
      })
    }catch{
      toast.error('Deu ruim')
    }
    
  }

  return (
    <>
      <Helmet title="Login" />
      <title>Pizza Shop | Login</title>

      <div className="p-8 ">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link  to='/sign-up' >
            Novo Estabelecimento
          </Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')}/>
            </div>
            
            <Button disabled={isSubmitting} className="w-full cursor-pointer" type="submit">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>

    </>
  )
}