import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center pt-20">Cargando perfil...</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-rose-200 to-violet-400 dark:from-blue-800/80 dark:to-neutral-950">
      <div className="pt-15"></div>

      {/* Sección Nombre y correo */}
      <div className=" bg-gray-100 dark:bg-rose-600/80 shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          ¡Hola! {user.name}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{user.email}</p>

        <Button
          text="Volver al Portfolio"
          onClick={() => navigate("/dashboard")}
          variant="default"
        />
      </div>

      {/* Sección Datos personales */}
      <section className="w-full bg-white dark:bg-blue-950/80 pt-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-100 rounded-xl border-2 border-amber-300 dark:border-amber-200 shadow p-8 px-4">
          <h2 className="text-3xl font-semibold text-amber-400 dark:text-rose-600 mb-8">
            Datos personales
          </h2>

          <div className="space-y-6">
            {/* Nombre */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-blue-950">
                  Nombre de usuario
                </p>
                <p className="text-gray-800 dark:text-rose-500">{user.name}</p>
              </div>
              <Button
                text="Modificar nombre"
                onClick={() => navigate("/profile/edit/name")}
              />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-blue-950">
                  Email
                </p>
                <p className="text-gray-800 dark:text-rose-500">{user.email}</p>
              </div>
              <Button
                text="Modificar email"
                onClick={() => }
              />
            </div>

            {/* Contraseña */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-blue-950">
                  Contraseña
                </p>
                <p className="text-gray-800 dark:text-rose-500">********</p>
              </div>
              <Button
                text="Modificar contraseña"
                onClick={() => navigate("/profile/edit/password")}
              />
            </div>

            {/* País */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-blue-950">
                  País de residencia
                </p>
                <p className="text-gray-800 dark:text-rose-500">
                  {user.pais_id === 1
                    ? "España"
                    : user.pais_id === 2
                    ? "Andorra"
                    : "Sin asignar"}
                </p>
              </div>
              <Button
                text="Modificar país"
                onClick={() => navigate("/profile/edit/country")}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white dark:bg-blue-950/80 py-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-100 rounded-xl border-2 border-red-500 dark:border-red-500 shadow p-8 px-4">
          <h2 className="text-3xl font-semibold text-red-500 mb-8">
            Eliminar cuenta
          </h2>

          <div className="mt-1.5">
            {/* Borrar Cuenta */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-red-500">
                  ¿Quieres eliminar tu cuenta?
                </p>
              </div>
              <Button
                text="Eliminar cuenta"
                variant="danger"
                onClick={() => navigate("/profile/edit/name")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
