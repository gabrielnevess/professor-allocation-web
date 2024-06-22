import { Container, Box, Heading } from '@chakra-ui/react';

import { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  rightNode?: ReactNode;
  title: string;
}

function Page(props: PageProps) {
  return (
    <Container maxWidth='6xl' marginTop={20} marginBottom={20}>
      <Box display='flex' justifyContent='space-between' marginBottom={10}>
        <Heading>{props.title}</Heading>

        {props.rightNode}
      </Box>

      {props.children}
    </Container>
  );
}

export default Page;
