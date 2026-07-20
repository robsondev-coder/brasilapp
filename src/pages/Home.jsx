import { Link } from "react-router-dom";
import { http } from "../services/api"
import { useEffect, useState } from "react";
import { percentual, formatarValor } from "../services/utilitario";

export default function Home(){
    // function dobro(numero){
    //     return numero * 2
    // }
    // const outroDobro = (numero) => {
    //     return numero * 2
    // }
    // const maisUmDobro = (numero) => numero * 2



    // Variáveis de estado da página
    const [estados, setEstados]     = useState([])      // Armazena a lista dos estados

    // Chamar o endpoint de estados
    // Executa quando a página for carregada [].

    useEffect(() => {            
        carregarDados()
    }, [])

    async function carregarDados(){
        try{
            const { data } = await http.get("/estados")
            setEstados(data)
            //console.log(data)
        }
        catch (e) {
            console.log(e.message)
        }
    }
    
    return (
        <>
            <h2 className="">Brasil • Censo 2022</h2>
            <p className="text-muted mb-4">Dados populacionais por estado e município • IBGE</p>

            <div className="row">

                {estados.map(objEstado => (
                    <div className="col-md-4 mb-4">
                        <Link to={`/estado/${objEstado.uf}`} className="card text-decoration-none">
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>{objEstado.uf}</h4>
                                    <span className="badge bg-info">{objEstado.regiao}</span>
                                </div>

                                <p className="text-muted small mb-2">{objEstado.estado}</p>

                                <p>
                                    <i className="bi bi-people-fill text-primary me-1"></i>
                                    <strong>{formatarValor(objEstado.populacao_2022)}</strong> hab.
                                </p>

                                {/* Informações relacionadas ao sexo */}
                                <div className="d-flex justify-content-between small text-muted">
                                    <span>
                                        <i className="bi bi-gender-male text-info me-1"></i> 
                                        {percentual(objEstado.populacao_2022, objEstado.homens)}% homens
                                    </span>
                                    <span>
                                        {percentual(objEstado.populacao_2022, objEstado.mulheres)}% mulheres
                                        <i className="bi bi-gender-female text-danger ms-1"></i>
                                    </span>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-info" style={{width: `${percentual(objEstado.populacao_2022, objEstado.homens)}%`}}></div>
                                    <div className="progress-bar bg-danger" style={{width: `${percentual(objEstado.populacao_2022, objEstado.mulheres)}%`}}></div>
                                </div>

                                {/* Informações relacionadas a residência */}
                                <div className="d-flex justify-content-between small text-muted mt-3">
                                    <span>
                                        <i className="bi bi-building text-warning me-1"></i> 
                                        {percentual(objEstado.populacao_2022, objEstado.urbana)}% urbana
                                    </span>
                                    <span>
                                        {percentual(objEstado.populacao_2022, objEstado.rural)}% rural
                                        <i className="bi bi-tree text-success ms-1"></i>
                                    </span>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-warning" style={{width: `${percentual(objEstado.populacao_2022, objEstado.urbana)}%`}}></div>
                                    <div className="progress-bar bg-success" style={{width: `${percentual(objEstado.populacao_2022, objEstado.rural)}%`}}></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </>
    )
}