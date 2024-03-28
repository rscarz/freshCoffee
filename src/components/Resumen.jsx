import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"
import ResumenProducto from "./ResumenProducto";
 

export default function Resumen() {
  const { pedido, total , handleSubmitNuevaOrder } = useQuiosco();
  const { logout } = useAuth({});

  const comprobarPedido = () => pedido.length ===0;

  const handleSubmit = e => {
    e.preventDefault();

    handleSubmitNuevaOrder(logout);
  }



  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      {/* titulo */}
      <h1 className="text-3xl font-black">
        Mi pedido
      </h1>

      <p className=" my-2">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>

      {/* pedidos */}
      <div className="py-2">
        { pedido.length === 0 ? (
          <p className="text-lg text-center">
              Pedido vacío
          </p>
          
          ) : (
            
               pedido.map(producto =>(
                <ResumenProducto
                  key={producto.id}
                  producto={producto}
                />
              )) 
            
          
        )}

      </div>

      {/* totales */}
      <p className="text-xl mt-10">
        Total: {''}
        { formatearDinero(total)}
      </p>

      {/* boton confirmar */}
      <form action=""
        onSubmit={ handleSubmit }
        className="w-full">
          <div className="mt-5">
            <input type="submit"
                   disabled={ comprobarPedido() }
                   className={`${comprobarPedido() ?
                              'bg-indigo-100' :
                              'bg-indigo-600 hover:bg-indigo-800'} px-5 py-2 rounded
                              uppercase font-bold text-white text-center w-full cursor-pointer`}
                   value={'Confirmar pedido'}
            
            />

          </div>

      </form>


       
    </aside>
    
  )
}
