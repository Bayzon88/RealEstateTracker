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

  public saveNewVisit = async (unit: Unit) => {
    try {
      const response = await axios.post("http://localhost:5174/api/visits", {
        unit: unit,
      });
    } catch (err) {
      console.log(err);
      throw new Error("Hubo un error agregando una nueva visita");
    }
  };
}

export default ApiHandler;
