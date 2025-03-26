import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";

const NotificationCentre = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("userId is undefined. Cannot fetch notifications.");
      return;
    }

    // Make a GET request to the backend on port 3500.
    axios.get(`http://localhost:3500/Notifications/${userId}`)
      .then(response => {
        console.log("Raw notifications:", response.data);
        // Transform the backend response (expected as an array of objects)
        // Each backend object should have: { id, content, createdAt, recipientId }
        const transformed = response.data.map(item => ({
          id: item.id,
          taskId: item.taskId || null,         // Use null if not provided
          taskTitle: item.taskTitle || "",       // Use an empty string if not provided
          message: item.content,                 // Rename 'content' to 'message'
          recipientIds: item.recipientId ? [item.recipientId] : [],
          createdAt: item.createdAt,
        }));
        setNotifications(transformed);
      })
      .catch(error => console.error("Error fetching notifications", error));
  }, [userId]);

  const handleClose = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:3500/Notifications/${userId}/${notificationId}`);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification", error);
    }
  };

  return (
    <div className="w-full bg-gray-800 text-white p-2">
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map(n => (
          <div 
            key={n.id} 
            className="relative w-full bg-gray-700 p-2 mb-2 rounded flex justify-between"
          >
            <div>
              <div className="flex flex-col-reverse">
                <p className="font-semibold">{n.taskTitle}</p>
                <p className="text-gray-400 text-sm">Notification ID #{n.id}</p>
              </div>
              <p className="text-sm py-2">{n.message}</p>
              <p className="text-xs text-gray-500">
                Received: {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
            <button 
              onClick={() => handleClose(n.id)}
              className="absolute top-0 right-0 translate-1/2 flex justify-center items-center text-white bg-gray-800 rounded-full h-6 w-6 cursor-pointer hover:bg-gray-600 hover:text-red-400 duration-100"
            >
              <FiX />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationCentre;
