import { Button, Flex, Spinner, useToast } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import useSWR from 'swr';

import { Link } from 'react-router-dom';
import env from '../utils/env';
import Table from './Table';

interface ListViewProps {
  resource: string;
  tableProps: Omit<ComponentProps<typeof Table>, 'rows'>;
}

function ListView(props: ListViewProps) {
  const toast = useToast();
  const { data: rows = [], isLoading, mutate } = useSWR(props.resource);

  async function handleDelete({ id }: any) {
    const response = await fetch(
      `${env.VITE_BACKEND_URL}/${props.resource}/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      mutate((rows) => rows.filter((row) => row.id !== id), {
        revalidate: false,
      });

      return toast({
        title: `${props.resource} deleted with success.`,
        description: `We've deleted ${props.resource} for you.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }

    toast({
      title: `failed to delete ${props.resource}`,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }

  if (isLoading) {
    return (
      <Flex justifyContent='center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    );
  }

  return (
    <Table
      columns={[
        ...props.tableProps.columns,
        {
          key: 'actions',
          label: 'Actions',
          render: (_, row) => {
            return (
              <div>
                <Button as={Link} to={`${row.id}/update`}>
                  Edit
                </Button>

                <Button
                  marginLeft={4}
                  colorScheme='red'
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </Button>
              </div>
            );
          },
        },
      ]}
      rows={rows}
    />
  );
}

export default ListView;
