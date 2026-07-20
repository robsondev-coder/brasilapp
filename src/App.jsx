import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Home from "./pages/Home"
import Estado from "./pages/Estado"
import Municipio from "./pages/Municipio"
import ExemploUseEffect from "./pages/ExemploUseEffect"

export default function App() {
    return (
        <>
            <Header />
            <div className="container py-4">
                <Routes>
                    <Route path="/"                 element={ <Home/> } />
                    <Route path="/estado/:uf"       element={ <Estado/> } />
                    <Route path="/municipio/:id"    element={ <Municipio/> } />
                    <Route path="/useeffect"        element={ <ExemploUseEffect/> } />
                </Routes>
            </div>
        </>
    )
}