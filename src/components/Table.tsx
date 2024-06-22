import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface BaseTableProps {
  columns: {
    label: string;
    key: string;
    render?: (item: any, row: any) => any;
  }[];
  rows: any[];
}

function BaseTable(props: BaseTableProps) {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {props.columns.map((column, index) => (
              <Th key={index}>{column.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.rows.map((row, index) => (
            <Tr key={index}>
              {props.columns.map((column, index) => {
                const value = column.render
                  ? column.render(row[column.key], row)
                  : row[column.key];

                return <Td key={index}>{value}</Td>;
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default BaseTable;
