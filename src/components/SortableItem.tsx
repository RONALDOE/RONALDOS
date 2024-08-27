import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

interface SortableItemProps {
  value: string;
  index: number;
}

const SortableItem = SortableElement(({ value }: SortableItemProps) => (
  <div className="col-span-3">{value}</div>
));

export default SortableItem;
