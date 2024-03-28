import { createRef , useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores , setErrores] = useState( [])

    const { registro } = useAuth( { middleware: 'guest' , url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value ,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation : passwordConfirmationRef.current.value
        }

        console.log(datos);
        registro(datos , setErrores) ;
    }


  return (
<>
    <h1 className="text-4xl font-black">
        Crea tu cuenta
    </h1>
    <p>
        Crea tu cuenta completando el fomulario.
    </p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
            {errores ? 
                errores.map((error , i) => <Alerta key={i}>{error}</Alerta> ) 
                : 
                null }
            <div className="mb-4">
                <label 
                    className="text-slate-800"
                    htmlFor="name"
                >
                    Nombre
                </label>
                <input 
                    type="text"
                    id="name" 
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="name"
                    ref={nameRef}
                    placeholder="Tu nombre"
                />
                {/* email */}
                <label 
                    className="text-slate-800"
                    htmlFor="email"
                >
                    Email
                </label>
                <input 
                    type="email"
                    id="email" 
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="email"
                    ref={emailRef}
                    placeholder="Tu email"
                />
                {/* password */}
                <label 
                    className="text-slate-800"
                    htmlFor="password"
                >
                    Password
                </label>
                <input 
                    type="password"
                    id="password" 
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="password"
                    ref={passwordRef}
                    placeholder="Tu password"
                />    
                {/* repetir password */}
                <label 
                    className="text-slate-800"
                    htmlFor="password_confirmation"
                >
                    Repetir Password
                </label>
                <input 
                    type="password"
                    id="password_confirmation" 
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="password_confirmation"
                    ref={passwordConfirmationRef}
                    placeholder="Repetir password"
                />                  
            </div>

            <input 
                type="submit"
                value="Crear cuenta"
                className="bg-indigo-600 hover:bg-indigo-800
                           text-white w-full mt-5 p-3
                           uppercase font-bold cursor-pointer " />
        </form>
    </div>

    <nav className="mt-5">
      <Link to="/auth/login">
        ¿Ya tienes cuenta? Inicia sesión.
      </Link>

    </nav>
</>
  )
}
