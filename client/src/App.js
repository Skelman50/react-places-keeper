import React from "react";

import UserState from "./shared/context/auth/auth-state";
import Routes from "./Routes";
import PlacesState from "./shared/context/places/places-state";

const App = () => {
  return (
    <UserState>
      <PlacesState>
        <Routes />
      </PlacesState>
    </UserState>
  );
};

export default App;
