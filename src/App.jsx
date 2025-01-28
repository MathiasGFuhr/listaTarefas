import { BrowserRouter } from "react-router-dom"
import RoutesApp from "./routes"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} // Fecha o toast após 2 segundos
        hideProgressBar={false} // Mantém a barra de progresso visível
        newestOnTop={true} // Exibe os toasts mais recentes no topo
        closeOnClick // Fecha o toast ao clicar
        pauseOnHover // Pausa o timer ao passar o mouse 
      />
      <RoutesApp />
    </BrowserRouter>
  )
}

export default App