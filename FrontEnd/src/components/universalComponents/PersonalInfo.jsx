import React, {useContext} from "react";
import AuthContext from './../../context/AuthProvider';

const PersonalInfo = () => {
  
  const { auth } = useContext(AuthContext);

  return (
    <div className="h-full p-4 rounded-lg shadow-[0px_5px_15px_#d9d6d4] bg-[#FFFCF9]">
      <h2 className="font-bold text-lg">Personal Info</h2>
      <p><strong>Username:</strong> {auth.username}</p>
      <p><strong>Email:</strong> {auth.email || "No email recieved"}</p>
    </div>
  );
};

export default PersonalInfo;
