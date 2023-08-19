import axios from "axios";
import { useRouter } from "next/navigation";
import "./watchroom.css";

export function InvalidRoomPage(){
    const router = useRouter();
    const logout = async() => {
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error){
            console.log(error.message);
        }
    }
    return(
        <div className="container">
            <h1 className="no-room-msg">
                Whoops! Looks like this room doesn't exist.
                <br></br>
                Maybe try a different code?
            </h1>
            <button className="dashboard-btn" onClick={() => router.push("/dashboard")}>Return to Dashboard</button>
        </div>
    )
}