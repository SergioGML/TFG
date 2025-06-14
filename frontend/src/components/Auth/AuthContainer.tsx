import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Modal from "../Modal";
import AuthOPtion from "./AuthOption";

// Componente principal que maneja el estado de autenticación y muestra el formulario correspondiente.
const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal>
      <div>
        <div className="grid grid-cols-2 items-center mb-8 gap-2">
          <AuthOPtion
            label="Iniciar sesión"
            active={isLogin}
            onClick={() => setIsLogin(true)}
          />
          <AuthOPtion
            label="Regístrate"
            active={!isLogin}
            onClick={() => setIsLogin(false)}
          />
        </div>

        <div className="form-area">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </Modal>
  );
};

export default AuthContainer;
