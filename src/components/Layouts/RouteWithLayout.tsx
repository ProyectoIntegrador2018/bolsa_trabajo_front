import React from 'react';
import { Route } from 'react-router-dom';

export default function RouteWithLayout({ layout, component, layoutProps, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        React.createElement(
          layout,
          { props, ...layoutProps },
          React.createElement(component, props),
        )
      }
    />
  );
}
