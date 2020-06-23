import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { routeConfig } from './routeConfig';
import { Navigation } from './components/Navbar';

const Main = styled.main`
  padding: 1em;
`;

const App = (props) => {

  const AppContainer = styled.div`
    min-height: 100vh;
    background-color: ${props => props.theme.bg};
  `;

  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Main>
          <Switch>
            {Object.keys(routeConfig).map((routeKey, index) => {
              const Component = routeConfig[routeKey].component;
              const { exact, route, props } = routeConfig[routeKey];

              return <Route exact={exact} path={route} key={index} render={nProps => {
                const updatedProps = {
                  ...nProps,
                  ...props
                };
                return <Component {...updatedProps} />;
              }}
              />
            })}
          </Switch>
        </Main>
        <footer>
        </footer>
      </AppContainer>
    </Router >
  )
}

export default App;