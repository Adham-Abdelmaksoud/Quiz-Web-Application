import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="flex justify-center flex-col items-center h-screen p-0 space-y-10">
            <h1 className="title">Quiz Application</h1>

            <Link to="/info">
                <button className="button">Get Started</button>
            </Link>
        </main>
    );
}
 
export default Home;