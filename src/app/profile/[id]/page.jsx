export default function UserProfile({params}){
    return (
        <div>
            <h1>Profile</h1>
            <p>{params.id}'s Profile Page </p>
        </div>
    )
}