import { Button } from '@chakra-ui/react';
import ListView from '../../components/ListView';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';

function Department() {
  return (
    <Page
      title='Departments'
      rightNode={
        <Button as={Link} to='/department/create' colorScheme='facebook' mr={10}>
          New Department
        </Button>
      }
    >
      <ListView
        resource='departments'
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
          ],
        }}
      />
    </Page>
  );
}

export default Department;
