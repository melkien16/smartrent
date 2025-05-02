import React from 'react';
import ItemGrid from '../items/ItemGrid';

const ItemsSection = ({ items }) => (
  <ItemGrid
    items={items}
    title={items.length === 0 ? 'No items found' : null}
    subtitle={
      items.length === 0
        ? 'Try adjusting your filters or search for something else'
        : null
    }
  />
);

export default React.memo(ItemsSection); 