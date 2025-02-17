export interface Unit {
  id: number;
  empresa?: string; // Optional since it's not marked as NOT NULL
  fecha_visita: Date;
  direccion: string;
  precio?: number; // Optional
  metraje?: number; // Optional
  dormitorios?: number; // Optional
  banos?: number; // Optional
  comentarios?: string; // Optional
  fecha_entrega?: Date; // Optional
  estado: "Construido" | "Planos"; // Restrict to specific values
  imagen?: string; // Can be a URL or file path
  asesor_id: number; // Foreign key reference to an advisor
}
