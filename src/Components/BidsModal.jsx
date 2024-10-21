import React, { useState } from 'react';
import { Button, Input, message, Modal } from 'antd';
import { auth, db } from '../Utils/Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import "../app.css";

const BidsModal = ({ isModalOpen, onCancel, title, price, productId }) => {
    const [bidPrice, setBidPrice] = useState(price);
    const [loading, setLoading] = useState(false);

    const handleOnBid = async () => {
        try {
            setLoading(true);
            const bidObj = {
                productId,
                userId: auth.currentUser.uid,
                bidPrice,
                status: "pending",
                createdAt: serverTimestamp()
            };

            const bidCollectionRef = collection(db, "bids");
            await addDoc(bidCollectionRef, bidObj);
            message.success("Product bid added successfully");
            setLoading(false);
            onCancel(); // Close modal after successful bid
        } catch (err) {
            console.error("Error adding bid:", err); // Log the error for debugging
            message.error("Something went wrong, please try again");
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Bid-Product"
            open={isModalOpen}
            footer={null}
            onCancel={onCancel}
        >
            <div className='modeldiv'>
                <div className='text200'>Product Title: {title}</div>
                <div className='text200'>Min Price: {price}</div>
                <Input
                    className="bidinput"
                    placeholder='Enter Your Bid Price'
                    type='number'
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                />
                <Button
                    loading={loading}
                    onClick={handleOnBid}
                    disabled={bidPrice <= price}
                    className='bidbtn1'
                >
                    Bid On This Product
                </Button>
            </div>
        </Modal>
    );
};

 

export default BidsModal;