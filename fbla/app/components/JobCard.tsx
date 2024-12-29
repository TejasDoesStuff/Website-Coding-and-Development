import React from "react";

<<<<<<< Updated upstream
const JobCard = ({ user, posting }) => {
=======
interface User {
    name: string;
    pfp: string;
}

const JobCard = ({ u, title, description }) => {
    const username = u.name;
    const pfp= u.pfp;

>>>>>>> Stashed changes
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-background">
            {imageUrl && (
                <img
                    className="w-full h-48 object-cover"
<<<<<<< Updated upstream
                    src={user.pfp}
                    alt={user.name}
                />
            )}
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-text">{posting.title}</h2>
                <p className="text-text text-base">{posting.description}</p>
=======
                    src={pfp}
                    alt={title}
                />
            )}
            <div className="px-6 py-4">
                <h2 className="font-bold text-xl mb-2 text-text">{username}</h2>
                <p className="text-text text-base">{description}</p>
>>>>>>> Stashed changes
            </div>
        </div>
    );
};

export default JobCard;
