import Modal from "../components/Modal";
import SelectCountry from "../components/SelectCountry/SelectCountry";

function Country() {
  return (
    <Modal>
      <h2 className="mb-4 text-violet-800 dark:text-white text-2xl font-semibold text-center ">
        Selecciona tu país de residencia
      </h2>
      <SelectCountry />
    </Modal>
  );
}

export default Country;
