import pg from "pg"
const { Pool } = pg
import dotenv from 'dotenv';
import { getMapsInformation } from "./LocationIQ.js";

dotenv.config();

class SQLService {
    constructor() {

        this.pool = new Pool({
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT,
        });
    }

    async connect() {
        try {
            await this.pool.connect();
            console.log('Connected to the PostgreSQL database.');
        } catch (error) {
            console.error('Connection error', error.stack);
        }
    }

    async disconnect() {
        await this.pool.end();
        console.log('Disconnected from the PostgreSQL database.');
    }

    executeQuery = async () => {

        try {

            const query = "SELECT * FROM re_unit ORDER BY id DESC"

            const response = await this.pool.query(query)

            return response.rows
        } catch (err) {
            console.error("Query execution error:", err);
            throw err;
        }

    }

    addNewUnit = async (params) => {
        try {
            const locationIQ = await getMapsInformation(params.direccion)
            const query = `
                        INSERT INTO re_unit (
                        empresa, fecha_visita, direccion, precio, metraje,
                        dormitorios, banos, comentarios, fecha_entrega, estado, imagen, 
                        asesor_id, distrito, latitude, longitude
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                        RETURNING *;
                    `
            const values = [
                params.empresa,
                new Date(params.fecha_visita),
                params.direccion,
                params.precio,
                params.metraje,
                params.dormitorios,
                params.banos,
                params.comentarios,
                params.fecha_entrega,
                params.estado,
                params.imagen,
                params.asesor_id,
                locationIQ.distrito,
                locationIQ.lat,
                locationIQ.lon,
            ];

            const res = await this.pool.query(query, values);

            return res.rows
        } catch (err) {
            console.error("Error inserting data:", err);
        }
    }

    deleteUnit = async (unitId) => {
        try {
            const values = [
                unitId
            ]
            const sqlQuery = `DELETE FROM re_unit WHERE id = $1;`
            const res = await this.pool.query(sqlQuery, values);
            return res.rows
        }
        catch (err) {
            console.error("Error inserting data:", err);
        }
    }
}

export default SQLService;
