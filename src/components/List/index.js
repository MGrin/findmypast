import React from 'react';

import './styles.css';

export default ({
  items,
  renderItem,
  renderNoItemsFallback,
  onItemClick,
}) => (
  <div className="list__wrapper">
    <div className="list__items">
      {items && items.length > 0 && items.map((item, idx) => (
        <div
          className="list__item"
          key={`list item ${Math.random()} ${Date.now()}`}
          onClick={() => onItemClick(item, idx)}>
          {renderItem(item)}
        </div>
      ))}
      {(!items || items.length === 0) && renderNoItemsFallback()}
    </div>
  </div>
);
