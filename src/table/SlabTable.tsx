import { Table } from 'antd';
import { useTableStore } from '../state/tableStore';
import { columnTypeMap } from './columnTypes';
import { SettingsAndFilterPanel } from '../userView/SettingsAndFilterPanel';
import { useEffect, useState } from 'react';
import { getPartsWithUniqueType, reduceAndUseCount } from './attributeDefinition';
import { SlabType } from '../types/slabType';
import { typeMap } from '../state/typeMap';

export const SlabTable: React.FC = () => {
  const elements = useTableStore((s) => s.elements);
  const userCategory = useTableStore((s) => s.userCategory);
  const userAttributeMap = useTableStore((s) => s.userAttributeMap);
  const [columns, setColumns] = useState(userAttributeMap[userCategory].map((s) => columnTypeMap[s]));

  useEffect(() => {
    setColumns(userAttributeMap[userCategory].map((s) => columnTypeMap[s]));
  }, [userCategory, userAttributeMap]);

  const toggleRow = (part: SlabType) => {
    const viewer = useTableStore.getState().viewer;
    Object.keys(viewer.scene.objects).forEach((key) => (viewer.scene.objects[key].colorize = [0.0, 1, 0]));
    viewer.scene.objects[(typeMap as any)[part.planReference]].colorize = [0.8, 0.1, 0.9];

    const aabb = viewer.scene.getAABB((typeMap as any)[part.planReference]);
    viewer.cameraFlight.flyTo(aabb);
  };

  return (
    <>
      <SettingsAndFilterPanel />
      <div style={{ position: 'absolute', left: 0, right: 0, top: '35%', bottom: 0 }}>
        <Table
          size='small'
          sticky={{ offsetHeader: 50 }}
          scroll={{ x: 1000 }}
          dataSource={reduceAndUseCount.includes(userCategory) ? getPartsWithUniqueType(elements) : elements}
          columns={columns}
          onRow={(record) => {
            return {
              onClick: (evt) => toggleRow(record as SlabType),
              // onContextMenu: (evt) => onRowClick(record as SlabType),
            };
          }}
        />
      </div>
    </>
  );
};
