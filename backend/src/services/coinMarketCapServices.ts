import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const API_KEY = process.env.CMC_API_KEY as string; // Tu API Key

export const obtenerPrecioCripto = async (simbolo: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { "X-CMC_PRO_API_KEY": API_KEY },
      params: { symbol: simbolo },
    });

    const precio = response.data.data[simbolo].quote.USD.price;
    return precio;
  } catch (error) {
    console.error(`Error al obtener el precio de ${simbolo}:`, error);
    throw new Error("No se pudo obtener el precio de la criptomoneda.");
  }
};
