import React, { useContext } from "react";

import "./UsersList.css";
import UsersItem from "../users-item/UsersItem";
import Card from "../../../shared/components/UIElements/card/Card";
import { UserContext } from "../../../shared/context/auth/auth-context";

const UsersList = ({ items }) => {
  const { error } = useContext(UserContext);
  if (error) {
    return (
      <div className="center">
        <Card>
          <h1>{error}</h1>
        </Card>
      </div>
    );
  }
  if ((items && !items.length) || !items) {
    return (
      <div className="center">
        <Card>
          <h1>No user found!</h1>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map(user => (
        <UsersItem key={user._id} user={user} />
      ))}
    </ul>
  );
};

export default UsersList;
