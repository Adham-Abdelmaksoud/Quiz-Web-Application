import { useState, useEffect } from "react";
import { getCookieByName, setCookie } from "../common/CookieManager";
import { useNavigate, useParams } from "react-router-dom";

const Questions = () => {
    const [questions, setQuestions] = useState(null);
    const [choice, setChoice] = useState('');

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [started, setStarted] = useState(false);

    const navigate = useNavigate();
    let { id } = useParams();
    id = Number(id);

    let num2str = (num) => {
        if(num < 10){
            return `0${num}`;
        }
        else{
            return `${num}`;
        }
    }

    let addChoiceToAnswers = () => {
        let answers = [];
        if(getCookieByName('answers') === ''){
            answers = [choice];
        }
        else{
            answers = getCookieByName('answers');
            answers.push(choice);
        }
        setCookie('answers', answers);
        setChoice('');
        console.log(answers);
    }

    let handleSubmitAnswer = () => {   
        addChoiceToAnswers();
        
        if(id < questions.length){
            navigate(`/questions/${id+1}`);
            setStarted(false);
        }
        else{
            navigate('/review');
        }
    }

    useEffect(() => {
        if(getCookieByName('questions') === ''){
            fetch('https://the-trivia-api.com/v2/questions')
                .then((res) => res.json())
                .then((data) => {
                    let transformed_data = data.map((e) => {
                        e.incorrectAnswers.splice(Math.random()*4, 0, e.correctAnswer);
                        return {
                            question: e.question.text,
                            choices: e.incorrectAnswers,
                            correct: e.correctAnswer,
                            difficulty: e.difficulty
                        }
                    });
                    setCookie('questions', transformed_data);
                    setQuestions(transformed_data);
                })
        }
        else{
            let questions = getCookieByName('questions');
            setQuestions(questions);
        }
    }, []);

    useEffect(() => {
        if(!started){
            let info = getCookieByName('info');
            let timer = info.timer.split(' ');
            if(timer[0] !== 'no'){
                if(timer[1] === 'minutes' || timer[1] === 'minute'){
                    setMinutes(parseInt(timer[0]));
                }
                else if(timer[1] === 'seconds'){
                    setSeconds(parseInt(timer[0]));
                }
                setStarted(true);
            }
        }
        else{
            let timeout_id = setTimeout(() => {
                if(seconds === 0){
                    if(minutes === 0){
                        addChoiceToAnswers();
                        navigate(`/questions/${id+1}`);
                        setStarted(false);
                    }
                    else{
                        setMinutes(minutes-1);
                        setSeconds(59);
                    }
                }
                else{
                    setSeconds(seconds-1);
                }
            }, 1000);

            return () => clearTimeout(timeout_id);
        }
    }, [started, minutes, seconds]);

    return (
        questions && (
            <main className="flex flex-col justify-center items-center h-screen p-7 space-y-10">
                <div className="space-y-6">
                    <p className="text-center text-2xl">
                        difficulty: {questions[`${id-1}`].difficulty}
                    </p>
                    <h1 className="text-center text-5xl">
                        {questions[`${id-1}`].question}
                    </h1>
                </div>
                <p className="fixed top-2 left-12 text-4xl">
                    {`${num2str(minutes)}:${num2str(seconds)}`}
                </p>
                <div className="flex flex-col items-start">
                { questions[`${id-1}`].choices.map((e) => {
                    return (
                    <div key={e} className="flex flex-row space-y-2">
                        <input id="choices" className="mr-4 w-4" type="radio" name="choices" value={e}
                            checked={choice === e} onChange={(e) => setChoice(e.target.value)}/>
                        <p className="text-3xl">{e}</p>
                    </div>
                    )
                }) }
                </div>
                <button className="button fixed bottom-12 right-28" onClick={handleSubmitAnswer}>
                    Next
                </button>
            </main>
        )
    );
}
 
export default Questions;