import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Hi from "../components/Profile/Hi";
import SectionContainer from "../components/Profile/SectionContainer";
import ProfileChanges from "../components/Profile/ProfileChanges";
import Modal from "../components/Modal";
import EmailEditForm from "../components/Profile/EmailEditForm";
import NameEditForm from "../components/Profile/NameEditForm";
import PwdEditForm from "../components/Profile/PwdEditForm";
import CountryEditForm from "../components/Profile/CountryEditForm";
import DeleteAccountForm from "../components/Profile/DeleteAccountForm";

// Página de perfil del usuario.
// Permite al usuario ver y modificar sus datos personales, como nombre, email, contraseña y país de residencia.
export default function Profile() {
  const { user } = useAuth();
  const [modalType, setModalType] = useState<
    null | "name" | "email" | "password" | "country" | "delete"
  >(null);

  if (!user) {
    return <p className="text-center pt-20">Cargando perfil...</p>;
  }

  return (
    <div className="w-full text-xl text-gray-800 dark:text-gray-200">
      {/* Saludo */}
      <Hi />
      <section className="flex">
        {/* Sección Datos personales */}
        <section className="w-full h-[1050px] items-center content-center bg-white dark:bg-blue-950/80 pt-2">
          {/* Contenedor de la sección */}
          <SectionContainer borderColor="border-amber-400 dark:border-red-600">
            <h2 className="text-3xl font-semibold text-amber-400 dark:text-white mb-8">
              Datos personales
            </h2>
            {/* Lista de cambios de perfil */}
            <div className="space-y-6 text-lg">
              <ProfileChanges
                label="Nombre de usuario"
                value={user.name}
                buttonText="Modificar nombre"
                onClick={() => setModalType("name")}
              />
              <ProfileChanges
                label="Email"
                value={user.email}
                buttonText="Modificar email"
                onClick={() => setModalType("email")}
              />
              <ProfileChanges
                label="Contraseña"
                value="********"
                buttonText="Modificar contraseña"
                onClick={() => setModalType("password")}
              />
              <ProfileChanges
                label="País de residencia"
                value={
                  user.pais_id === 1
                    ? "España"
                    : user.pais_id === 2
                      ? "Andorra"
                      : "Sin asignar"
                }
                buttonText="Modificar país"
                onClick={() => setModalType("country")}
              />
            </div>
          </SectionContainer>
        </section>
        {/* Sección Eliminar cuenta */}
        <section className="w-full items-center content-center bg-white dark:bg-blue-950/80 pb-6">
          <SectionContainer borderColor="border-red-500">
            <h2 className="text-3xl font-semibold text-red-500 mb-8">
              Eliminar cuenta
            </h2>
            <ProfileChanges
              label="¿Quieres eliminar tu cuenta?"
              value={""}
              buttonText="Eliminar cuenta"
              variant="danger"
              onClick={() => setModalType("delete")}
            />
          </SectionContainer>
        </section>

      </section>

      {/* Overlay y Modal genérico */}
      {modalType && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setModalType(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Modal>
              {modalType === "name" && (
                <NameEditForm onClose={() => setModalType(null)} />
              )}

              {modalType === "email" && (
                <EmailEditForm onClose={() => setModalType(null)} />
              )}

              {modalType === "password" && (
                <PwdEditForm onClose={() => setModalType(null)} />
              )}

              {modalType === "country" && (
                <CountryEditForm onClose={() => setModalType(null)} />
              )}

              {modalType === "delete" && (
                <div className="space-y-4">
                  <DeleteAccountForm onClose={() => setModalType(null)} />
                </div>
              )}
            </Modal>

          </div>
        </div>
      )}
    </div>
  );
}



