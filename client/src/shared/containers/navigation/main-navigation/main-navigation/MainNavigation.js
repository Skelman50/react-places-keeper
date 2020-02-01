import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import MainHeader from "../../../../components/navigation/main-header/MainHeader";
import NavLinks from "../../../../components/navigation/nav-links/NavLinks";
import SideDrawer from "../../../../components/navigation/side-drawer/SideDrawer";
import Backdrop from "../../../../components/UIElements/back-drop/BackDrop";

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
