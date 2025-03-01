import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';

export const columnTypeMap: { [attribute: string]: ColumnType<SlabType> } = {
  ...Object.fromEntries(
    PartTypeKeys.map((dataIndex) => [
      dataIndex,
      {
        title: local[dataIndex],
        dataIndex,
        key: dataIndex,
      },
    ])
  ),
  location: {
    title: local['location'],
    key: 'location',
    render: (_, element) => `(${element.location_x.toFixed(2)}, ${element.location_y.toFixed(2)}, ${element.location_z.toFixed(2)})`,
  },
  rebarRenderer: {
    title: local['rebarRenderer'],
    key: 'rebarRenderer',
    render: (_, element) => (
      <p>
        <span>
          {`${element.rebarAmountBottom.toFixed(0)}ø${element.rebarDiameterBottom.toFixed(1)}`}
          <sub>Bottom</sub>
        </span>{' '}
        <span>
          {`${element.rebarAmountTop.toFixed(0)}ø${element.rebarDiameterTop.toFixed(1)}`}
          <sub>Top</sub>
        </span>
      </p>
    ),
  },
  type: {
    title: local['type'],
    key: 'type',
    render: (_, element) =>
      `${element.typeOfElement} (${element.dimensions_l.toFixed()}, ${element.dimensions_w.toFixed()}, ${element.dimensions_h.toFixed()})`,
  },
  weight: {
    title: local['weight'],
    key: 'weight',
    render: (_, element) => `${(element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025).toFixed(0)} kg`,
  },
};
};
