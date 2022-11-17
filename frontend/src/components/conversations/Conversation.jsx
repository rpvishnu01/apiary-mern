import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getUser/${friendId}`
        );

        setUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversation_img"
        src={user?.picture ? user.picture : "../../../images/default_pic.png"}
        alt=""
      />
      <span className="conversation_name">
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}