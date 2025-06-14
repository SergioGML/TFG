import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// URLs de la API de CoinMarketCap
const QUOTE_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const LISTINGS_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// Verificar que la variable de entorno CMC_API_KEY está definida
const API_KEY = process.env.CMC_API_KEY;
if (!API_KEY) {
  throw new Error("Falta definir CMC_API_KEY en backend/.env");
}

//Obtener el precio de una criptomoneda por su símbolo
export async function obtenerPrecioCripto(simbolo: string): Promise<number> {
  const response = await axios.get(QUOTE_URL, {
    headers: { "X-CMC_PRO_API_KEY": API_KEY },
    params: { symbol: simbolo, convert: "USD" },
  });
  return response.data.data[simbolo].quote.USD.price;
}

/**
 * Top N activos por capitalización.
 * Cada activo incluye
 *   id: coinmarketcap_id,
 *   coinmarketcap_id, simbolo, nombre
 */
export async function getTopAssets(limit = 8) {
  const res = await axios.get(LISTINGS_URL, {
    headers: { "X-CMC_PRO_API_KEY": API_KEY },
    params: {
      start: 1,
      limit,
      sort: "market_cap",
      sort_dir: "desc",
      convert: "USD",
    },
  });
  return (res.data.data as any[]).map((c) => ({
    id: c.id,
    coinmarketcap_id: c.id,
    simbolo: c.symbol,
    nombre: c.name,
  }));
}

//Búsqueda hasta 300 activos por nombre o símbolo.
export async function searchAssets(query: string, limit = 300) {
  const res = await axios.get(LISTINGS_URL, {
    headers: { "X-CMC_PRO_API_KEY": API_KEY },
    params: {
      start: 1,
      limit,
      sort: "market_cap",
      sort_dir: "desc",
      convert: "USD",
    },
  });
  const q = query.toLowerCase();
  const filtered = (res.data.data as any[]).filter(
    (c) =>
      c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
  );
  return filtered.map((c) => ({
    id: c.id,
    coinmarketcap_id: c.id,
    simbolo: c.symbol,
    nombre: c.name,
  }));
}

//Obtener precio y variaciones (1h, 24h, 7d) para varios símbolos a la vez.
export async function getMarketData(symbols: string[]): Promise<
  Record<
    string,
    {
      price: number;
      change1h: number;
      change24h: number;
      change7d: number;
    }
  >
> {
  // Validar que se pasen símbolos
  const response = await axios.get(QUOTE_URL, {
    headers: { "X-CMC_PRO_API_KEY": API_KEY },
    params: { symbol: symbols.join(","), convert: "USD" },
  });
  // Validar que la respuesta contenga datos
  const data = response.data.data as Record<string, any>;
  const result: Record<string, any> = {};
  symbols.forEach((sym) => {
    const entry = data[sym];
    result[sym] = {
      price: entry.quote.USD.price,
      change1h: entry.quote.USD.percent_change_1h,
      change24h: entry.quote.USD.percent_change_24h,
      change7d: entry.quote.USD.percent_change_7d,
    };
  });
  return result;
}
