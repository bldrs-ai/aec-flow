import { useEffect } from 'react';
import { SlabTable } from './table/SlabTable';
import { initScene } from './viewer/viewer';

export const App: React.FC = () => {
  useEffect(() => {
    initScene();
  }, []);

  return <SlabTable />;
};
