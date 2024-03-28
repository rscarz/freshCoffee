import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../components/Producto'

export default function Productos() {

    const token = localStorage.getItem('AUTH TOKEN');
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(ldatos => ldatos.data)

    const { data, error, isLoading } = useSWR('/api/productos', fetcher, { refreshInterval: 10000 })

    if (isLoading) return 'Cargando...'

    console.log(data.data)

    return (
        <div>

            <h1 className='text-4xl font-black'>
                Productos
            </h1>

            <p className='text-2xl my-10'>
                Maneja la disponibilidad aquí
            </p>

            <div className=' grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4'>
                {data.data.map(producto => (
                    <Producto
                        key={producto.imagen}
                        producto={producto}
                        botonDisponible={true}
                    />
                )

                )}
            </div>

        </div>
    )
}
