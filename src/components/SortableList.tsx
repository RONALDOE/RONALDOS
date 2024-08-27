import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

interface SortableListProps {
  children: React.ReactNode;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
  axis: 'x' | 'y' | 'xy';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SortableList = SortableContainer(({ children, onSortEnd, axis }: SortableListProps) => (
  <div className="grid grid-cols-6 gap-2">{children}</div>
));

export default SortableList;
