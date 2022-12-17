// Imports
import { NextApiRequest, NextApiResponse } from "next";


export default function(req: NextApiRequest, res:NextApiResponse){
    
    if (req.method === "POST"){
        res.json({status: 'ok'})
    } else if (req.method === "GET"){
        res.status(405).end("Method not allowed, use POST method instead");
    } else {
        res.status(400).end("Bad Request");
    }
}