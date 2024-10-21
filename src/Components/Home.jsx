import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../Utils/Firebase';
import { Categaries } from '../Utils/Categaries';
import { Button, Image } from 'antd';
import { ArrowsAltOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider'; // Import your ImageSlider component

 

function Home() {
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();
  
  // Sample images for the slider
  const sliderImages = [
    'https://img.freepik.com/premium-photo/young-woman-enjoys-shopping-with-colorful-bags-yellow-background_100209-22615.jpg?w=1060',
    'https://english.onlinekhabar.com/wp-content/uploads/2022/02/Main-scaled-e1644837558619-2048x971.jpg',
    'https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/09/07/22/34/car-race-438467_1280.jpg',
  ];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const prodCollection = collection(db, "Products");
      const q = query(prodCollection, orderBy("createdAt", "desc"), limit(6));
      const docs = await getDocs(q);
      const arr = [];
      docs.forEach((product) => {
        arr.push({ ...product.data(), id: product.id });
      });
      setProducts(arr);
    } catch (err) {
      console.error(err);
    }
  };
   
  return (
    <div className='main22'>
      <div className='wellcome'>
        <p className='autoo'> Welcome <span className='orange'>To</span> Bid - <span className='orange'>Bazar</span>!</p>
        <p className='auto2'> Here, you can discover amazing deals and participate in exciting auctions for a wide range of products. Whether you're looking for electronics, fashion, or unique collectibles, Bid Bazar is your go-to platform for unbeatable prices and thrilling bidding experiences. <br />
          <Button type="primary" className='btn10' onClick={() => navigate("/About")}>
            <UserAddOutlined /> About Us
          </Button>
        </p>
      </div>

      {/* Image Slider */}
      <ImageSlider images={sliderImages} />

      <div className='btnmain'>
        <div className='btnmain2'>
          <h1 className='Heading'> Latest <span className='red0'>items</span></h1>
          <Button className='btn4' onClick={() => navigate("/Allproducts")}>
            <ArrowsAltOutlined /> See All
          </Button>
        </div>
      </div>

      <div className='hellooo'>
        {product.map((data) => (
          <div className='allmain' key={data.id}>
            <div className='productmain'>
              <Image className='image' src={data.img} />
              <h1 className='producttitle'> Product Name: {data.title}</h1>
              <h1 className='productdesc'> Product Description: {data.desc}</h1>
              <h1 className='productprice'> Sale Price: <span className='red'> Rs: {data.price}</span></h1>
              <h1 className='productdesc'> Product Quantity: <span className='red'>{data.quantity}</span></h1>
            </div>
          </div>
        ))}
      </div>
        
      <section className="text-gray-600 bg-white body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
      <div className="w-full sm:p-4 px-4 mb-6">
        <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
          Moon hashtag pop-up try-hard offal truffaut
        </h1>
        <div className="leading-relaxed">
          Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar
          neutra sustainable fingerstache kickstarter.
        </div>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
        <p className="leading-relaxed">Users</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2>
        <p className="leading-relaxed">Subscribes</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
        <p className="leading-relaxed">Downloads</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
        <p className="leading-relaxed">Products</p>
      </div>
    </div>
    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
      <img
        className="object-cover object-center w-full h-full"
        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D"
        alt="stats"
      />
    </div>
  </div>
</section>

<section className="text-gray-600 bg-slate-200 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap">
    <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
      <img
        className="object-cover object-center w-full h-full"
        src="https://watermark.lovepik.com/photo/40027/7318.jpg_wh1200.jpg"
        alt="stats"
      />
    </div>
    <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pl-10">
      <div className="w-full sm:p-4 px-4 mb-6">
        <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
          Moon hashtag pop-up try-hard offal truffaut
        </h1>
        <div className="leading-relaxed">
          Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar
          neutra sustainable fingerstache kickstarter.
        </div>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">2.7K</h2>
        <p className="leading-relaxed">Users</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">1.8K</h2>
        <p className="leading-relaxed">Subscribes</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">35</h2>
        <p className="leading-relaxed">Downloads</p>
      </div>
      <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
        <h2 className="title-font font-medium text-3xl text-gray-900">4</h2>
        <p className="leading-relaxed">Products</p>
      </div>
    </div>
  </div>
</section>


      {/* <h1 className='Heading1'> Categories</h1>
      <div className='hellooo2'>
        {Categaries.map((data) => (
          <div className='allmain2' key={data.id}>
            <div className='productmain'>
              <h1>{data.name}</h1>
              <h1>{data.desc}</h1>
              <h1>{data.price}</h1>
              <h1>{data.location}</h1>
              <h1>{data.quantity}</h1>
            </div>
          </div>
        ))}
      </div> */}

      <div>
      <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/6 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
          CATEGORIES
        </h2>
        <nav className="list-none mb-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">First Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Second Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Third Link</a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
          </li>
        </nav>
      </div>
    </div>
  </div>
  
</footer>

      </div>
    </div>
  );
}

export default Home;
