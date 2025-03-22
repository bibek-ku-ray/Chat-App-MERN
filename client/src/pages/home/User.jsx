import React from "react";

const User = () => {
    return (
        <div className="flex gap-1 my-1">
            <div className="avatar avatar-online">
                <div className="w-14 h-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <h2 className="line-clamp-1">Full Name</h2>
                <p className="text-sm text-slate-200">Username</p>
            </div>
        </div>
    );
};

export default User;
