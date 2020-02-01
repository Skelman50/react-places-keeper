import React from "react";

import "./UsersItem.css";
import Avatar from "../../../shared/components/UIElements/avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/UIElements/card/Card";

const UsersItem = ({ user }) => {
  const placesText = user.places === 1 ? "Place" : "Places";
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${user._id}/places`}>
          <div className="user-item__image">
            <Avatar image={user.image} alt={user.name} />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {user.places.length} {placesText}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
