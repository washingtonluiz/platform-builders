import React from "react";

//CSS
import "./index.css";

const Message = (props) => {
  return (
    <div
      className={`Toast Toast--${props.category} ${
        props.isAlert ? "Toast-alert" : ""
      }`}
    >
      <main className="Toast__message">
        <header className="Toast__message-category">{props.category}</header>
        <p className="Toast__message-text">{props.msg}</p>
      </main>
      <button
        className="Toast__button"
        type="button"
        onClick={() => props.close()}
      >
        Fechar
      </button>
    </div>
  );
};

export default Message;
