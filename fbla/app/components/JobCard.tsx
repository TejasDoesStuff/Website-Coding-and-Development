import React from "react";

const JobCard = ({ user, posting }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-background">
            {imageUrl && (
                <img
                    className="w-full h-48 object-cover"
                    src={user.pfp}
                    alt={user.name}
                />
            )}
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-text">{posting.title}</h2>
                <p className="text-text text-base">{posting.description}</p>
            </div>
        </div>
    );
};

export default JobCard;
