import React from "react";
import { useAuth } from '../../context/AuthContext';
import Button from '../Button';
import { useNavigate } from "react-router-dom";

const Hi: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="w-full bg-gray-100 dark:bg-rose-600/80 shadow-lg pt-24 pb-11 flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        ¡Hola! {user!.name}
      </h1>
      <p className="mt-1 text-gray-600 dark:text-gray-300">{user!.email}</p>

      <Button
        text="Volver al Portfolio"
        onClick={() => navigate("/dashboard")}
        variant="default"
      />
    </div>
  );
};

export default Hi;
