import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant, type GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
}) 

type StoreProfileSchema = z.infer<typeof storeProfileSchema>


export function StoreProfileDialog(){

  const queryClient = useQueryClient()

  const { data: managedRestaurant} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,

  })


  const {register, handleSubmit, formState: {isSubmitting} } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    }
  })

  function updateManagedRestaurantCache({ name, description }: StoreProfileSchema ){
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])
      
    if(cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'],{
        ...cached, 
        name, 
        description
      })
    }

    return { cached }

  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}){
      const { cached } = updateManagedRestaurantCache({name, description})

      return { previouProfile: cached }
    },
    onError(_error, _variables, context) {
      if(context?.previouProfile){
        updateManagedRestaurantCache(context.previouProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema){
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description ?? '',
      })

      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }

  return(
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu restaurante visíveis aos seus clientes
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea className="col-span-3" id="description" {...register("description")} />
          </div>
          
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting} variant="success">Salvar</Button>
        </DialogFooter>
      </form>

    </DialogContent>
  )
}