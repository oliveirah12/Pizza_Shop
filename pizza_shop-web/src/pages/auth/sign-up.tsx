import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { registerRestaurant } from "@/api/register-restaurant"



const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp(){

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>()
  const navigate = useNavigate()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp(data: SignUpForm) {
    
    try{
      console.log(data)
      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      })

      toast.success('Restaurante cadastrado!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`)
        }
      })
    }catch{
      toast.error('Erro ao cadastrar restaurante')
    }
    
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <title>Pizza Shop | Cadastro</title>

      <div className="p-8">
        <Button variant={"ghost"} asChild className="absolute right-8 top-8">
          <Link  to='/sign-in' >
            Fazer Login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do seu Restaurante</Label>
              <Input id="restaurantName" type="text" {...register('restaurantName')}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input id="managerName" type="text" {...register('managerName')}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')}/>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Seu Celular</Label>
              <Input id="phone" type="tel" {...register('phone')}/>
            </div>

            
            <Button disabled={isSubmitting} className="w-full cursor-pointer" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos <br />{' '} 
              <a className="underline" href=""> 
                Termos de Serviço 
              </a> {' '}
              e {' '}
              <a className="underline" href="">
                Políticas de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}