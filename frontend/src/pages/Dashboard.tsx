import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-violet-800 dark:text-white">
        Bienvenido, {user?.name}
      </h1>
      <p className="text-lg mt-4 text-slate-700 dark:text-slate-200">
        Este es tu panel de control.
      </p>
    </div>
  );
}
