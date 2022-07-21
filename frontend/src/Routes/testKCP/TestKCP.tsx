import * as React from 'react';
import { useK8sWatchResource, K8sResourceCommon, k8sCreateResource, k8sDeleteResource } from '@openshift/dynamic-plugin-sdk-utils';
import { Title, List, ListItem, Alert, Spinner, Button, TextInput, Split, SplitItem } from '@patternfly/react-core';
import { WorkspaceModel } from '../testK8s/models';
import PrintObject from '../testK8s/PrintObject';
import '@patternfly/react-styles/css/utilities/Spacing/spacing.css';

const watchedResource = {
  isList: true,
  groupVersionKind: {
    group: 'tenancy.kcp.dev',
    version: 'v1beta1',
    kind: 'Workspace',
  },
};

type ListViewLoadError = {
  message: string;
  status: number;
};

// Test component to verify KCP API calls
const TestKCP: React.FC = () => {
  const [workspaceName, setWorkspaceName] = React.useState<string>('test-workspace');
  const [status, setStatus] = React.useState<string>('');
  const [r, setR] = React.useState<K8sResourceCommon>();
  const [workspaces, loaded, error] = useK8sWatchResource(watchedResource);

  function handleCreateWorkspace() {
    let promise = null;
    const newWorkspaceMetadata = {
      name: workspaceName,
    };
    const newWorkspaceData: K8sResourceCommon & { [key: string]: any } = {
      apiVersion: `${WorkspaceModel.apiGroup}/${WorkspaceModel.apiVersion}`,
      kind: WorkspaceModel.kind,
      metadata: {
        name: workspaceName,
      },
    };
    promise = k8sCreateResource({
      model: WorkspaceModel,
      resource: newWorkspaceData,
      queryOptions: newWorkspaceMetadata,
    });
    promise
      ?.then((data) => {
        setStatus('Create response:');
        setR(data);
        console.debug('Create workspace: ', data);
      })
      .catch((err) => {
        console.error('Create failed: ', err);
        setStatus(`failed create call: ${err.message}`);
      });
  }

  function handleDeleteWorkspace() {
    let promise = null;
    const workspaceMetadata = {
      name: workspaceName,
    };
    promise = k8sDeleteResource({
      model: WorkspaceModel,
      queryOptions: workspaceMetadata,
    });
    promise
      ?.then((data) => {
        setStatus('Delete response:');
        setR(data);
        console.debug('Delete workspace: ', data);
      })
      .catch((err) => {
        console.error('Delete failed: ', err);
        setStatus(`failed delete call: ${err.message}`);
      });
  }

  return loaded ? (
    error ? (
      <Alert variant="danger" isInline title="Error determining workspaces">
        {(error as ListViewLoadError)?.message ?? 'Error'}
      </Alert>
    ) : (
      <>
        <Title headingLevel="h2" size="xl" className="pf-u-m-lg">
          List of workspaces
        </Title>
        {Array.isArray(workspaces) && (
          <List className="pf-u-w-25 pf-u-ml-lg">
            {workspaces.map((workspace, index) => (
              <ListItem key={index}>{workspace.metadata?.name}</ListItem>
            ))}
          </List>
        )}
        <Title headingLevel="h2" size="xl" className="pf-u-m-lg">
          Create new workspace
        </Title>
        <Split className="pf-u-ml-lg" hasGutter>
          <SplitItem>
            <TextInput type="text" placeholder="Workspace name" onChange={(v) => setWorkspaceName(v)} value={workspaceName} />
          </SplitItem>
          <SplitItem>
            <Button onClick={() => handleCreateWorkspace()}>Create workspace</Button>
          </SplitItem>
          <SplitItem>
            <Button onClick={() => handleDeleteWorkspace()}>Delete workspace</Button>
          </SplitItem>
        </Split>
        <div>{status}</div>
        {r && <PrintObject object={r} />}
      </>
    )
  ) : (
    <>
      <Spinner /> Loading Workspaces
    </>
  );
};

export default TestKCP;
