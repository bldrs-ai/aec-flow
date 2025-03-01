import { ColumnType } from 'antd/es/table';
import { UserCategory } from '../enums/user';
import { SlabType } from '../types/slabType';

const CostumUIKeys = ['location', 'rebarRenderer', 'type', 'weight'];
const PartTypeKeys = [
  'id',
  'planReference',
  'location_x',
  'location_y',
  'location_z',
  'strength',
  'dimensions_l',
  'dimensions_w',
  'dimensions_h',
  'liveload',
  'typeOfElement',
  'rebarDiameterTop',
  'rebarAmountTop',
  'rebarDiameterBottom',
  'rebarAmountBottom',
];

export const AllAvailableColumns = [...CostumUIKeys, ...PartTypeKeys];

const local: Record<string, string> = {
  id: 'Id',
  planReference: 'Plan Reference',
  type: 'Type',
  location_x: 'X Coordinate',
  location_y: 'Y Coordinate',
  location_z: 'Z Coordinate',
  strength: 'Strength',
  dimensions_l: 'Length',
  dimensions_w: 'Width',
  dimensions_h: 'Height',
  weight: 'Weight',
  liveload: 'Live Load',
  typeOfElement: 'Element Type',
  rebarDiameterTop: 'Rebar Diameter Top',
  rebarAmountTop: 'Rebar Amount Top',
  rebarDiameterBottom: 'Rebar Diameter Bottom',
  rebarAmountBottom: 'Rebar Diameter Bottom',
  location: 'Location',
  rebarRenderer: 'Rebar',
};

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

const architect = CostumUIKeys;

export const defaultValues: Record<UserCategory, string[]> = {
  [UserCategory.Architect]: architect,
  [UserCategory.Engineer]: [],
  [UserCategory.Client]: [],
  [UserCategory.Contracter]: [],
};
