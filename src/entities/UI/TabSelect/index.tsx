import * as s from './styles';

type Tab = {
  key: string;
  label: string;
};

type TabSelectorProps = {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
};

export default function TabSelector({ tabs, activeTab, onTabChange }: TabSelectorProps) {
  return (
    <s.TabSelector>
      {tabs.map(({ key, label }) => (
        <s.TabButton
          key={key}
          active={activeTab === key}
          onClick={() => onTabChange(key)}
        >
          {label}
        </s.TabButton>
      ))}
    </s.TabSelector>
  );
}