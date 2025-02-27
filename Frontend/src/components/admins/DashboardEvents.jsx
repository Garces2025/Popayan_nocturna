import React, { useEffect } from "react";
import DashboardLeftSide from "./DashboardLeftSide";
import axios from "axios";
import Spinner from "../../partials/Spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const DashboardEvents = () => {
    const dispatch = useDispatch();
    const events = useSelector(store=>store.events);
    const user = useSelector(store => store.user);
    const isAuthenticated = useSelector(store => store.isAuthenticated)
    const navigate = useNavigate();
    const checkIsAuthenticated = () => {
        if(!isAuthenticated || user.role !== 'admin') navigate('/users/login')
    }

    const handleDelete = async (event_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');
        if(confirmDelete){
            try{
                const res = await axios.delete(`http://localhost:8000/api/events/destroy/${event_id}`);
                const {success, events} = res.data;
                if(success){
                    dispatch( {type:'setEvents', payload:{events}} )
                }
            }catch(err){
                console.log(err.message);
            }
        }
    }

    useEffect(()=>{
        checkIsAuthenticated();
    }, [])
    
    return(
        <div className="content dashboardEvents">
            <DashboardLeftSide />
            <div className="rightSide">
                <table style={{width: '95%'}} className="table table-hover mx-auto my-5">
                    <thead className="text-muted">
                        <tr>
                            <td>#</td>
                            <td>Perfil</td>
                            <td>Titulo</td>
                            <td>Genero</td>
                            <td>Precio</td>
                            <td>Color</td>
                            <td>Eventos</td>
                            <td>Acciones</td>
                        </tr>
                    </thead>
                    <tbody>
                        {events == null
                            ?   <tr><td colSpan={8}><Spinner/></td></tr>
                            :   events.map( event =>
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>
                                        {event.imgPath == null 
                                            ?   <i className="fa-solid fa-circle-user"></i>
                                            :   <img src={`/events_img/${event.imgPath}`} alt="events ima" />
                                        }
                                    </td>
                                    <td>{event.title}</td>
                                    <td>{event.gender}</td>
                                    <td>{event.price}</td>
                                    <td>{event.color}</td>
                                    <td>{event.brand.title}</td>
                                    <td><input onClick={()=>handleDelete(event.id)} className="delete" type="button" value='Delete' /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardEvents;