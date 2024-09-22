import { Link } from "react-router-dom";

const Scoreboard = () => {
    const scores = JSON.parse(localStorage.getItem('scores'));
    let scoresList = [];
    Object.keys(scores).forEach((name) => {
        Object.keys(scores[name]).forEach((date) => {
            let instance = [name, date.slice(0,date.length-1).replace('T', ' / ')];
            Object.values(scores[name][date]).forEach((val) => {
                instance.push(val);
            });
            scoresList.push(instance);
        });
    });

    return (
        <main>
            <h1 className="subtitle mt-3 mb-4">
                Scoreboard
            </h1>

            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Timer</th>
                    <th>Score</th>
                </tr>

                {
                    scoresList.map((e) => {
                        return (
                            <tr key={e}>
                                <td>{e[0]}</td>
                                <td>{e[1]}</td>
                                <td>{e[2]}</td>
                                <td>{e[3]}</td>
                            </tr>
                        )
                    })
                }
            </table>

            <Link to="/info">
                <button className="button fixed bottom-12 right-20 bg-white">Try Again</button>
            </Link>
        </main>
    );
}
 
export default Scoreboard;