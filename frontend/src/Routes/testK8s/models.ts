import { K8sModelCommon } from '@openshift/dynamic-plugin-sdk-utils';

export const ProjectModel: K8sModelCommon = {
  apiVersion: 'v1',
  apiGroup: 'project.openshift.io',
  kind: 'Project',
  plural: 'projects',
};

export const WorkspaceModel: K8sModelCommon = {
  apiVersion: 'v1beta1',
  apiGroup: 'tenancy.kcp.dev',
  kind: 'Workspace',
  plural: 'workspaces',
};

export const ApplicationModel: K8sModelCommon = {
  apiVersion: 'v1alpha1',
  kind: 'Application',
  apiGroup: 'appstudio.redhat.com',
  plural: 'applications',
};
