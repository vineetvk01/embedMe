import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components';

export const Navigation = () => {

  const Brand = styled.span`
    font-weight: 800;
    font-size: 18px;
    margin: 0 5px;
  `;

  return (
    <>
      <Menu secondary>
        <Menu.Item header>
          <img
            alt="Logo here !"
            src={process.env.PUBLIC_URL + '/images/logo.png'}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <Brand>EmbedMe</Brand>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Dropdown item text='En'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' width='40px' circular />
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    </>
  )
}