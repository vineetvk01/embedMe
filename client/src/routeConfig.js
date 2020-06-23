import { Login } from './views/login';
import { DashBoard } from './views/dashboard';
import { Recorder } from './views/recorder';

export const routeConfig = {
  loginPage: {
    component: Login,
    route: '/login',
    exact: true
  },
  dashboardPage: {
    component: DashBoard,
    route: '/',
    exact: true
  },
  recorderPage: {
    component: Recorder,
    route: '/record',
    exact: true
  }
};