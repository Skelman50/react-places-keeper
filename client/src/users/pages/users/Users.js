import React, { useContext, useEffect } from "react";
import UsersList from "../../components/users-list/UsersList";
import { UserContext } from "../../../shared/context/auth/auth-context";
import { Dimmer, Loader } from "semantic-ui-react";

const Users = () => {
  const { users, getUsers, loading } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (loading) {
    return (
      <Dimmer active>
        <Loader content="Loading" />
      </Dimmer>
    );
  }
  return <UsersList items={users} />;
};

export default Users;
