import React, { useState, Fragment, useContext, useEffect } from "react";

import "./PlaceItem.css";
import Card from "../../../../shared/components/UIElements/card/Card";
import Button from "../../../../shared/components/form-element/Button";
import Modal from "../../../../shared/components/UIElements/modal/Modal";
import Map from "../../../../shared/components/UIElements/map/Map";
import { UserContext } from "../../../../shared/context/auth/auth-context";
import { PlacesContext } from "../../../../shared/context/places/places-context";

const PlaceItem = ({ place }) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user } = useContext(UserContext);
  const { loading, deletePlace } = useContext(PlacesContext);

  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const handleShowWarning = () => setShowConfirm(true);
  const handleCancelConfirm = () => setShowConfirm(false);

  useEffect(() => {
    if (loading) return;
    setShowConfirm(false);
  }, [loading]);

  const handleDeletePlace = () => {
    deletePlace(place._id);
  };

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={handleCloseMap}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={handleCloseMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map
            center={place.location}
            zoom={16}
            loadingElement={<div style={{ height: `100%` }} />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyD_SG0RfUsAZX_l3JRK-qtlzEHWx9qzUXk`}
          />
        </div>
      </Modal>
      <Modal
        show={showConfirm}
        onCancel={handleCancelConfirm}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button onClick={handleCancelConfirm} inverse disabled={loading}>
              CANCEL
            </Button>
            <Button danger onClick={handleDeletePlace} disabled={loading}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={place.image} alt={place.title} />
          </div>
          <div className="place-item__info">
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={handleOpenMap}>
              VIEW ON MAP
            </Button>
            {user._id === place.creator && (
              <Fragment>
                <Button to={`/places/${place._id}`}>EDIT</Button>
                <Button danger onClick={handleShowWarning}>
                  DELETE
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
