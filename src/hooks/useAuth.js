import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

export const useAuth = ( { middleware , url }) => {

    const token = localStorage.getItem('AUTH TOKEN');
    const navigate = useNavigate();

    const { data: user, error , mutate} = useSWR('/api/user' , () => 
        clienteAxios('/api/user' , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async ( datos, setErrores) => {

        try {
            const {data} = await clienteAxios.post('/api/login' , datos)
            //almaceno el token localmente
            localStorage.setItem('AUTH TOKEN' , data.token);

            //si todo esta ok, se reinicia 
            setErrores([]);

            //para forzar la revalidacion, actualiza el token
            await mutate();
           // console.log(data.token)

        } catch (error) {
            // console.log(Object.values(error.response.data.errors))
            setErrores(Object.values(error.response.data.errors))
        }

        
    }  


    
    const registro = async ( data , setErrores ) => {
        try {
            const { data }  = await clienteAxios.post('/api/registro' , datos)
            //console.log(data.token)

            //almaceno el token localmente
            localStorage.setItem('AUTH TOKEN' , data.token);

            //si todo esta ok, se reinicia 
            setErrores([]);

            //para forzar la revalidacion, actualiza el token
            await mutate();

        } catch (error) {
            // console.log(Object.values(error.response.data.errors))
            setErrores(Object.values(error.response.data.errors))
        }
    }     
    
    
    const logout = async () => {
        console.log('logout.click')
        try {
            await clienteAxios.post('/api/logout' , null , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //remuevo el token del storage
            localStorage.removeItem('AUTH TOKEN')

            //hago que vuelva a validar
            await mutate(undefined);


        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    console.log(user)
    console.log(error)
    console.log(middleware)
    console.log(url)

    useEffect(() => {
      if ( middleware === 'guest' && url && user ) {
            //redireccion
            navigate(url)
      }

    if ( middleware === 'guest'  && user  && user.admin) {
        //redireccion
        navigate('/admin')
    }

    if ( middleware === 'admin'  && user  && !user.admin) {
        //redireccion
        navigate('/')
    }

    if ( middleware === 'auth' && error ) {
        navigate('/auth/login')
    }
    
    //   return () => {
    //     second
    //   }
    }, [user , error])

   //)

    //}, [user , error]) --> son las variables que escucha si cambian de valor
    

    return {
        login,
        registro,
        logout,
        user,
        error
    }


}