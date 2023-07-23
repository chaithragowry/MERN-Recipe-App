import React, { useEffect, useState } from "react";
import axios from "axios";
import './saved-recipes.css'

import { getUserID } from "../hooks/getUserID";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]); 

    const userID = getUserID();


    useEffect(() => { //hook that will be called whenever the component(home) is rendered.
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);             
                setSavedRecipes(response.data.savedRecipes);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSavedRecipe();

    }, []);
    

    return (
        <div>
            <h2 className="list-head">Saved Recipes</h2>
            <div className="list">
                <div className="food-list">
                    {savedRecipes.map((recipe) => (
                        <div className="details-saved">
                            <li key={recipe._id}>
                                <div className="food-img">
                                    <img className="food-image" src={recipe.imageUrl} alt={recipe.name} />
                                </div>
                                <h2 className="details-head">{recipe.name}</h2>
                                <h3>Instructions</h3>
                                <p className="details-inst">{recipe.instructions}</p>
                                <p className="detail-para">Cooking Time: {recipe.cookingTime} (minutes)</p>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};