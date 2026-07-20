import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { http } from "../services/api"
import { percentual, formatarValor } from "../services/utilitario";

const CARDS = [
    { label: "População", campo: "populacao_2022", icon: "bi-people-fill", cor: "primary" },
    { label: "Homens", campo: "homens", icon: "bi-gender-male", cor: "info" },
    { label: "Mulheres", campo: "mulheres", icon: "bi-gender-female", cor: "danger" },
    { label: "Urbana", campo: "urbana", icon: "bi-building", cor: "warning" },
    { label: "Rural", campo: "rural", icon: "bi-tree", cor: "success" },
    // { label: "ID", campo: "id", icon: "bi-facebook", cor: "primary" },
]

export default function Estado() {
    const { uf } = useParams()
    const [estado, setEstado] = useState(null)
    const [municipios, setMunicipios] = useState(null)

    // Chamar a API 
    useEffect(() => {
        carregar()              // Chama a API de estados
        carregarMunicipios()    // Chama a API de municípios
    }, [uf])

    async function carregar() {
        try {
            const { data } = await http.get("/estados", { params: { uf } })
            setEstado(data[0])
            
        } catch (e) {
            console.log(e.message)
        }
    }

    async function carregarMunicipios() {
        try {
            const resposta = await http.get("/municipios", { params: { uf } })
            setMunicipios(resposta.data)
            //console.log(resposta.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    // Caso o estado ainda seja nulo, incluimos um aguarde
    if (!estado || !municipios) {
        return <p>Carregando...</p>
    }

    return (
        <div>
            <Link className="btn btn-outline-secondary btn-sm mb-3" to={"/"}>Link para a rota município</Link>

            <div className="page-hero">
                <h1 className="display-6 fw-bold">{estado.uf} - {estado.estado}</h1>
                <small className="opacity-75">{municipios.length} municípios • Censo 2022</small>
            </div>

            {/* Montar os cards */}
            <div className="row g-3 mb-4">
                {CARDS.map(({ label, campo, icon, cor }) => (
                    <div className="col">
                        <div className="card h-100">
                            <div className="card-body">
                                <i className={`bi ${icon} text-${cor} fs-4`}></i>
                                <p className="text-muted small mb-1 mt-2">{label}</p>
                                <p className="fw-bold fs-5">
                                    {formatarValor(estado[campo])}
                                    {campo != 'populacao_2022' &&
                                        <span className="small text-muted fw-normal"> ({percentual(estado.populacao_2022, estado[campo])}%)</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Barra de proporção */}
            <div className="row g-3 mb-4">
                <div className="col-md-6">

                    {/* Criar o card */}
                    <div className="card">
                        <div className="card-body">

                            {/* Criar a barra de proporção */}
                            <div className="d-flex justify-content-between small text-muted">
                                <span>
                                    <i className="bi bi-gender-male text-info me-1"></i>
                                    {percentual(estado.populacao_2022, estado.homens)}% homens
                                </span>
                                <span>
                                    {percentual(estado.populacao_2022, estado.mulheres)}% mulheres
                                    <i className="bi bi-gender-female text-danger ms-1"></i>
                                </span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-info" style={{ width: `${percentual(estado.populacao_2022, estado.homens)}%` }}></div>
                                <div className="progress-bar bg-danger" style={{ width: `${percentual(estado.populacao_2022, estado.mulheres)}%` }}></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-6">

                    {/* Criar o card */}
                    <div className="card">
                        <div className="card-body">

                            {/* Criar a barra de proporção */}
                            <div className="d-flex justify-content-between small text-muted">
                                <span>
                                    <i className="bi bi-building text-warning me-1"></i>
                                    {percentual(estado.populacao_2022, estado.urbana)}% urbana
                                </span>
                                <span>
                                    {percentual(estado.populacao_2022, estado.rural)}% rural
                                    <i className="bi bi-tree text-success ms-1"></i>
                                </span>
                            </div>
                            <div className="progress">
                                <div className="progress-bar bg-warning" style={{ width: `${percentual(estado.populacao_2022, estado.urbana)}%` }}></div>
                                <div className="progress-bar bg-success" style={{ width: `${percentual(estado.populacao_2022, estado.rural)}%` }}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Tabela de municípios */}

            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Município</th>
                            <th>População</th>
                            <th>Homens</th>
                            <th>Mulheres</th>
                            <th>Urbana</th>
                            <th>Rural</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {municipios.map(objMunicipio => (
                            <tr>
                                <td>{objMunicipio.municipio}</td>
                                <td>{formatarValor(objMunicipio.populacao_2022)}</td>
                                <td className="text-info">{formatarValor(objMunicipio.homens)}</td>
                                <td className="text-danger">{formatarValor(objMunicipio.mulheres)}</td>
                                <td className="text-primary">{formatarValor(objMunicipio.urbana)}</td>
                                <td className="text-success">{formatarValor(objMunicipio.rural)}</td>
                                <td>
                                    <Link to={`/municipio/${objMunicipio.id}`} className="btn btn-outline-primary btn-sm">
                                        <i className="bi bi-arrow-right-short"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>



            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    )
}