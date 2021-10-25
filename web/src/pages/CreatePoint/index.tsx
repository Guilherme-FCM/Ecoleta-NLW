import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import axios from "axios";
import api from '../../services/api'

import './styles.css'
import logo from '../../assets/logo.svg'

interface Item {
    id: number
    title: string
    image_url: string
}

interface IbgeUFRespnse {
    sigla: string
    nome: string
}

interface IbgeCityResponse {
    nome: string
}

const CreatePoint = () => {
    const [ initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([0, 0])
    const [ items, setItems ] = useState<Item[]>([])
    const [ UFs, setUFs ] = useState<IbgeUFRespnse[]>([])
    const [ cities, setCities ] = useState<string[]>([])
    const [ selectedUF, setSelectedUF ] = useState("0")
    const [ selectedCity, setSelectedCity ] = useState("0")
    const [ selectedItems, setSelectedItems ] = useState<number[]>([])
    const [ formData, setFormeData ] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const history = useHistory()

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get<IbgeUFRespnse[]>(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        ).then(response => {
            setUFs(response.data.map(uf => ({ sigla: uf.sigla, nome: uf.nome }) ));
        })
    }, [])

    useEffect(() => {
        axios.get<IbgeCityResponse[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`
        ).then(response => {
            setCities(response.data.map(city => city.nome))
        })
    }, [selectedUF])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInitialPosition([ latitude, longitude ])
        })
    }, [])

    function HandleMapClickComponent() {
        useMapEvents({ click: e => {
            const { lat, lng } = e.latlng
            setSelectedPosition([ lat, lng ])
        }})
        return null
    }

    function handleSelectedUF(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUF(event.target.value)
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target 
        setFormeData({ ...formData, [name]: value })
    }

    function handleSelectItem(id: number){
        if (selectedItems.includes(id)) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        }
        else setSelectedItems([...selectedItems, id ])
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault()
        const [ latitude, longitude ] = selectedPosition
        const data = {
            ...formData,
            uf: selectedUF,
            city: selectedCity,
            latitude, longitude,
            items: selectedItems
        }
        await api.post('points', data)
        alert("Ponto de coleta criado!")
        history.push('/')
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br /> Ponto de Coleta</h1>

                <fieldset>
                    <legend> <h2>Dados</h2> </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input onChange={handleInputChange} type="text" name="name" id="name"/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input onChange={handleInputChange} type="email" name="email" id="email"/>
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Watsapp</label>
                            <input onChange={handleInputChange} type="text" name="whatsapp" id="whatsapp"/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend> 
                        <h2>Endereço</h2> 
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer center={[-10.1884485,-48.3090716]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        /> 
                        <Marker position={selectedPosition}/>
                        <HandleMapClickComponent />
                    </MapContainer> 

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select onChange={handleSelectedUF} name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                {UFs.map(uf => (
                                    <option key={uf.sigla} value={uf.sigla}>{`${uf.nome} (${uf.sigla})`}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select onChange={handleSelectedCity} name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend> 
                        <h2>Ítens</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)}
                                className={ selectedItems.includes(item.id) ? "selected" : '' }
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint