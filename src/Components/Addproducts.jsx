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

import React from "react";
import { useForm } from "react-hook-form";
import "./addproduct.css";
import { Categaries } from "../Utils/Categaries";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Utils/Firebase";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Addproducts() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const productCollectionRef = collection(db, "Products"); // Ensure it is "products"
    const obj = {
      ...data,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      status: "active",
    };
    addDoc(productCollectionRef, obj).then(() => {
      reset();
      message.success("Product Added Successfully");
      navigate("/");
    });
  };

  return (
    <form className="inputform" onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        placeholder={"Product Title"}
        obj={{ ...register("title", { required: true, maxLength: 30 }) }}
        errorMsg={"Title should be between 1 to 30"}
        formKey={"title"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Description"}
        obj={{ ...register("desc", { required: true }) }}
        errorMsg={"Description is required"}
        formKey={"desc"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Price"}
        obj={{ ...register("price", { required: true }) }}
        errorMsg={"Price is required"}
        formKey={"price"}
        type={"number"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Image"}
        obj={{ ...register("img", { required: true }) }}
        errorMsg={"Image is required"}
        formKey={"img"}
        type={"url"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Location"}
        obj={{ ...register("location", { required: true }) }}
        errorMsg={"Location is required"}
        formKey={"location"}
        errors={errors}
      />
      <CustomInput
        placeholder={"Product Quantity"}
        obj={{ ...register("quantity", { required: true }) }}
        errorMsg={"Quantity is required"}
        formKey={"quantity"}
        errors={errors}
      />
      <div className="mx-4">
        <select className="categaries" {...register("Categaries")}>
          {Categaries.map((data) => (
            <option key={data.slug} value={data.slug}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
      <input className="Btn100" type="submit" />
    </form>
  );
}

export default Addproducts;

const CustomInput = ({ formKey, obj, placeholder, errors, errorMsg, type }) => {
  return (
    <div className="flex flex-col mx-4">
      <input
        className="input"
        placeholder={placeholder}
        type={type || "text"}
        {...obj}
      />
      {errors[formKey] && <span className="errorsmsg">{errorMsg}</span>}
    </div>
  );
};
