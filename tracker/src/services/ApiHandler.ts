import { Unit } from "@/types/unitTypes";
import axios from "axios";

class ApiHandler {
  private static instance: ApiHandler;

  public static getInstance(): ApiHandler {
    if (!ApiHandler.instance) {
      ApiHandler.instance = new ApiHandler();
    }
    return ApiHandler.instance;
  }
  public fetchAllUnits = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/units`);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error("Hubo un error agregando una nueva visita");
    }
  };

  public saveNewVisit = async (unit: Unit) => {
    try {
      const response = await axios.post("http://localhost:5174/api/units", {
        unit,
      });
      return response;
    } catch (err) {
      console.log(err);
      throw new Error("Hubo un error agregando una nueva visita");
    }
  };

  public deleteUnit = async (unit: Unit) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/units/${unit.id}`);
      return response;
    } catch (err) {
      console.log(err);
      throw new Error("Hubo un error borrando una unidad");
    }
  };
}

export default ApiHandler;
