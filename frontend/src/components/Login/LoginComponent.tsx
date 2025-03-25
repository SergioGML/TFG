
export default function LoginComponent() {


  return (
    <div>
      <h1>Inicia Sesión</h1>
        <form className="Temporal">
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">Login</button>
        </form>
        <p> Inicia sesión con: </p>

        <p> <a href="/ResetPassword">¿Has olvidado tu contraseña?</a></p>
        <p>¿No tienes cuenta? <a href="/SignUp">Regístrate</a></p>
    </div>
  )
}