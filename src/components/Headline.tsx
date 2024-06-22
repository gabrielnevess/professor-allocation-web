import { Button, Heading, Text } from '@chakra-ui/react';

interface Props {
  description: string;
  title: string;
  onClickButton: () => void;
}

function Headline(props: Props) {
  return (
    <div style={{ padding: 20 }}>
      <Heading size='2xl' style={{ color: 'darkblue' }}>
        {props.title}
      </Heading>

      <Text style={{ color: 'gray' }}>{props.description}</Text>

      <div>
        <Button colorScheme='linkedin' isLoading onClick={props.onClickButton}>
          Clique aqui para saber mais.
        </Button>
      </div>
    </div>
  );
}

export default Headline;
