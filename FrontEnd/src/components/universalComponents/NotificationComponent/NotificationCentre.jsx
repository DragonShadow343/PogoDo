import { useEffect, useState, useRef } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import SockJS from "sockjs-client"; 
import { Client } from "@stomp/stompjs";

const NotificationCentre = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const stompClientRef = useRef(null);

  // Fetch from backend on load
  useEffect(() => {
    if (!userId) {
      console.error("❌ userId is undefined. Cannot fetch notifications.");
      return;
    }

    axios.get(`http://localhost:3500/Notifications/${userId}`)
      .then(response => {
        const transformed = response.data.map(item => ({
          id: item.id,
          taskId: item.taskId || null,
          taskTitle: item.taskTitle || "",
          message: item.content,
          recipientIds: item.recipientId ? [item.recipientId] : [],
          createdAt: item.createdAt,
        }));
        setNotifications(transformed);
      })
      .catch(error => console.error("❌ Error fetching notifications", error));
  }, [userId]);

  // Real-time WebSocket listener
  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:3500/websocket");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("🟢 WebSocket connected to /topic/notifications");

        client.subscribe("/topic/notifications", message => {
          const data = JSON.parse(message.body);
          console.log("📬 New notification via WebSocket:", data);

          // Only push notification if it's meant for this user
          if (data.recipientId === userId) {
            setNotifications(prev => [
              {
                id: data.id || Date.now(),
                taskId: data.taskId || null,
                taskTitle: data.taskTitle || "",
                message: data.content || data.message,
                recipientIds: [data.recipientId],
                createdAt: data.timestamp || new Date().toISOString()
              },
              ...prev,
            ]);
          }
        });
      },
      onStompError: error => {
        console.error("WebSocket error", error);
      }
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [userId]);

  // Delete a notification
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
