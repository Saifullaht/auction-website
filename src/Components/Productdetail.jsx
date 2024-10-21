import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Button, message } from "antd";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Loader from "./Loader";
import BidsModal from "./BidsModal";
import { getProductInfo,   updateBidStatus,getProductBids ,auth } from "../Utils/Firebase"; 
 

dayjs.extend(relativeTime);

function ProductDetail() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading: isLoadingProduct } = useQuery(
        ["Products", id],
        () => getProductInfo(id)
    );

    const { data: bidsData, isLoading: isLoadingBids } = useQuery(
        ["bids", id],
        () => getProductBids(id)
    );

    const handleOnBid = () => {
        setIsModalOpen(true);
    };

    const handleOnClickAcceptReject = async (bidid, status) => {
        try {
            await updateBidStatus(bidid, status);
            message.success("Bid updated successfully");
        } catch (err) {
            console.error(err);
            message.error(err.message || "An error occurred");
        }
    };

    if (isLoadingProduct || isLoadingBids) return <Loader />;

    if (!data) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="font-bold">Product Not Found. Please try again.</h1>
            </div>
        );
    }

    const { title, desc, price, img, createdBy, createdAt } = data;
    const isOwner = createdBy === auth.currentUser?.uid;

    const bidsArr = bidsData && Array.isArray(bidsData) ? bidsData.map(bid => ({ ...bid, id: bid.id })) : [];

    return (
        <div>
            <section className="text-gray-600 -mt-16 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="Product"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={img}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl font-medium mb-1">{title}</h1>
                            <h2 className="text-sm text-gray-500 tracking-widest">{desc}</h2>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-blue-600 mx-auto">Bids</h1>
                                {bidsArr.map((bid) => (
                                    <div key={bid.id} className="flex mr-3 border rounded mt-5 border-gray-500 h-14 mb-4" style={{ width: '128%' }}>
                                        <h1 className="text-1xl ml-4 font-bold text-gray-800 p-4 font-sans">Bid-Price: {bid.bidPrice || "N/A"}</h1>
                                        <h1 className="text-1xl ml-5 font-bold text-gray-800 p-4 font-sans">
                                            Date: {dayjs(bid.createdAt.toDate ? bid.createdAt.toDate() : bid.createdAt).to(dayjs())}
                                        </h1>
                                        {isOwner && bid.status === "pending" ? (
                                            <div className="mt-3 ml-5">
                                                <Button onClick={() => handleOnClickAcceptReject(bid.id, "accept")} className="mr-2" type="primary">Accept</Button>
                                                <Button onClick={() => handleOnClickAcceptReject(bid.id, "reject")} type="primary" danger>Reject</Button>
                                            </div>
                                        ) : (
                                            <h1 className="text-1xl ml-4 font-bold justify-end text-gray-800 p-4 font-sans">Status: {bid.status}</h1>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex ml-6 items-center">
                                    <p>Product Date: {dayjs(createdAt.toDate()).fromNow()}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">Price: {price}</span>
                                <BidsModal
                                    title={title}
                                    price={price}
                                    productId={id}
                                    isModalOpen={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                />
                                <button
                                    onClick={handleOnBid}
                                    disabled={isOwner}
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                                >
                                    Bid Product
                                </button>
                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    {/* Heart icon here */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;

