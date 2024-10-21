import React from "react";
import { auth, getUserBids } from "../Utils/Firebase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "./Bid.css"
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function Bids() {
    const userId = auth.currentUser?.uid;

    const { data: bidsData, isLoading: isLoadingBids, error: bidsError } = useQuery({
        queryKey: ["bids", userId],
        queryFn: () => getUserBids(userId),
    });

    if (isLoadingBids) {
        return <h2>Loading bids...</h2>;
    }

    if (bidsError) {
        return <h2>Error fetching bids: {bidsError.message}</h2>;
    }

    const bidsArr = bidsData || []; // Default to an empty array if no data

    return (
        <div className="bids-container">
            <h1 className="bid">Bids</h1>
            {bidsArr.length > 0 ? (
                bidsArr.map(bid => (
                    <div key={bid.id} className="bid-item">
                        <h1 className="pricebid">Bid-Price: {bid.bidPrice || "N/A"}</h1>
                        <h1 className="datejs">
                            Date: {dayjs(bid.createdAt?.toDate ? bid.createdAt.toDate() : bid.createdAt).to(dayjs())}
                        </h1>
                        <h1 className="bidstatus">Status: {bid.status || "N/A"}</h1>
                    </div>
                ))
            ) : (

                <div className="flex items-center justify-center  ">
                <h1 className="font-bold bg">Sorry, only the owner can access this</h1>
            </div>
                // <h2 >Sorry, only the owner can access this</h2>
            )}
        </div>
    );
}

export default Bids;
