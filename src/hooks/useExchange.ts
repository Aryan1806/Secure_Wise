import { useEffect, useState } from "react";
import { ExchangeRates } from "../utils/currency";

const CACHE_KEY = "exchange_rates";
const API_URL = "https://open.er-api.com/v6/latest/USD";

export function useExchangeRate() {
  const [data, setData] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRates() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch rates");

      const json = await res.json();

      const rates: ExchangeRates = {
        base: "USD",
        rates: {
          USD: 1,
          INR: json.rates.INR,
          EUR: json.rates.EUR,
        },
        lastUpdated: Date.now(),
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
      setData(rates);
    } catch (err) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setData(JSON.parse(cached));
      } else {
        setError("Unable to load exchange rates");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRates();
  }, []);

  return { data, loading, error, refresh: fetchRates };
}
