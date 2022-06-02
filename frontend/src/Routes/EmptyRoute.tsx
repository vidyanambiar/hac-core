import * as React from 'react';
import { sortable, SortByDirection, Td } from '@patternfly/react-table';
import TableView from '../poc-code/console-mount/src/components/foundation/static-routes/table-view/TableView';
import { Card } from '@patternfly/react-core';

export type RowProps<D> = {
  obj: D;
};

export const Row: React.FC<RowProps<Record<string, string>>> = ({ obj, ...rest }) => {
  return(
  <>
    <Td dataLabel={obj.name}>{obj.name}</Td>
    <Td dataLabel={obj.prs}>{obj.prs}</Td>
    <Td dataLabel={obj.branches}>{obj.branches}</Td>
    <Td dataLabel={obj.workspaces}>{obj.workspaces}</Td>
  </>
)};

const EmptyRoute: React.FC = () => {
  const [data, setData] = React.useState([
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
    { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
    { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
    {
      name: 'one - 3',
      branches: 'two - 3',
      prs: 'three - 3',
      workspaces: 'four - 3',
      lastCommit: 'five - 3',
    },
  ]);
  const [selected, setSelected] = React.useState([]);

  const columns = [
    // column before..
    {
      title: 'Name',
      id: 'name',
      // sort: 'metadata.name', // back compatibility
      transforms: [sortable], // back compatibility
      props: {
        className: '',
      },
    },
    // column now.. change in onSort and transforms
    {
      title: 'PRs',
      id: 'prs',
      sort: {
        sortBy: {
          index: 1,
          direction: SortByDirection.desc,
        },
        onSort: () => {
          setData([
            { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
            {
              name: 'one - 2',
              branches: null,
              prs: null,
              workspaces: 'four - 2',
              lastCommit: 'five - 2',
            },
          ]);
        },
        columnIndex: 1,
      },
      props: {
        className: '',
      },
    },
    {
      title: 'Branches',
      id: 'branches',
      props: {
        className: '',
      },
    },
    {
      title: 'Workspaces',
      id: 'workspaces',
      transforms: [sortable],
      sort: 'name',
      props: {
        className: '',
      },
    },
  ];

  console.log(selected)
  return (
    <>
      <Card style={{ margin: '40px' }}>
        <TableView
          // areFiltersApplied={false}
          columns={columns}
          data={data}
          loaded
          // label={'Something went wrong...'}
          // loadError={'An error occured when fetching the data'}
          loadError={undefined}
          Row={Row}
          filters={[
            {
              id: 'name',
              label: 'Name',
            },
            {
              id: 'branches',
              label: 'Branches',
            },
            {
              id: 'workspaces',
              label: 'Workspaces',
            },
          ]}
          onSelect={(e, isRowSelected, data) => isRowSelected ? setSelected([...(new Set([...selected, ...data.map(i => i.name)]))]) : setSelected(selected.filter(i => data.map(i => i.name).includes(i)))}
          isRowSelected={(i) => selected.includes(i.name)}
        />
      </Card>
    </>
  );
};

export default EmptyRoute;
