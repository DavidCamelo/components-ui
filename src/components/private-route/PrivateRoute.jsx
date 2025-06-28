import React from 'react';
import PropTypes from 'prop-types';
import './private-route.css';

export const PrivateRoute = ({ hasPermission, children, fallbackMessage }) => {
  if (!hasPermission) {
    if (fallbackMessage) {
      return (
        <div className="private-route-fallback">
          {fallbackMessage}
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
};

PrivateRoute.propTypes = {
  hasPermission: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  fallbackMessage: PropTypes.string,
};

PrivateRoute.defaultProps = {
  fallbackMessage: 'You do not have permission to view this content.',
};

export default PrivateRoute;
