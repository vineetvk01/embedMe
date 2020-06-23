import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react'
import styled, { withTheme } from 'styled-components';

const Loading = () => <div>Checking LoggedIn User...</div>;

const LoginWindow = (props) => {

  const SubHeading = styled.p`
    color: ${props => props.theme.pr};
    text-align: center;
    font-weight: 500;
    font-size: 14px;
  `;

  const Heading = styled.p`
    color: ${props => props.theme.fg};
    font-weight: 700;
    font-size: 48px;
    text-align: center;
  `;

  const Heading5 = styled.p`
    color: ${props => props.theme.sc};
    text-align: center;
  `

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <SubHeading>SEND A VIDEO, SPARK A CONVERSATION</SubHeading>
        <Heading>Welcome Back 👋</Heading>
        <Heading5>Let's make some videos!</Heading5>
      </Grid.Column>
      <Grid.Row>
        <Grid.Column width={5}>
          <Button fluid > <Icon name="google" /> Connect with Google </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const _Login = (props) => {

  console.log(props);

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return loading ? <Loading /> : <LoginWindow />
}

export const Login = withTheme(_Login);