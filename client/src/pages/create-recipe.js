import React, { useState } from "react";
import './create-recipe.css';
import food from '../images/food.jpg';
import axios from "axios";
import { getUserID } from "../hooks/getUserID";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const CreateRecipe = () => {
    const userID = getUserID();
    const [cookies,_] = useCookies(["access_token"]);
    
    const [recipe, setRecipe] = useState({
        name: "",
        description:"",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (event,idx) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
        
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    };
    
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes",recipe,{
              headers: {authorization: cookies.access_token},
            });
            alert("Recipe is created");
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };
    console.log(recipe);
    return (
        <div className="mainpage">
            <img className="form-img" src={food} />

            <div className="sub-left">
                <h2>Create  Recipe</h2>
                <div>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={recipe.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={recipe.description} onChange={handleChange} ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label>
                            {recipe.ingredients.map((ingredient,idx) =>(
                             <input
                             key={idx}
                             type="text"
                             name="ingredients"
                             value={ingredient}
                             onChange={(event) => handleIngredientChange(event,idx)}/>   
                            ))}
                            <button className="add" onClick={addIngredient} type="button">
                                Add Ingredients
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange} ></textarea>

                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input type="text" id="imageUrl" name="imageUrl" value={recipe.imageUrl} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                            <input type="number" id="cookingTime" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} />
                        </div>
                        
                        <button className="recipe" type="submit">
                                Create Recipe
                        </button>
                        

                    </form>

                </div>
            </div>


        </div>

    );
};
