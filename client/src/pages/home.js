import React, { useEffect, useState } from "react";
import axios from "axios";
import './home.css';
import { getUserID } from "../hooks/getUserID";
import { useCookies } from "react-cookie";

export const Home = () => {
    const [recipes, setRecipes] = useState([]); //keep  track of all the recipes,exist in the database
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,_] = useCookies(["access_token"]);
    
    const userID = getUserID();


    useEffect(() => { //hook that will be called whenever the component(home) is rendered.
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);             
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();

        if(cookies.access_token) fetchSavedRecipe();
    }, []);
    const saveRecipe = async(recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes",{
                recipeID,
                userID,
            }, { headers: {authorization: cookies.access_token}}
            );
            setSavedRecipes(response.data.savedRecipes);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };


    const isRecipeSaved = (id) => savedRecipes.includes(id);
    

    return (
        <div>
            <div className="main">
                <div className="content">
                    <h3 className="head">Kerala Food Recipes</h3>
                    <p className="para">Kerala, fondly known as “God’s Own Country” has always been synonymous to scenic surroundings, temples and beaches. It is also known for its distinct cuisine which is extremely flavoursome and spicy. The traditional food of Kerala is made with spices, which are grown locally in the state. Some of the indispensable list of ingredients to Kerala cuisine are tamarind, rice, coconut, mustard, curry leaves, turmeric and chillies. The majority of Kerala cuisine is non-vegetarian, but it also has some mouth-watering vegetarian recipes.</p>
                </div>
            </div>

            <h2 className="list-head">Recipes</h2>
            <div className="list">
                <div className="food-list">
                    {recipes.map((recipe) => (
                        <div className="details">
                            <li key={recipe._id}>
                                <div className="food-img">
                                    <img className="food-image" src={recipe.imageUrl} alt={recipe.name} />
                                </div>
                                <h2 className="details-head">{recipe.name}</h2>
                                <h3>Instructions</h3>
                                <p className="details-para">{recipe.instructions}</p>
                                <p className="detail-para">Cooking Time: {recipe.cookingTime} (minutes)</p>
                                <button 
                                className="save-recipe" 
                                onClick={()=> saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                                
                                >
                                 {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                    </button>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};