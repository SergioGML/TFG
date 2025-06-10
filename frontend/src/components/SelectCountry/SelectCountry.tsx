import { useState } from "react";
import { ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import Info from "../Info";
import ChooseMenu from "../ChooseMenu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Country() {
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const countries = [
    { label: "España", value: "1" },
    { label: "Andorra", value: "2" },
  ];

  const handleUpdateCountry = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pais_id: parseInt(country) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No se pudo guardar el país");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Error al actualizar el país");
    }
  };

  return (
    <div>
      <ChooseMenu
        items={countries}
        selectedItem={country}
        onSelect={setCountry}
        placeholder="Selecciona un país"
      />

      {!country && (
        <div className="flex items-center justify-center gap-2 text-gray-800 dark:text-gray-200 mt-10 mb-10">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>Selecciona un país del menú desplegable</span>
        </div>
      )}

      {country === "1" && (
        <div className="my-4">
          <Info text="En España, las ganancias por criptomonedas tributan como ganancias patrimoniales en el IRPF. Los tramos actuales son: 19% hasta 6.000 €, 21% entre 6.000 € y 50.000 €, 23% hasta 200.000 € y 27% a partir de ahí." />
        </div>
      )}

      {country === "2" && (
        <div className="my-4">
          <Info text="En Andorra, las ganancias por criptomonedas tributan como ganancias de capital. Se aplica una tasa fija del 10%, con una exención de los primeros 3.000 € anuales. No existe impuesto al patrimonio ni a las herencias." />
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex flex-col items-center gap-2 mt-4">
        <Button
          text="Continuar"
          icon={<UserIcon className="w-5 h-5" />}
          onClick={handleUpdateCountry}
        />
      </div>
    </div>
  );
}
