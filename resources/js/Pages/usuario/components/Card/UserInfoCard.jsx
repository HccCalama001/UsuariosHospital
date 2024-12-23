import React from "react";

const UserInfoCard = ({ title, content }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {title}
            </h3>
            <p className="text-xl font-bold text-teal-800 mt-2 truncate">
                {content}
            </p>
        </div>
    );
};

export default UserInfoCard;
