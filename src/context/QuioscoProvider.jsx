import { createContext , useState , useEffect} from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
// import { categorias as categoriasDB } from "../data/categorias"
import clienteAxios from "../config/axios" ;


const QuioscoContext = createContext();

const QuioscoProvider = ( {children} ) => {

    const [categorias , setCategorias] = useState([]);
    const [categoriaActual , setCategoriaActual] = useState( {} );
    const [modal , setModal] = useState( false );
    const [producto , setProducto] = useState( {} );
    const [pedido , setPedido] = useState([]);
    const [total , setTotal] = useState([0]);
    

    //escucha cada vez que se modifica el pedido
    useEffect( () => {
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total , 0)
        setTotal(nuevoTotal)
        
    } , [pedido]
    )

    const obtenerCategorias = async() => {
        const token = localStorage.getItem('AUTH TOKEN');

        try {
            //console.log(  import.meta.env.VITE_API_URL)
            const {data} = await clienteAxios('/api/categorias' , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }) 
            //console.log(data.data)       
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error);    
        }
    }

    useEffect( () => {
        obtenerCategorias();
    } , [] )

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }   
  
    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        //console.log(producto);
        
        if ( pedido.some( pedidoState => pedidoState.id === producto.id)) {
            //console.log('esta en el pedido')
            // si esta extraigo la cantidad
            //map = iterar
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState )

            setPedido(pedidoActualizado)
            toast.success('Pedido actualizado')
        
        } 
        else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
    }

    const HandleEditarCantidad = id => {
        const productoActualizado = pedido.filter(lproducto => lproducto.id === id) [0]
        setProducto(productoActualizado)
        setModal(!modal)

    }

    const HandleEdliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(lproducto => lproducto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Producto eliminado')
    }


    const handleSubmitNuevaOrder = async (logout) => {

        const token = localStorage.getItem('AUTH TOKEN');

        try {
            const  {data} = await clienteAxios.post('/api/pedidos' , {
                total,
                // productos: pedido,
                productos: pedido.map(lproducto => {
                    return {
                        id: lproducto.id,
                        cantidad: lproducto.cantidad
                    }
                }),
            } , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);

            setTimeout(() => {
               setPedido([]) 
            }, 1000);
            
            //cerrar sesion
            setTimeout(() => {
                localStorage.removeItem('AUTH TOKEN');
                logout();
            }, 3000);

        } catch (error) {
            
        }
    } 

    const handleClickCompletarPedido = async id => {

        const token = localStorage.getItem('AUTH TOKEN');

        try {   
            //put -> ACTUALIZAR
            await clienteAxios.put(`/api/pedidos/${id}` , null, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {

        const token = localStorage.getItem('AUTH TOKEN');

        try {   
            //put -> ACTUALIZAR
            await clienteAxios.put(`/api/productos/${id}` , null, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    } 

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                HandleEditarCantidad,
                HandleEdliminarProductoPedido,
                total,
                handleSubmitNuevaOrder,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >

        {children}
        
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext