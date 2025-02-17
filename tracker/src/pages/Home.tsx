import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "../styles/home.css";
import { Unit } from "@/types/unitTypes";
import { Textarea } from "@/components/ui/textarea";

const units: Unit[] = [
  {
    id: 1,
    empresa: "Constructora ABC",
    fecha_visita: new Date(),
    direccion: "Av. Principal 123, Ciudad",
    precio: 150000.5,
    metraje: 120.5,
    dormitorios: 3,
    banos: 2,
    estado: "Construido",
    asesor_id: 5,
    fecha_entrega: new Date(),
    comentarios: "Este es un comentario",
  },
  {
    id: 2,
    empresa: "Constructora ABC",
    fecha_visita: new Date(),
    direccion: "Av. Principal 123, Ciudad",
    precio: 150000.5,
    metraje: 120.5,
    dormitorios: 3,
    banos: 2,
    estado: "Construido",
    asesor_id: 5,
    fecha_entrega: new Date(),
    comentarios: "Este es un comentario",
  },
];

const headers = [
  { key: "empresa", label: "Empresa", width: "w-[200px]" },
  { key: "fecha_visita", label: "Visita", width: "w-[150px]" },
  { key: "direccion", label: "Dirección", width: "w-[250px]" },
  { key: "precio", label: "Precio", width: "w-[120px]" },
  { key: "metraje", label: "Metraje", width: "w-[100px]" },
  { key: "dormitorios", label: "Dorm.", width: "w-[100px]" },
  { key: "banos", label: "Bañ.", width: "w-[100px]" },
  { key: "estado", label: "Estado", width: "w-[150px]" },
  { key: "fecha_entrega", label: "Entrega", width: "w-[100px]" },
];

export default function Home() {
  //********************************** USESTATE **********************************/
  //********************************** METHODS **********************************/
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 6,
    }).format(price);
  };
  return (
    <>
      <div className='p-5 flex flex-col '>
        <div className='table-container hidden md:block'>
          <Table>
            <TableCaption>Listado de visitas a posibles departamentos</TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => {
                  return (
                    <TableHead key={header.key} className={header.width}>
                      {header.label}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className='font-medium'>{unit.empresa}</TableCell>
                  <TableCell>{unit.fecha_visita.toLocaleString()}</TableCell>
                  <TableCell>{unit.direccion}</TableCell>
                  <TableCell>{unit.precio}</TableCell>
                  <TableCell>{unit.metraje} m2</TableCell>
                  <TableCell>{unit.dormitorios}</TableCell>
                  <TableCell>{unit.banos}</TableCell>
                  <TableCell>{unit.estado}</TableCell>
                  <TableCell>{unit.fecha_entrega?.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='md:hidden flex flex-col gap-4'>
          {" "}
          {units.map((unit, index) => {
            return (
              <Card className='w-[350px]' key={index}>
                <CardHeader>
                  <CardTitle>{unit.empresa}</CardTitle>
                  <CardDescription>{unit.direccion}</CardDescription>
                  <CardDescription>{unit.fecha_visita.toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='h-30 w-30 m-auto'>Google Maps</div>

                  <div className='flex gap-2 justify-between mb-2'>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Dorm.</Label>
                      <h4 className='text-muted-foreground text-sm'>{unit.dormitorios}</h4>
                    </div>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Baños</Label>
                      <h4 className='text-muted-foreground text-sm'>{unit.banos}</h4>
                    </div>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Precio</Label>
                      <h4 className='text-muted-foreground text-sm'>
                        {formatPrice(unit.precio || 0)}
                      </h4>
                    </div>
                  </div>
                  <div className='flex gap-2 justify-between mb-2'>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Metraje</Label>
                      <h4 className='text-muted-foreground text-sm'>{unit.metraje}m2</h4>
                    </div>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Estado</Label>
                      <h4 className='text-muted-foreground text-sm'>{unit.estado}</h4>
                    </div>
                    <div className='flex flex-col items-center'>
                      <Label className='w-full mb-2 w-20 text-center'>Entrega</Label>
                      <h4 className='text-muted-foreground text-sm'>
                        {unit.fecha_entrega?.toLocaleDateString()}
                      </h4>
                    </div>
                  </div>
                  <div className=' mb-2'>
                    <Textarea value={unit.comentarios} disabled />
                  </div>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button>Borrar</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
