import React from 'react';
import PropTypes from 'prop-types';
import './toggle.css';

export const Toggle = ({ label, enabled, setEnabled, onIcon, offIcon }) => (
    <div className="toggle-wrapper">
        {label && <span className="toggle-label">{label}</span>}
        <button
          type="button"
          onClick={() => setEnabled(!enabled)}
          className="toggle-button"
          role="switch"
          aria-checked={enabled}
        >
            <span className="sr-only">Use setting</span>
            <span className="toggle-handle">
                {enabled ? onIcon : offIcon}
            </span>
        </button>
    </div>
);

Toggle.propTypes = {
  label: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  setEnabled: PropTypes.func.isRequired,
  onIcon: PropTypes.node,
  offIcon: PropTypes.node,
};

Toggle.defaultProps = {
  label: '',
  onIcon: null,
  offIcon: null,
};

export default Toggle;
