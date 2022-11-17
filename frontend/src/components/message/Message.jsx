import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://www.menshairstyletrends.com/wp-content/uploads/2020/12/thebarbercole-medium-length-pompadour-haircut-for-men-998x1024.jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        <p>{format(message.createdAt)}</p>
      </div>
    </div>
  );
}