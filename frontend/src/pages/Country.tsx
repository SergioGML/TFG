import Modal from "../components/Modal";
import SelectCountry from "../components/SelectCountry/SelectCountry";

/* Esta página permite al usuario seleccionar su país de residencia, lo cual es importante 
para el cálculo de impuestos y la personalización de la experiencia del usuario.*/
function Country() {
  return (
    <Modal>
      <h2 className="mb-4 text-amber-800 dark:text-white text-2xl font-semibold text-center ">
        Selecciona tu país de residencia
      </h2>
      <SelectCountry />
    </Modal>
  );
}

export default Country;
