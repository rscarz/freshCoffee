import { Link } from "react-router-dom";
import { createRef , useState } from "react"
import { useAuth } from "../hooks/useAuth";
import Alerta from "../components/Alerta";


export default function Login() {

    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores , setErrores] = useState( [])
    const {login} = useAuth( {
                                middleware : 'guest' ,
                                url: '/'
                            } )

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        console.log(datos);

        login(datos, setErrores) ;
        
    }


  return (
<>
    <h1 className="text-4xl font-black">
        Iniciar Sesión
    </h1>
    <p>
        Para crear un pedido debes iniciar sesión.
    </p>

    <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit}
              noValidate>
                
                {errores ? 
                errores.map((error , i) => <Alerta key={i}>{error}</Alerta> ) 
                : 
                null }

            <div className="mb-4">

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
                    ref={emailRef}
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="email"
                    autoComplete="off"
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
                    ref={passwordRef}
                    className="mt-2 block p-3 w-full bg-gray-50"
                    name="password"
                    autoComplete="off"
                    placeholder="Tu password"
                />                     
            </div>
            
            <input 
                type="submit"
                value="Iniciar Sesión"
                className="bg-indigo-600 hover:bg-indigo-800
                           text-white w-full mt-5 p-3
                           uppercase font-bold cursor-pointer " />
        </form>
    </div>

    <nav className="mt-5">
      <Link to="/auth/registro">
        ¿No tienes cuenta? Crea una.
      </Link>

    </nav>
</>
  )
}
