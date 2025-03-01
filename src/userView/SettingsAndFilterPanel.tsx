import { ActiveSettings } from './ActiveSettingsUI';
import { UserSelect } from './UserSelect';

export const SettingsAndFilterPanel: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
    <ActiveSettings />
    <UserSelect />
  </div>
);
