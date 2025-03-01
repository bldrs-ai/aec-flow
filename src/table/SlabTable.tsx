import { Table } from 'antd';
import { useTableStore } from '../state/tableStore';
import { columnTypeMap, defaultValues } from './columnTypes';

export const SlabTable: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory);

  return <Table dataSource={elements} columns={defaultValues[userCategory].map((s) => columnTypeMap[s])}></Table>;
};
