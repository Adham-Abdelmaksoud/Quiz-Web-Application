import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCookie, setCookie } from "../common/CookieManager";

const Info = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmitInfo = () => {
        const name = document.getElementById('name_field').value;
        if(name == ''){
            setError(true);
            return;
        }
        const timer = document.getElementById('timer_field').value;//.split(' ')[0];
        const info = {
            name: name,
            timer: timer
        }
        setCookie('info', info);
        setCookie('date', new Date());
        clearCookie('answers');
        navigate('/questions/1');
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen p-7 space-y-10">
            <div className="flex flex-col items-center space-y-2">
                <section className="space-x-2">
                    <label className="text-3xl align-middle" htmlFor="name_field">Name:</label>
                    <input className="textbox h-9 w-80 text-xl" id="name_field" type="text"/>
                </section>

                <p className={"text-red-700" + (error? "": " hidden")}>
                    Name Field Is Required!!
                </p>
            </div>

            <select id="timer_field" name="timer" className="dropdown">
                <option value="no timer">no timer</option>
                <option value="10 seconds">10 seconds</option>
                <option value="20 seconds">20 seconds</option>
                <option value="40 seconds">40 seconds</option>
                <option value="1 minute">1 minute</option>
            </select>

            <button className="button" onClick={handleSubmitInfo}>Start Quiz</button>
        </main>
    );
}
 
export default Info;