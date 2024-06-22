import { Button } from '@chakra-ui/react';

import Page from '../../components/Page';
import ListView from '../../components/ListView';
import { Link } from 'react-router-dom';

function Professor() {
  return (
    <Page
      title='Professors'
      rightNode={
        <Button as={Link} to='/professor/create' colorScheme='facebook' mr={10}>
          New Professor
        </Button>
      }
    >
      <ListView
        resource='professors'
        tableProps={{
          columns: [
            {
              key: 'id',
              label: 'ID',
            },
            {
              key: 'name',
              label: 'Name',
            },
            {
              key: 'cpf',
              label: 'CPF',
            },
            {
              key: 'department',
              label: 'Department',
              render: (department) => {
                return <span style={{ color: 'red' }}>{department.name}</span>;
              },
            },
          ],
        }}
      />
    </Page>
  );
}

export default Professor;
