import { Link } from 'react-router-dom';
import ListView from '../../components/ListView';
import Page from '../../components/Page';
import { Button } from '@chakra-ui/react';

function Allocation() {
  return (
    <Page
      title='Allocations'
      rightNode={
        <Button as={Link} to='/allocation/create' colorScheme='facebook' mr={10}>
          New Allocation
        </Button>
      }
    >
      <ListView
        resource='allocations'
        tableProps={{
          columns: [
            {
              key: 'id',
              label: 'ID',
            },
            {
              key: 'dayOfWeek',
              label: 'Day Of Week',
            },
            {
              key: 'startHour',
              label: 'Start Hour',
            },
            {
              key: 'endHour',
              label: 'End Hour',
            },
            {
              key: 'professor',
              label: 'Professor',
              render: (professor) => {
                return professor.name;
              },
            },
            {
              key: 'course',
              label: 'Course',
              render: (course) => {
                return course.name;
              },
            },
          ],
        }}
      />
    </Page>
  );
}

export default Allocation;
