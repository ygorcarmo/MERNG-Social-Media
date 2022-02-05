import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import "../styles/styles.css";
import "../App.css";
import Auth from "../utils/auth";

function Navbars() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Menu stackable pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <div>
        {Auth.loggedIn() ? (
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
            as={Link}
            to="/Profile"
          />
        ) : (
          <Menu.Item
            className="disabled item invisible"
            name="profile"
            disabled
          />
        )}
      </div>
      <div>
        {Auth.loggedIn() ? (
          <Menu.Item
            name="Create a Post"
            active={activeItem === "Create a Post"}
            onClick={handleItemClick}
            as={Link}
            to="/CreatePost"
          />
        ) : (
          <Menu.Item className="disabled item invisible" disabled />
        )}
      </div>
      <Menu.Menu position="right">
        {Auth.loggedIn() ? (
          <>
            <Menu.Item name={`${Auth.getProfile().username}!`} active={true} />
            <Menu.Item name="Logout" onClick={logout} />
          </>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/Login"
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/Register"
            />
          </Menu.Menu>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default Navbars;
