import React from 'react';
import PropTypes from 'prop-types';
import './breadcrumbs.css';
import { ChevronRightIcon } from '../../icons';

export const Breadcrumbs = ({ items }) => {
  return (
    <nav className="storybook-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && <ChevronRightIcon className="separator" />}
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumbs;
