import React from "react";

const UserInfoCard = ({ title, content }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-lg font-semibold text-gray-800">{content}</p>
        </div>
    );
};

export default UserInfoCard;
