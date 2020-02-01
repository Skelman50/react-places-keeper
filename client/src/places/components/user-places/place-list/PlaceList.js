import React, { useContext } from "react";
import "./PlaceList.css";
import Card from "../../../../shared/components/UIElements/card/Card";
import PlaceItem from "../place-item/PlaceItem";
import Button from "../../../../shared/components/form-element/Button";
import { UserContext } from "../../../../shared/context/auth/auth-context";
import { PlacesContext } from "../../../../shared/context/places/places-context";

const PlaceList = props => {
  const { user } = useContext(UserContext);
  const { error } = useContext(PlacesContext);
  if (props.items.length === 0 && props.userId === user._id) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="place-list center">
        <Card>
          <h2>{error}</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem key={place._id} place={place} />
      ))}
    </ul>
  );
};

export default PlaceList;
