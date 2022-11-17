import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({
  onlineUsers,
  currentId,
  setCurrentChat,
  user,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);

      setFriends(res.data.users);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getConversation/${user._id}`
      );

      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {friends.map((friend, i) =>
        friend._id === user.id ? (
          ""
        ) : (
          <div className="chatOnlineFriend" key={i} onClick={handleClick}>
            <div className="chatOnlineImgContainer">
              <img className="chatOnlineImg" src={`${friend.picture}`} alt="" />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">
              {friend.first_name} {friend.last_name}
            </span>
          </div>
        )
      )}
    </div>
  );
}