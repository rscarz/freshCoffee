//import { productos as data } from '../data/productos'
//npm i swr //instalacion de SWR
import useSWR from 'swr'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'

export default function Inicio() {

  const { categoriaActual } = useQuiosco()
  const token = localStorage.getItem('AUTH TOKEN');
  //consulta SWR
  const fetcher = () => clienteAxios('/api/productos' , {
                          headers: {
                            Authorization: `Bearer ${token}`
                        }
                        }).then(data => data.data) 
                        const { data, error, isLoading } = useSWR('/api/productos', fetcher , {
                          refreshInterval:1000
                        }) 
  // console.log(data)
  // console.log(error)
  // console.log(isLoading)
  if(isLoading) return 'Cargando...'

  const productos = data.data.filter(lproducto => lproducto.categoria_id === categoriaActual.id)

  return (
    <>
      <h1 className='text-4xl font-black'>
        {categoriaActual.nombre}
      </h1>
    
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido
      </p>

      <div className=' grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4'>
        { productos.map(producto =>(
            <Producto
               key={producto.imagen}
               producto= {producto} 
               botonAgregar={true}
            />
        )

        ) }
      </div>

    
    </>
  )
}
