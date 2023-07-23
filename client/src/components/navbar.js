import React from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './navbar.css';

export const Navbar = () => {
    const[cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate()

    const logout = () =>{
        setCookies("access_token","")
        window.localStorage.removeItem("userID")
        navigate("/auth")
    }

    return (
        <div className="navbar">
            <h3 className="main-head">Foodie</h3>
            <ul className="nav-links">
            <NavLink to="/" className="links"><li>Home</li></NavLink>
            <NavLink to="/create-recipe" className="links"> <li>Create Recipe</li></NavLink>
            
            {!cookies.access_token ? (
                 <NavLink to="/auth" className="links"> <li>Login/Register</li></NavLink>
            ) :(
                <>
                <NavLink to="/saved-recipes" className="links"> <li>Saved Recipes</li></NavLink>
                <button className="log" onClick={logout}> Logout</button>
                </>
            )}
           
            </ul>
        </div>

    );
};