import { getCookieByName } from "../common/CookieManager";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Review = () => {
    const questions = getCookieByName('questions');
    const answers = getCookieByName('answers');
    const info = getCookieByName('info');
    const date = getCookieByName('date');
    
    let score = 0;
    for(let i=0 ; i<questions.length ; i++){
        if(answers[i] === questions[i].correct){
            score++;
        }
    }
    score = `${score} out of ${questions.length}`;

    let scores = localStorage.getItem('scores');
    if(scores == null){
        scores = {};
    }
    else{
        scores = JSON.parse(scores);
    }
    if(!(info.name in scores)){
        scores[info.name] = {};
    }
    scores[info.name][date] = {
        timer: info.timer,
        score: score
    }
    localStorage.setItem('scores', JSON.stringify(scores));

    return (
        <main>
            <h1 className="subtitle mt-3">
                Review
            </h1>
            <h2 className="text-center text-2xl">
                {`Score: ${score}`}
            </h2>

            <section className="mb-5">
            { questions.map((question, i) => {
                return (
                    <>
                        <hr className="border border-gray-400 my-3"/>

                        <div className="mx-5">
                            <h1 className="text-xl">
                                {question.question}
                            </h1>
                            {  question.choices.map((choice) => {
                                return (
                                    <div key={question} className="flex flex-row space-y-2">
                                        { (choice !== answers[i] && choice === question.correct) &&
                                            <input className="mr-4 w-3" type="radio"
                                                checked={true} disabled/>
                                        }
                                        { (choice === answers[i] || choice !== question.correct) &&
                                            <input className="mr-4 w-3" type="radio"
                                                checked={choice === answers[i]}/>
                                        }
                                            
                                        <p className="text-lg align-top">{choice}</p>

                                        { choice === answers[i] && choice !== question.correct &&
                                            <IconContext.Provider value={{
                                                color: 'red',
                                                className: 'react-icons'
                                            }}>
                                                <RiCloseLargeFill />
                                            </IconContext.Provider>
                                        }
                                        { choice === answers[i] && choice === question.correct &&
                                            <IconContext.Provider value={{
                                                color: 'green',
                                                className: 'react-icons'
                                            }}>
                                                <FaCheck />
                                            </IconContext.Provider>
                                        }
                                    </div>
                                )
                            }) }
                        </div>
                    </>
                )
            }) }
            </section>

            <Link to="/scoreboard">
                <button className="button fixed bottom-12 right-20 bg-white">Finish</button>
            </Link>
        </main>
    );
}
 
export default Review;