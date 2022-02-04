import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import '../styles/styles.css';
import "../App.css"


function Navbars() {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1)
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (    
      <Menu stackable pointing secondary size='massive' color='teal'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />
          
        <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={handleItemClick}
              as={Link}
              to='/Profile'
              />
            <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/Login'
                />
              <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to='/Register'
                />
          </Menu.Menu>
      </Menu>
    
  );
}

export default Navbars;
