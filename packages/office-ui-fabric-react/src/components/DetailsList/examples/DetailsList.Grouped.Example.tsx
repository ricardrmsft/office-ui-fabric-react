import * as React from 'react';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { IDetailsList, DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import './DetailsList.Grouped.Example.scss';

const _columns = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'color',
    name: 'Color',
    fieldName: 'color',
    minWidth: 100,
    maxWidth: 200
  }
];
const _items = [
  {
    key: 'a',
    name: 'a',
    color: 'red'
  },
  {
    key: 'b',
    name: 'b',
    color: 'red'
  },
  {
    key: 'c',
    name: 'c',
    color: 'blue'
  },
  {
    key: 'd',
    name: 'd',
    color: 'blue'
  },
  {
    key: 'e',
    name: 'e',
    color: 'blue'
  }
];

export class DetailsListGroupedExample extends BaseComponent<
  {},
  {
    items: {}[];
    showItemIndexInView: boolean;
  }
> {
  private _root = createRef<IDetailsList>();

  constructor(props: {}) {
    super(props);

    this.state = {
      items: _items,
      showItemIndexInView: false
    };
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root!.current!.getStartItemIndexInView();
      alert('unmounting, getting first item index that was in view: ' + itemIndexInView);
    }
  }

  public render() {
    const { items } = this.state;

    return (
      <Fabric className="DetailsList-grouped-example">
        <div>
          <Checkbox
            label="Show index of the first item in view when unmounting"
            checked={this.state.showItemIndexInView}
            onChange={this._onShowItemIndexInViewChanged}
          />
        </div>
        <DefaultButton onClick={this._addItem} text="Add an item" />
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={[
            {
              key: 'groupred0',
              name: 'By "red"',
              startIndex: 0,
              count: 2
            },
            {
              key: 'groupgreen2',
              name: 'By "green"',
              startIndex: 2,
              count: 0
            },
            {
              key: 'groupblue2',
              name: 'By "blue"',
              startIndex: 2,
              count: items.length - 2
            }
          ]}
          columns={_columns}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          groupProps={{
            showEmptyGroups: true
          }}
          onRenderItemColumn={this._onRenderColumn}
          useReducedRowRenderer={true}
        />
      </Fabric>
    );
  }

  private _addItem = (): void => {
    const items = this.state.items;

    this.setState(
      {
        items: items.concat([
          {
            key: 'item-' + items.length,
            name: 'New item ' + items.length,
            color: 'blue'
          }
        ])
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      }
    );
  };

  private _onRenderColumn(item: any, index: number, column: IColumn) {
    let value = item && column && column.fieldName ? item[column.fieldName] : '';

    if (value === null || value === undefined) {
      value = '';
    }

    return (
      <div className={'grouped-example-column'} data-is-focusable={true}>
        {value}
      </div>
    );
  }

  private _onShowItemIndexInViewChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      showItemIndexInView: checked
    });
  };
}
