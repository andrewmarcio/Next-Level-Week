import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../componentes/Header';
import Dropzone from '../../componentes/Dropzone';
import LogMessage from '../../componentes/LogMessage';
import api from '../../services/api';
import './style.css';

interface Item {
    id: number;
    title: string;
    img_url: string;
}

interface IBGEUF {
    sigla: string
}

interface IBGECITEIS {
    nome: string;
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setIUfs] = useState<string[]>([]); 
    const [cities, setCities] = useState<string[]>([]);
    const [status, setStatus] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [initialMapArea, setInitialMapArea] = useState<[number,number]>([-15.8172633, -47.8807876]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    });

    const [selectedUf, setSelectedUf] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');
    const [selectedMapPoint, setSelectedMapPoint] = useState<[number,number]>([-15.8172633, -47.8807876]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>()

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;

            setInitialMapArea([latitude, longitude]);
            setSelectedMapPoint([latitude, longitude]);
        });
    }, []);

    useEffect(()=>{
        api.get('items')
        .then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response =>{
            const ufInitials = response.data.map(uf => uf.sigla);

            setIUfs(ufInitials);
        });
    }, []);

    useEffect(()=>{
        if(selectedUf === '0'){
            return;
        }

        axios.get<IBGECITEIS[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response =>{
            const cityName = response.data.map(city => city.nome);
            
            setCities(cityName);
        });
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        
        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        
        setSelectedCity(city);
    }
    function handleMapPoint(event: LeafletMouseEvent){
        setSelectedMapPoint([
            event.latlng.lat,
            event.latlng.lng,
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value});
    }

    function handleSelectedItem (itemId: number){

        const alreadySelected = selectedItems.findIndex(item => item === itemId);

        if (alreadySelected >= 0) {
            const itemFilter = selectedItems.filter(item => item !== itemId);

            setSelectedItems(itemFilter);
        }else{
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedMapPoint;
        const items = selectedItems;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        
        if(selectedFile){
            data.append('image', selectedFile);
        }

        const pointregistred = await api.post('points', data);
        
        console.log(pointregistred);
        
        if (pointregistred.data.status === 'success') {
            setStatus(pointregistred.data.status);
            setMessage(pointregistred.data.message); 
            setTimeout(()=>{
                 history.push('/');
            }, 1500);  
        }else{
            setStatus(pointregistred.data.status);
            setMessage(pointregistred.data.message); 
            setTimeout(()=>{
                setStatus('');
                setMessage(''); 
            }, 1500); 
        }
    }

    return (
        <div id="page-create-point">
            <LogMessage status={status} message={message}/>
            <div className="container">
                <Header icon={icons.faArrowLeft} headerRedirectText="Retornar a Home" redirect="/" />
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br />ponto de coleta</h1>                    

                    <Dropzone onFileUploaded={setSelectedFile}/>
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione endereço no mapa</span>
                        </legend>

                        <Map center={initialMapArea} zoom={15} onClick={handleMapPoint}>
                            <TileLayer 
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={selectedMapPoint} >
                                <Popup>
                                    Minha Rua
                                </Popup>
                            </Marker>
                        </Map>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                    <option value="0">Selecione um estado</option>
                                    {ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
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
                            <h2>Ítens de coleta</h2>
                            <span>Selecione um ou mais ítens abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            {items.map(item => (
                                <li 
                                    key={item.id} 
                                    onClick={()=>handleSelectedItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected': ''}
                                >
                                    <img src={item.img_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>
                            ))}  
                        </ul>
                    </fieldset>

                    <button type="submit">Cadastrar ponto de coleta</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePoint;