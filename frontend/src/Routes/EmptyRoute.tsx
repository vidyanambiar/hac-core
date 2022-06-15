import * as React from 'react';
import { sortable, SortByDirection, Td } from '@patternfly/react-table';
import TableView from '../poc-code/console-mount/src/components/foundation/static-routes/table-view/TableView';
import { Card } from '@patternfly/react-core';
import Table from '../poc-code/console-mount/src/components/hac-dev/table/Table';

export type RowProps<D> = {
  obj: D;
};

export const Row: React.FC<RowProps<Record<string, string>>> = ({ obj, ...rest }) => {
  return (
    <>
      <Td dataLabel={obj.name}>{obj.name}</Td>
      <Td dataLabel={obj.prs}>{obj.prs}</Td>
      <Td dataLabel={obj.branches}>{obj.branches}</Td>
      <Td dataLabel={obj.workspaces}>{obj.workspaces}</Td>
    </>
  );
};

const EmptyRoute: React.FC = () => {
  let temp = [];
  for (let index = 0; index < 100; index++) {
    temp = [
      ...temp,
      {
        name: `one-${index}`,
        branches: `two-${index}`,
        prs: `three-${index}`,
        workspaces: `four-${index}`,
        lastCommit: `five-${index}`,
        metadata: { uid: index },
      },
    ];
  }
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState(temp);

  const Header = [
    {
      title: 'Name',
      props: { className: '' },
    },
    {
      title: 'Components',
      props: { className: '' },
    },
    {
      title: 'Environments',
      props: {},
    },
    {
      title: 'Last deploy',
      props: {},
    },
    {
      title: '',
      props: {},
    },
  ];

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
          onSelect={(e, isRowSelected, data) =>
            isRowSelected
              ? setSelected([...new Set([...selected, ...data.map((i) => i.name)])])
              : setSelected(selected.filter((i) => data.map((i) => i.name).includes(i)))
          }
          emptyStateDescription="No data applicable"
          isRowSelected={(i) => selected.includes(i.name)}
        />
      </Card>

      <Card style={{ margin: '40px' }}>
        <Table
          // areFiltersApplied={false}
          // columns={columns}
          aria-label="foo"
          data={data}
          loaded
          // label={'Something went wrong...'}
          // loadError={'An error occured when fetching the data'}
          loadError={undefined}
          Row={Row}
          filters={[]}
          Header={() => Header}
          /*filters={[
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
          ]}*/
          //onSelect={(e, isRowSelected, data) => isRowSelected ? setSelected([...(new Set([...selected, ...data.map(i => i.name)]))]) : setSelected(selected.filter(i => data.map(i => i.name).includes(i)))}
          //isRowSelected={(i) => selected.includes(i.name)}
        />
      </Card>
    </>
  );
};

export default EmptyRoute;
