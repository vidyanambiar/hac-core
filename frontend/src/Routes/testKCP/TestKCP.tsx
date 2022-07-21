import * as React from 'react';
import { isUtilsConfigSet, k8sListResourceItems, K8sResourceCommon } from '@openshift/dynamic-plugin-sdk-utils';
import { Title, List, ListItem, Alert, Spinner } from '@patternfly/react-core';
import { WorkspaceModel } from '../testK8s/models';

// Test component to verify KCP API calls
const TestKCP: React.FC = () => {
  const [error, setError] = React.useState<string>(null);
  const [workspaces, setWorkspaces] = React.useState<K8sResourceCommon[]>([]);

  const hasConfig = isUtilsConfigSet();
  React.useEffect(() => {
    if (hasConfig) {
      k8sListResourceItems({
        model: WorkspaceModel,
      })
        .then((response) => {
          if (Array.isArray(response)) {
            setWorkspaces(response);
          }
        })
        .catch((e) => {
          setError(`Unknown issue loading workspace list ${e?.message}`);
        });
    }
  }, [hasConfig]);

  if (error) {
    return (
      <Alert variant="danger" isInline title="Error determining workspaces">
        {error}
      </Alert>
    );
  }

  return workspaces.length > 0 ? (
    <>
      <Title headingLevel="h2" size="xl" className="pf-u-m-lg">
        List of workspaces
      </Title>
      <List className="pf-u-w-25 pf-u-ml-lg">
        {workspaces.map((workspace, index) => (
          <ListItem key={index}>{workspace.metadata?.name}</ListItem>
        ))}
      </List>
    </>
  ) : (
    <>
      <Spinner /> Loading Workspaces
    </>
  );
};

export default TestKCP;
