import { Table } from 'antd';
import { useTableStore } from '../state/tableStore';
import { columnTypeMap } from './columnTypes';
import { SettingsAndFilterPanel } from '../userView/SettingsAndFilterPanel';
import { useEffect, useState } from 'react';
import { getPartsWithUniqueType, reduceAndUseCount } from './attributeDefinition';

export const SlabTable: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory);
  const userAttributeMap = useTableStore((s) => s.userAttributeMap);
  const [columns, setColumns] = useState(userAttributeMap[userCategory].map((s) => columnTypeMap[s]));

  useEffect(() => {
    setColumns(userAttributeMap[userCategory].map((s) => columnTypeMap[s]));
  }, [userCategory, userAttributeMap]);

  return (
    <>
      <SettingsAndFilterPanel />
      <Table dataSource={reduceAndUseCount.includes(userCategory) ? getPartsWithUniqueType(elements) : elements} columns={columns}></Table>
    </>
  );
};
