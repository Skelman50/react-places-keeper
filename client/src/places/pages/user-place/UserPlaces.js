import React, { useContext, useEffect } from "react";
import PlaceList from "../../components/user-places/place-list/PlaceList";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../../../shared/context/places/places-context";
import { Dimmer, Loader } from "semantic-ui-react";

const UserPlaces = () => {
  const userId = useParams().userId;
  const { getPlaces, places, loading } = useContext(PlacesContext);

  useEffect(() => {
    getPlaces(userId);
  }, [getPlaces, userId]);

  if (loading) {
    return (
      <Dimmer
        active
        inverted
        style={{ backgroundColor: "rgba(255,255,255,0)" }}
      >
        <Loader inverted content="Loading" />
      </Dimmer>
    );
  }

  return <PlaceList items={places} userId={userId} />;
};

export default UserPlaces;
