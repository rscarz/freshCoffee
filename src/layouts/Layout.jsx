import { Outlet } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import useQuiosco from '../hooks/useQuiosco'
import ModalProducto from '../components/ModalProducto'
import { useAuth } from '../hooks/useAuth'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')

export default function Layout() {
  
  const { user , error } = useAuth( { middleware:'auth' } )
  const { modal, handleClickModal } = useQuiosco();

  console.log(modal)
  console.log(user)
  console.log(error)

  return (
    <>
      <div className='md:flex'>

          <Sidebar/>
          
          <main className='flex-1 h-screen overflow-y-auto p-3'>
          <Outlet/>

          </main>
        


          <Resumen/>
      </div>

      {/* { modal && ( */}
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto/>
            {/* <p>
              Desde Modal
            </p>

            <button
              onClick={handleClickModal}>
              Cerrar
            </button> */}
        </Modal>

        <ToastContainer/>
      {/* )

      } */}

    </>
  )
}
