import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import blackLogo from '../storage/logo/blackLogo-removebg.png';
import Search from "../components/events/Search";
import UserIcon from "../components/users/UserIcon";
import { useSelector } from "react-redux";

const Header = () => {
    const brands = useSelector(store => store.brands);
    const [displayBrands, setDisplayBrands] = useState(false);
    const [displaySearch, setDisplaySearch] = useState(false);
    const user = useSelector(store => store.user);

    return(
        <header>
            <div className="menu" onClick={()=>{document.querySelector('body').classList.toggle('open')}}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="logoP">
                <NavLink to="/">
                    <img src={blackLogo} alt="" />
                </NavLink>
            </div>

            <nav className="nav1">
                <NavLink to="/">Inicio</NavLink>
                <span className={displayBrands===false ? 'brands' : 'brands active'} onClick={()=>setDisplayBrands(displayBrands===false ? true : false)}>
                    Eventos <i className={`fa-solid fa-chevron-${displayBrands===false ? 'up' : 'down'}`}></i> </span>
                <div className={ displayBrands===false ? '' : 'brandDiv' }>
                    {brands!=null && 
                        brands.map( brand =>
                            <NavLink onClick={()=>setDisplayBrands(false)} key={brand.id} to={`/brands/${brand.title}`}>{brand.title}</NavLink>
                        )
                    }
                </div>
                {   
                    (user!=null && user.role === 'admin')
                    &&
                    <NavLink to="/admins/dashboard"><i className="fa-solid fa-sliders"></i> Panel de Control</NavLink>
                }
            </nav>

            <nav className="nav2">
                <span className="searchBtn" onClick={()=>setDisplaySearch(true)} >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <div className={displaySearch===false ? 'searchCadre' : 'searchCadre open'} >
                    <i className="fa-solid fa-xmark" onClick={()=>setDisplaySearch(false)} ></i>
                </div>
                <Search setDisplaySearch={setDisplaySearch} displaySearch={displaySearch} />
                <UserIcon />

            </nav>
        </header>
    )
}

export default Header;
