import React from "react";
import { auth, getUserBids } from "../Utils/Firebase"; // Make sure to use getUserBids if that's what you need
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image } from "antd";

dayjs.extend(relativeTime);

function UserProduct() {
    const userId = auth.currentUser?.uid;

    const { data: productData, isLoading: isLoadingProducts, error: productsError } = useQuery({
        queryKey: ["userBids", userId],
        queryFn: () => getUserBids(userId), // Make sure you're fetching user bids
    });

    console.log("Product Data:", productData); // Log the data to check the structure

    let productArr = [];
    if (productData) {
        productArr = productData.map(bid => ({ ...bid, id: bid.id })); // Assuming productData is an array of bids
    }

    if (isLoadingProducts) {
        return <h2>Loading products...</h2>;
    }

    if (productsError) {
        return <h2>Error fetching products: {productsError.message}</h2>;
    }

    return (
        <div className="">
            <h1 className="bid">User Products</h1>
            {productArr.length > 0 ? (
                productArr.map(product1 => (
                    <div key={product1.id} className="flex ml-3 p-3 my-2 border rounded-md h-32">
                        <Image src={product1.img} height={100} width={100} />
                        <div className="pl-2">
                            <h1 className="font-semibold text-2xl">{product1.title || "N/A"}</h1>
                            <h1 className="font-normal text-md">Bid Price: {product1.bidPrice || "N/A"}</h1>
                            <h1 className="font-light text-sm">{dayjs(product1.createdAt?.toDate()).to(dayjs())}</h1>
                            <h1 className="font-normal text-md">Status: {product1.status || "N/A"}</h1>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center  ">
                <h1 className="font-bold bg">Sorry, only the owner can access this</h1>
            </div>
            )}
        </div>
    );
}

export default UserProduct;
