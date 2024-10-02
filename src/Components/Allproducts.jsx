import { collection, getDoc, limit, orderBy, query } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db  } from '../Utils/Firebase'
import {  getDocs,   } from "firebase/firestore";
import { Categaries } from '../Utils/Categaries';
import { Button, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowsAltOutlined, Loading3QuartersOutlined, NotificationTwoTone, PicLeftOutlined } from '@ant-design/icons';
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
        <h1 className='Heading'> All <span className='red0'>items</span> </h1>
       
      </div>
      <div className='hellooo'>
 {product.map((data) => ( // Use 'products' instead of 'Products'

<div className='allmain' key={data.id}>
  <div className='productmain'key={ data.id}>
    <Image className='image' src={data.img} />
     
    <h1 className='date'> Date : {dayjs().to(data.createdAt.toDate()) }</h1>
    <h1  className='producttitle'> Product Name:{data.title}</h1>
    <h1 className='productdesc'> Product Description: {data.desc}</h1>
    <h1  className='productprice'> Sale Price:  <span className='red'> Rs:{data.price}</span> </h1>
    <h1 className='productloc'>Product Location: <span className='green'> {data.location}</span>  </h1>
    <h1 className='productdesc'> product Quantity:  <span className='red'>{data.quantity}</span></h1>
     <Button onClick={() => navigate(`/productsdetail/ ${data.id}`)}> More Detail</Button>
  </div>
</div>

    

))}
 
</div>
 
       </>

  );
};

export default AllProducts;