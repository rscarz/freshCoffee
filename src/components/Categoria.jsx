import useQuiosco from "../hooks/useQuiosco"

export default function Categoria( {categoria} ) {
   
    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const { icono , id, nombre} = categoria

    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white"

  return (
    
    <div className={`${resaltarCategoriaActual()}
                    flex items-center gap-4 border w-full
                    p-3 hover:bg-amber-400 cursor-pointer`}
          onClick={() => handleClickCategoria(id)}
                    >
    
        <img 
            src= {`/img/icono_${icono}.svg`}
            alt="image icono" 
            className="w-12"/> 

        <button 
            className="text-xs font-bold cursor-pointer truncate "
            type="button"
            // onClick={() => handleClickCategoria(id)}
        
        >
            {nombre}
        </button>
    </div>
  )
}
