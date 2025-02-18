import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Unit } from "@/types/unitTypes";
import { Textarea } from "../ui/textarea";
import ApiHandler from "@/services/ApiHandler";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  empresa: z.string().min(2, { message: "Empresa debe tener al menos 2 caracteres." }).optional(),
  fecha_visita: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha Visita debe ser una fecha valida",
  }),
  direccion: z.string().min(5, { message: "Dirección debe contener dirección exacta" }),

  precio: z.coerce.number().min(1, { message: "Precio debe ser mayor a 0" }),
  metraje: z.coerce.number().min(1, { message: "Metraje debe ser mayor a 0." }),
  dormitorios: z.coerce.number().min(0, { message: "Dormitorios debe ser mayor a 0." }),
  banos: z.coerce.number().min(0, { message: "Baños debe ser mayor a 0." }),
  comentarios: z
    .string()
    .max(500, { message: "Comentario no puede exceder 500 carateres" })
    .optional(),
  fecha_entrega: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Fecha de Entrega debe ser una fecha valida.",
    }),
  estado: z.enum(["Construido", "Planos"], {
    message: "Estado debe ser'Construido' o 'Planos'.",
  }),
  // imagen: z.string().url({ message: "Imagen must be a valid URL." }).optional(),
  // asesor_id: z.coerce.number().min(1, { message: "Asesor ID must be greater than 0." }).optional(),
});

export const DialogComp = () => {
  //********************************* USESTATE *********************************/

  //********************************* HOOKS *********************************/

  //********************************* METHODS *********************************/
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empresa: "",
      fecha_visita: new Date().toISOString().split("T")[0], // Default to today
      direccion: "",
      precio: 1, // Ensure numbers start with a value (0 instead of undefined)
      metraje: 10,
      dormitorios: 1,
      banos: 1,
      comentarios: "",
      fecha_entrega: "", // Empty string instead of undefined for date
      estado: "Construido", // Set default value
      // imagen: "https://www.alvarobeltran.dev",
      // asesor_id: 1, // Start with a valid number
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const unitData: Unit = {
      id: null,
      empresa: values.empresa,
      fecha_visita: new Date(values.fecha_visita),
      direccion: values.direccion,
      precio: values.precio,
      metraje: values.metraje,
      dormitorios: values.dormitorios,
      banos: values.banos,
      comentarios: values.comentarios,
      fecha_entrega: new Date(values.fecha_entrega!),
      estado: values.estado, // Set default value
      // imagen: values.imagen,
      // asesor_id: values.asesor_id,
    };
    const response = ApiHandler.getInstance().saveNewVisit(unitData);
  }

  //********************************* USEEFFECT *********************************/
  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Agregar Visita</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Agregar nueva visita</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='empresa'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Empresa</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fecha_visita'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Fecha Visita</FormLabel>
                    <FormControl>
                      <Input type='date' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='direccion'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Dirección</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' {...field} ref={field.ref} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='precio'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Precio</FormLabel>
                    <FormControl>
                      <Input type='number' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='metraje'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Metraje</FormLabel>
                    <FormControl>
                      <Input type='number' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='dormitorios'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Dormitorios</FormLabel>
                    <FormControl>
                      <Input type='number' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='banos'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Baños</FormLabel>
                    <FormControl>
                      <Input type='number' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='comentarios'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Comentarios</FormLabel>
                    <FormControl>
                      <Textarea className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='fecha_entrega'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Fecha de Entrega</FormLabel>
                    <FormControl>
                      <Input type='date' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='estado'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Estado</FormLabel>
                    <FormControl>
                      <select
                        className='col-span-3 border border-gray-300 rounded-md p-2'
                        {...field}
                      >
                        <option value='Construido'>Construido</option>
                        <option value='Planos'>Planos</option>
                      </select>
                    </FormControl>
                    <FormMessage className='col-span-4 flex justify-end' />
                  </FormItem>
                )}
              />
              <Button type='submit' onClick={() => form.handleSubmit((data) => console.log(data))}>
                {" "}
                Guardar
              </Button>
            </form>
          </Form>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
