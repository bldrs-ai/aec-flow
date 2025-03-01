import { ColumnType } from 'antd/es/table';
import { SlabType } from '../types/slabType';
import { PartTypeKeys, RenderLocal, typeRenderer } from './attributeDefinition';
import { useTableStore } from '../state/tableStore';

export const columnTypeMap: { [attribute: string]: ColumnType<SlabType> } = {
  ...Object.fromEntries(
    PartTypeKeys.map((dataIndex) => [
      dataIndex,
      {
        title: RenderLocal[dataIndex],
        dataIndex,
        key: dataIndex,
      },
    ])
  ),
  location: {
    title: RenderLocal['location'],
    key: 'location',
    render: (_, element) => `(${element.location_x.toFixed(2)}, ${element.location_y.toFixed(2)}, ${element.location_z.toFixed(2)})`,
  },
  rebarRenderer: {
    title: RenderLocal['rebarRenderer'],
    key: 'rebarRenderer',
    render: (_, element) => (
      <>
        <span>
          {`${element.rebarAmountBottom.toFixed(0)}ø${element.rebarDiameterBottom.toFixed(1)}`}
          <sub>Bottom</sub>
        </span>{' '}
        <span>
          {`${element.rebarAmountTop.toFixed(0)}ø${element.rebarDiameterTop.toFixed(1)}`}
          <sub>Top</sub>
        </span>
      </>
    ),
  },
  type: {
    title: RenderLocal['type'],
    key: 'type',
    render: (_, element) => typeRenderer(element),
  },
  weight: {
    title: RenderLocal['weight'],
    key: 'weight',
    render: (_, element) => `${(element.dimensions_l * element.dimensions_w * element.dimensions_h * 0.6 * 0.0000025).toFixed(0)} kg`,
  },
  count: {
    title: RenderLocal['count'],
    key: 'count',
    render: (_, element) => {
      const elementDerivedType = typeRenderer(element);
      return useTableStore.getState().elements.filter((s) => elementDerivedType === typeRenderer(s)).length;
    },
  },
};
