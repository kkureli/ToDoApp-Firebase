import React from "react";
import moment from "moment";
const Notifications = (props) => {
  const { notifications } = props;

  return (
    <div
      className="section"
      style={{
        height: "580px",

        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",

        backgroundColor: "#FF3CAC",
        backgroundImage:
          "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
      }}
    >
      <div className="card notCard z-depth-0 transparent mt-0 pt-0 border-0">
        <div className="card-content">
          <span className="card-title not-title ">Notifications</span>
          <ul className="notifications notUL mt-0 pt-0">
            {notifications &&
              notifications.map((item) => {
                return (
                  <li key={item.id}>
                    <p
                      style={{
                        color: "pink",
                        fontSize: "20px",
                        display: "inline",
                      }}
                    >
                      {item.user}
                    </p>
                    <span className="white-text">{item.content}</span>
                    <div className="grey-text note-date">
                      {moment(item.time.toDate()).fromNow()}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
