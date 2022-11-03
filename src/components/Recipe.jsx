import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import timerIcon from "../assets/timer.svg";
import caloriesIcon from "../assets/calories.svg";
import ingredientsIcon from "../assets/ingredients.svg";

const Recipe = ({ recipe }) => {
    const result = Object.values(recipe);
    const [flip, setFlip] = useState(false);


    return (
        <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
            <div onClick={() => setFlip(!flip)}>
                <img className="recipe_image" src={result[0].image}
                alt={result[0].label} />
                <br/>

                <div className="details">
                    <div className="vertical">
                        <div className="overview timer">
                            <img src={timerIcon} alt="timer icon" />
                            <p>{result[0].totalTime} mins</p>
                        </div>
                        <div className="overview calories">
                            <img src={caloriesIcon} alt="calories icon" />
                            <p>{Math.ceil(result[0].calories).toLocaleString()} CALORIES</p>
                        </div>
                        <div className="overview ingredients">
                            <img src={ingredientsIcon} alt="ingredients icon" />
                            <p>{result[0].ingredients.length} INGREDIENTS</p>
                        </div>
                    </div>
                    <h3>{result[0].label}</h3>
                </div>
            </div>
            <div onClick={() => setFlip(!flip)}>
                <div className="details2">
                    <h1 className="details_label">{result[0].label} Ingredients</h1>

                    <div className="details_wrapper">
                    {result[0].ingredientLines.map((ingredient, index) => (
                        <p className="details_text" key={index}>{ingredient}.</p>
                    ))}
                    </div>

                    <a href={`https://www.saveur.com/article/Recipes/${result[0].label}`} className="details_btn">View Preparation</a>
                </div>
            </div>
        </ReactCardFlip>
    );
}

export default Recipe;