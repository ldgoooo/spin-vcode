import React from 'react';
import ReactDOM from 'react-dom';

import { useRoutes } from "hookrouter";

import routes from "./router";

function App() {
  const routeResult = useRoutes(routes);
  return routeResult;
}

ReactDOM.render(<App />, document.getElementById('root'));