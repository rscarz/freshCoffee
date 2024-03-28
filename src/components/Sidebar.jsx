import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { categorias } from "../data/categorias"
import { useAuth } from "../hooks/useAuth";


export default function Sidebar() {

    const { categorias } = useQuiosco();
    const { logout } = useAuth( { middleware: 'auth'} )



  return (
    <aside className="md:w-72">

        {/* logo */}
        <div className='p-4'>
            <img 
                src="img/logo.svg" 
                alt="inmagen logo"
                className='w-28' />
        </div>
        
        {/* categorias */}
        <div className="mt-10">
            
            {categorias.map( categoria => (
                <Categoria
                    key={categoria.id}
                    categoria= { categoria }   
                />
            ) )}

        </div>

        {/* boton cancelar */}
        <div className="my-5 px-5">
            <button
                type="button"
                onClick={logout}
                className="text-center bg-red-500 w-full
                           p-3 font-bold text-white
                           truncate "
                >
                    Cancelar Orden
            </button>
        </div>
    
    </aside>
  )
}
