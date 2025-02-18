export interface Unit {
  id: number | null;
  empresa?: string; // Optional since it's not marked as NOT NULL
  fecha_visita: Date;
  direccion: string;
  precio?: number; // Optional
  metraje?: number; // Optional
  dormitorios?: number; // Optional
  banos?: number; // Optional
  comentarios?: string | undefined; // Optional
  fecha_entrega?: Date | undefined; // Optional
  estado: "Construido" | "Planos"; // Restrict to specific values
  imagen?: string; // Can be a URL or file path
  asesor_id?: number; // Foreign key reference to an advisor
}
