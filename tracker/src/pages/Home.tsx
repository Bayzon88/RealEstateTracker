import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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

import { Label } from "@/components/ui/label";

import "../styles/home.css";
import { Unit } from "@/types/unitTypes";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatPrice, googleMapsParamGenerator } from "@/utils/utils";
import { useEffect, useState } from "react";
import ApiHandler from "@/services/ApiHandler";
import { toast } from "sonner";
const apiHandler = ApiHandler.getInstance();

const headers = [
  { key: "empresa", label: "Empresa", width: "w-[200px]" },
  { key: "fecha_visita", label: "Visita", width: "w-[150px]" },
  { key: "direccion", label: "Dirección", width: "w-[250px]" },
  { key: "distrito", label: "Dirección", width: "w-[150px]" },
  { key: "precio", label: "Precio", width: "w-[120px]" },
  { key: "metraje", label: "Metraje", width: "w-[100px]" },
  { key: "dormitorios", label: "Dorm.", width: "w-[100px]" },
  { key: "banos", label: "Bañ.", width: "w-[100px]" },
  { key: "estado", label: "Estado", width: "w-[150px]" },
  { key: "fecha_entrega", label: "Entrega", width: "w-[100px]" },
];

export default function Home() {
  //********************************** USESTATE **********************************/
  const [units, setUnits] = useState<Unit[]>([]);
  //********************************** USEEFFECT **********************************/
  useEffect(() => {
    //Fetch initial data
    fetchAllUnits();
  }, []);
  //********************************** METHODS **********************************/
  const fetchAllUnits = async () => {
    const response = await apiHandler.fetchAllUnits();

    setUnits(response.data);
  };

  const handleDelete = async (unit: Unit) => {
    const response = await apiHandler.deleteUnit(unit);
    if (response.status == 200) {
      toast("THIS IS A TOAST");
      fetchAllUnits();
    }
  };

  return (
    <>
      <div className='p-5 flex flex-col '>
        <div className='table-container hidden md:block'>
          <Table>
            <TableCaption>Listado de visitas a posibles departamentos</TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header) => {
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
                  <TableCell>{formatDate(unit.fecha_visita)}</TableCell>
                  <TableCell>
                    <a
                      style={{ textDecoration: "underline" }}
                      href={`${googleMapsParamGenerator(unit.direccion)}`}
                    >
                      {unit.direccion}
                    </a>
                  </TableCell>
                  <TableCell>{unit.distrito || ""}</TableCell>
                  <TableCell>{formatPrice(unit.precio || 0)}</TableCell>
                  <TableCell>{unit.metraje} m2</TableCell>
                  <TableCell>{unit.dormitorios}</TableCell>
                  <TableCell>{unit.banos}</TableCell>
                  <TableCell>{unit.estado}</TableCell>
                  <TableCell> {formatDate(unit.fecha_entrega)}</TableCell>
                  <TableCell>
                    <Button variant='ghost' onClick={() => handleDelete(unit)}>
                      Borrar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='md:hidden flex flex-col gap-4 m-auto'>
          {units.map((unit, index) => {
            return (
              <Card className='w-[350px]' key={index}>
                <CardHeader>
                  <CardTitle>{unit.empresa}</CardTitle>
                  <CardDescription>{unit.direccion} </CardDescription>
                  <CardDescription>{unit.distrito || ""}</CardDescription>
                  <CardDescription>
                    <Button variant='ghost' className='p-0'>
                      <a href={`${googleMapsParamGenerator(unit.direccion)}`} className='flex p-0'>
                        Ver en Google Maps
                        <img src='/images/google_maps.png' width={20} height={20} />
                      </a>
                    </Button>
                  </CardDescription>
                  <CardDescription>{formatDate(unit.fecha_visita)}</CardDescription>
                </CardHeader>
                <CardContent>
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
                        {formatDate(unit.fecha_entrega)}
                      </h4>
                    </div>
                  </div>
                  <div className=' mb-2'>
                    <Textarea value={unit.comentarios} disabled />
                  </div>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button onClick={() => handleDelete(unit)}>Borrar</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
