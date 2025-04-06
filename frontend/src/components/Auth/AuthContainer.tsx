import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Modal from "../Modal";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal>
      <div>
        <div className="grid grid-cols-2 items-center mb-8 gap-2">
          {/* Iniciar sesión */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsLogin(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsLogin(true);
              }
            }}
            className={`rounded-2xl px-4 py-2 text-2xl font-semibold text-center transition-colors cursor-pointer
      ${
        isLogin
          ? "text-violet-800 dark:text-white"
          : "text-violet-800 opacity-50 hover:opacity-100 dark:text-white"
      } 
      hover:text-rose-500 hover:dark:text-amber-300`}
          >
            Iniciar sesión
          </div>

          {/* Regístrate */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsLogin(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsLogin(false);
              }
            }}
            className={`rounded-2xl px-4 py-2 text-2xl font-semibold text-center transition-colors cursor-pointer
              ${
                !isLogin
                  ? "text-violet-800 dark:text-white"
                  : "text-violet-800 opacity-50 hover:opacity-100 dark:text-white"
              } 
      hover:text-rose-500 hover:dark:text-amber-300`}
          >
            Regístrate
          </div>
        </div>

        <div className="form-area">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </Modal>
  );
};

export default AuthContainer;
