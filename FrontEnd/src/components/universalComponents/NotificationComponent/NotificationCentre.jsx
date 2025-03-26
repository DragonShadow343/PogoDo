import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";

const NotificationCentre = ({ userId }) => {
    const [notifications, setNotifications] = useState([
        {
          id: 1,
          taskId: 101,
          taskTitle: "Fix Login Bug",
          message: "You have been assigned to this task.",
          recipientIds: [2, 3, 4],  
          createdAt: "2025-03-25T12:30:00Z"
      },
      {
          id: 2,
          taskId: 102,
          taskTitle: "Update Dashboard UI",
          message: "The admin has updated the task details.",
          recipientIds: [3, 5],
          createdAt: "2025-03-25T14:45:00Z"
      }
    ]);

    // useEffect(() => {
    //     axios.get(`/notifications/${userId}`)
    //         .then(response => setNotifications(response.data))
    //         .catch(error => console.error("Error fetching notifications", error));
    // }, []);

    // const handleClose = async (notificationId) => {
    //     try {
    //         await axios.delete(`/notifications/${userId}/${notificationId}`);
    //         setNotifications(notifications.filter(n => n.id !== notificationId));
    //     } catch (error) {
    //         console.error("Error deleting notification", error);
    //     }
    // };

    return (
        <div className="w-full bg-gray-800 text-white p-2">
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                notifications.map((n) => (
                    <div key={n.id} className="relative w-full bg-gray-700 p-2 mb-2 rounded flex justify-between">
                        <div>
                            
                            <div className=" flex flex-col-reverse">
                              <p className="font-semibold">{n.taskTitle}</p>
                              <p className="text-gray-400 text-sm">Task ID #{n.id}</p>
                            </div>
                            <p className="text-sm py-2">{n.message}</p>
                        </div>
                        <button onClick={() => handleClose(n.id)} className="absolute top-0 right-0 translate-1/2 flex justify-center items-center text-white bg-gray-800 rounded-full h-6 w-6 cursor-pointer hover:bg-gray-600 hover:text-red-400 duration-100"><FiX /></button>
                    </div>
                ))
            )}
        </div>
    );
};

export default NotificationCentre;
