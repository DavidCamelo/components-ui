import React from 'react';
import PropTypes from 'prop-types';
import './toggle.css';

export const Toggle = ({ label, enabled, setEnabled }) => (
    <div className="toggle-wrapper">
        {label && <span className="toggle-label">{label}</span>}
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className="toggle-button"
          role="switch"
          aria-checked={enabled}
        >
            <span className="toggle-handle" />
        </button>
    </div>
);

Toggle.propTypes = {
  label: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  setEnabled: PropTypes.func.isRequired
};

Toggle.defaultProps = {
  label: ''
};

export default Toggle;
