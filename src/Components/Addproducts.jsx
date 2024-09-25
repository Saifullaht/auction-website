import React from "react";
import { useForm } from "react-hook-form"
import "../App.css"
import { ProductOutlined } from "@ant-design/icons";

//title
// image
//min-price
// description
// loaction
 // category
 //bidding till
 //status
 //quantity
 // createdAt


function  Addproducts(){
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)
      console.log(watch("example")) // watch input value by passing the name of it
   return(
        
       <form className="inputform" onSubmit={handleSubmit(onSubmit)}>
       <input className="input"  placeholder="Product Tittle" {...register(" tittle" , { required: true } ) }   />
        
       {errors.exampleRequired && <span>This field is required</span>}
       <input type="submit" />
       </form>
        
   )
}
export default Addproducts;