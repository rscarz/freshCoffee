import { useState , useEffect } from "react";
import useQuiosco from "../hooks/useQuiosco"
 import { formatearDinero } from "../helpers"


export default function ModalProducto() {

    const {producto, handleClickModal, handleAgregarPedido, pedido } = useQuiosco();
    const [cantidad , setCantidad] = useState(1);
    const [edicion , setEdicion] = useState(false);

    useEffect(() => {
        // comprobar si el elemento esta en el pedido
        if ( pedido.some( pedidoState => pedidoState.id === producto.id)) {
            //console.log('esta en el pedido')
            // si esta extraigo la cantidad
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]

            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        
        }
    
    //   return () => {
    //     second
    //   }
    }, [pedido])
    


  return (
    <div className="md:flex gap-10">

        <div className="md:w-1/3  ">
            <img 
                src={`/img/${producto.imagen}.jpg`}
                alt= {`imagen ${producto.nombre}`}
                className="w-full" 
            />
        </div>

        <div className="md:w-2/3  ">
            <div className=" flex justify-end">
                <button
                    onClick={handleClickModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>

            </div>
            {/* nombre */}
            <h2 className="text-xl font-bold"> 
              {producto.nombre}
            </h2>

            {/* precio */}
            <p className="mt-5 font-black text-3xl text-amber-500">
               {formatearDinero(producto.precio)}
            </p>

            {/* cantidad */}
            <div className="flex gap-4 mt-5">
            <button 
                type="button"
                onClick={() => {
                    if (cantidad <= 1) return 
                    setCantidad (cantidad - 1);
                }}

                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
                <p className="text-2xl">
                    {cantidad}
                </p>
            <button
                type="button"
                onClick={() => {
                    if (cantidad >= 5) return    
                    setCantidad (cantidad + 1);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            </div>

            {/* boton añadir producto */}
            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2
                            mt-5 text-white font-bold uppercase"
                onClick={() => {
                                handleAgregarPedido( {...producto, cantidad} )
                                handleClickModal()} 
                  
                }>
                {edicion ? 'Guardar cambios' : 'Añadir al pedido'}
            </button>
        </div>
        
        
    </div>
  )
}
