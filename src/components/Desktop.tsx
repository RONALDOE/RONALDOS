 


import React, { Component } from 'react';
import { IIcon } from '@utils/interfaces.ts';
import SortableItem from './SortableItem';
import SortableList from './SortableList';
import { arrayMoveImmutable } from 'array-move';

interface DesktopProps {
  Icons: IIcon[];
}

interface DesktopState {
  items: string[];
}

class Desktop extends Component<DesktopProps, DesktopState> {
  constructor(props: DesktopProps) {
    super(props);
    this.state = { items: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5', 'item 6'] };
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
    this.setState(({ items }) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  }

  render() {
    const { items } = this.state;

    return (
      <div className="container">

        <SortableList onSortEnd={this.onSortEnd} axis="xy">
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </SortableList>
       
      </div>
    );
  }
}

export default Desktop;
