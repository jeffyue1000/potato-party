import jwt from "jsonwebtoken";

export const tokenData = (request) => {
    try{
        const encodedToken = request.cookies.get("userInfo")?.value || "";
        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET);

        return decodedToken.id;  
    } catch(error){
        throw new Error(error.message);
    }
}