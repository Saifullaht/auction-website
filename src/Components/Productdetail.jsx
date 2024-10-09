import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Utils/Firebase";
import { doc, getDoc } from "firebase/firestore";

function Productdetail(){
    const {id} = useParams()
    const [ product , setProduct] = useState({})
    const [ Loading , setLoading] = useState(false)
    useEffect(() => {
        getproductInfo()
    }, [])

    const getproductInfo = async () =>{
        try{
            const docRef = doc(db , "Products" , id);
            const productinfo = await getDoc(docRef)
console.log(productinfo.data());

        }
        catch(err){
            console.log(err);
            
        }
    }
   return(
       <>
       
<h1> product detail </h1>
       </>
   )
}
export default Productdetail;