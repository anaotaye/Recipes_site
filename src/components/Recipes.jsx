import { useState, useEffect } from "react";
import Recipe from "./Recipe";
import Loader from "./Loader/Loader";
import searchIcon from "../assets/searchIcon.svg";
import './recipes.css';

const API_KEY = 'c4c22ec12c8a41075c69baa0a0394957';
const API_ID = '249489fa';
const ACCESSPOINT = 'https://api.edamam.com/search';

console.log(API_KEY);


const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const searchApi = async (searchterm) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${ACCESSPOINT}?q=${searchterm}&app_id=${API_ID}&app_key=${API_KEY}`);
            
            const data = await response.json();
            console.log(data.hits);
            setIsLoading(false);
            setRecipes(data.hits);
        } catch (error) {
            console.log(error);
            setErrorMessage("Unable to fetch recipes");
            setIsLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        // event.preventDefault();
        if (event.key === "Enter") {
            searchApi(`${searchTerm}`);
            setSearchTerm("");
        }
    }

    useEffect (() => {
        searchApi('soup');
    }, [])

    return (
        <>
        <div className="header">
            <div className="header_text">
                <h1>RECIPES</h1>
                <h2>Recipes that make you yearn for more.</h2>
                <div className="search">
                    <img src={searchIcon} alt="search" />
                    <input
                    type="text"
                    placeholder="Search for a recipe"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>

        {recipes?.length > 0 ? ( 
            <div className="recipes">
                {isLoading ? <Loader /> :
                recipes.map((recipe, index) => (
                    <div className="recipe">
                    {/* {console.log(Object.values(recipe))} */}
                    <Recipe recipe={recipe} key={new Date().getTime()} />
                    </div>
                ))}
            </div>
            ) : (
                <div>
                    <h2>{errorMessage}</h2>
                </div>
            )}
        </>
    );
};

export default Recipes;
