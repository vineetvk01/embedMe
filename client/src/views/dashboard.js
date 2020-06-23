import React, { useEffect, useState } from 'react';
import { Container, Tab } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Videos } from '../components/Videos';
import styled from 'styled-components';

const VideosList = () => (
  <>
    <Videos />
    <Videos />
    <Videos />
    <Videos />
    <Videos />
    <Videos />
  </>
)

const panes = [
  {
    menuItem: 'My Videos',
    render: () => <Tab.Pane attached={false}><VideosList /></Tab.Pane>,
  },
  {
    menuItem: 'Team Videos',
    render: () => <Tab.Pane attached={false}><VideosList /></Tab.Pane>,
  },
]

export const DashBoard = () => {

  return (
    <Container>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </Container>

  )


}