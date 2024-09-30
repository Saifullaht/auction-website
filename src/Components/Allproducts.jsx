import { collection, getDoc, limit, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db  } from '../Utils/Firebase'
import {  getDocs,   } from "firebase/firestore";
import { Categaries } from '../Utils/Categaries';
import { Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowsAltOutlined, NotificationTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime' // ES 2015
dayjs.extend(relativeTime)


function AllProducts()  {
  const [product, setProducts] = useState([]);
  const navigate = useNavigate( )
  useEffect(() =>{
    getProducts()
  },[ ]);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "Products"); // Ensure the collection name is correct
      const q = query(prodCollection, orderBy("createdAt", "desc")  );
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
        <h1>  All items</h1>
       
      </div>
      <div className='hellooo'>
 {product.map((data) => ( // Use 'products' instead of 'Products'

<div className='allmain' key={data.id}>
  <div className='productmain'key={ data.id}>
    <Image className='image' src={data.img} />
    <Link to={`/productsdetail/ ${data.id}`}>
    <h1>Date : {dayjs().to(data.createdAt.toDate()) }</h1>
    <h1>{data.title}</h1>
    <h1>Product Description: {data.desc}</h1>
    <h1>Product Price: {data.price}</h1>
    <h1>Product Location: {data.location} </h1>
    <h1> product Quantity:  {data.quantity}</h1>
  </Link>
  </div>
</div>

   

))}
 
</div>
 
       </>

  );
};

export default AllProducts;