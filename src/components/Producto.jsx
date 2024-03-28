import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

  const { nombre, imagen, precio } = producto
  const { handleClickModal, handleSetProducto,handleClickProductoAgotado } = useQuiosco()

  return (
    <div className="border p-3 shadow bg-white">
      {/* imagen */}
      <img
        src={`/img/${imagen}.jpg`}
        alt={`imagen ${nombre}`}
        className="w-full"
      />

      <div className="p-5">
        {/* nombre del producto */}
        <h3 className="text-xl font-bold">
          {nombre}
        </h3>

        {/* precio del producto */}
        <p className="mt-5 font-black text-3xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        {/* si le paso por parametro mostrar el boton agregar */}
        {botonAgregar && (
          <button
            type="button"
            onClick={() => {
              handleClickModal();
              handleSetProducto(producto);
            }}
            className="bg-indigo-600 hover:bg-indigo-800 text-white
                          w-full mt-5 p-3 uppercase font-bold">
            Agregar
          </button>
        )}

        {/* si le paso por parametro mostrar el boton agregar */}
        {botonDisponible && (
          <button
            type="button"
            onClick={()=> {handleClickProductoAgotado(producto.id) }}
            className="bg-indigo-600 hover:bg-indigo-800 text-white
                          w-full mt-5 p-3 uppercase font-bold">
            Producto Agotado
          </button>
        )}

      </div>

    </div>
  )
}
