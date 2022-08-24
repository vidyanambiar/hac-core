import * as React from 'react';
import { Title } from '@patternfly/react-core';
import { HorizontalNav, Tab } from '@openshift/dynamic-plugin-sdk-utils';

const UsersTabContent: React.FC = () => <div>Users Tab Content</div>;
const DatabaseTabContent: React.FC = () => <div>Database Tab Content</div>;

const mockTabs: Tab[] = [
  { key: 'Users', title: 'Users', content: <UsersTabContent />, ariaLabel: 'Users' },
  { key: 'Database', title: 'Database', content: <DatabaseTabContent />, ariaLabel: 'Database' },
];

const HorizontalNavTest: React.FC = () => {
  return (
    <>
      <Title headingLevel="h2" size="xl">
        Test Horizontal Nav
      </Title>
      <HorizontalNav tabs={mockTabs} />
    </>
  );
};

export default HorizontalNavTest;
