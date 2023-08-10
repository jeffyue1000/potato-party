"use client"
import { useRouter } from 'next/navigation'
import "./home.css"

export default function Home() {
  const router = useRouter();

  return(
    <div className="container">
        <div className="title">Potato Couch Logo</div>
        <div className="home-box">
            <h1 className="home-header">Welcome to Potato Couch!</h1>
            <div className="home-directions">
                <button className="profile-btn" onClick={() => {router.push("/login")}}>Login</button>
                <button className="logout-btn" onClick={() => {router.push("/signup")}}>Signup</button>
            </div>
        </div>
    </div>
  )
}