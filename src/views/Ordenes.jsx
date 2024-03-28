//rfc
import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from "../helpers";
import useQuiosco from '../hooks/useQuiosco';

export default function Ordenes() {

    const token = localStorage.getItem('AUTH TOKEN');
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { handleClickCompletarPedido } = useQuiosco();

    //const { data , error , isLoading } = useSWR('/api/pedidos' , fetcher, {refreshInterval:1000})

    const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, {refreshInterval:1000})

    if (isLoading) return 'Cargando...'

    console.log(data.data)



    return (
        <div>

            <h1 className='text-4xl font-black'>
                Ordenes
            </h1>

            <p className='text-2xl my-10'>
                Administra las órdenes desde aquí
            </p>

            <div className='grid grid-cols-3 gap-3'>
                {data.data.data.map(lpedido => (

                    <div key={lpedido.id} className='p-5 bg-white shadow space-y-2 border-b'>
                        <p className='text-xl font-bold text-slate-600'>
                            Contenido del Pedido:
                        </p>

                        {lpedido.productos.map(lproducto => (
                            <div key={lproducto.id}
                                className='border-b border-b-slate-200 last-of-type:border-none py-4 '
                            >
                                <p className='text-sm '>ID: {lproducto.id}</p>
                                <p>{lproducto.nombre}</p>
                                <p> Cantidad:
                                    <span className='font-bold'>
                                        {lproducto.pivot.cantidad}
                                    </span>
                                </p>

                                {/* <p className='text-lg font-bold text-slate-600'>
                                    Cliente: {''}
                                    <span className='font-normal'>
                                        {lpedido.user.name}
                                    </span>
                                </p>

                                <p className='text-lg font-bold text-amber-500'>
                                    Total a Pagar: {''}
                                    <span className='font-normal text-slate-600'>
                                        {formatearDinero(lpedido.total)}
                                    </span>
                                </p>

                                <button type="button"
                                    className="bg-indigo-600 hover:bg-indigo-800 px-5 
                                     py-2 rounded uppercase font-bold text-white text-center 
                                     w-full cursor-pointer"
                                >
                                    Completar

                                </button> */}

                            </div>
                        ))}


                        <p className='text-lg font-bold text-slate-600'>
                            Cliente: {''}
                            <span className='font-normal'>
                                {lpedido.user.name}
                            </span>
                        </p>

                        <p className='text-lg font-bold text-amber-500'>
                            Total a Pagar: {''}
                            <span className='font-normal text-slate-600'>
                                {formatearDinero(lpedido.total)}
                            </span>
                        </p>

                        <button type="button"
                            onClick={() => handleClickCompletarPedido(lpedido.id) }
                            className="bg-indigo-600 hover:bg-indigo-800 px-5 
                                     py-2 rounded uppercase font-bold text-white text-center 
                                     w-full cursor-pointer"
                        >
                            Completar

                        </button>

                    </div>



                ))}

            </div>

        </div>
    )
}
