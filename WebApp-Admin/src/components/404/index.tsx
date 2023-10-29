import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="notfoundWrapper">
      <h1 className="notfoundTitle">404 Error Page Not Found</h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <Link to="/">
          <i className="fas fa-home"></i>
        </Link>
      </section>
    </div>
  );
};

export default NotFoundPage;
