import { collection, getDoc, limit, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db  } from '../Utils/Firebase'
import {  getDocs,   } from "firebase/firestore";
import { Categaries } from '../Utils/Categaries';
import { Button, Image } from 'antd';
 
import { ArrowsAltOutlined, Loading3QuartersOutlined, NotificationTwoTone, TwitchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';


function Home()  {
  const [product, setProducts] = useState([]);
  const navigate = useNavigate()
  useEffect(() =>{
    getProducts()
  },[ ]);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "Products"); // Ensure the collection name is correct
      const q = query(prodCollection, orderBy("createdAt", "desc") ,limit(4));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) => {
        arr.push({ ...product.data(), id: product.id });
      });
      setProducts(arr);
      console.log("arr==>", arr); // Log the fetched products
    } catch (err) {
      console.log(err);
    }
  };
     
  return (
  
      <>
      <div className='btnmain'>
        <h1 className='Heading'> Latest <span className='red0'>items</span> </h1>
      <Button className='btn4' onClick={() => navigate("/Allproducts") }> <ArrowsAltOutlined></ArrowsAltOutlined> See All</Button>
      </div>
      <div className='hellooo'>
 {product.map((data) => ( 
   
 

  <div className='allmain'>
  <div className='productmain' key={data.id}>
    <Image className='image' src={data.img} />
    <h1 className='producttitle'> Product Name: {data.title}</h1>
    <h1 className='productdesc'>Product Description: {data.desc}</h1>
    <h1 className='productprice'> Sale Price: <span className='red'> Rs:{data.price}</span> </h1>
    <h1 className='productloc'> Location: <span className='green'> {data.location}</span>  </h1>
    <h1 className='productdesc'> product Quantity: <span className='red'>{data.quantity}</span> </h1>
    <Button onClick={() => navigate(`/productsdetail/ ${data.id}`)}> More Detail</Button>
  </div>
</div>
 


))}
 
</div>

<h1 className='Heading'> categ<span className='red0'>aries</span></h1>
      <div className='hellooo'>
 {Categaries.map((data) => ( // Use 'products' instead of 'Products'
  <div className='allmain'>
  <div className='productmain' key={data.id}>
   
    <h1>{data. name}</h1>
    <h1>{data.desc}</h1>
    <h1>{data.price}</h1>
    <h1> {data.location} </h1>
    <h1> {data.quantity}</h1>
  </div>
</div>


))}
 
</div>
       </>

  );
};

export default Home;