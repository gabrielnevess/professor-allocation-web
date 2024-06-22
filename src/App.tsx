import Headline from './components/Headline';

function App() {
  return (
    <>
      <Headline
        description='Geleira é uma das mais largas na Terra e seu derretimento pode fazer subir um metro o nível do mar, afetando cidades em todo o mundo.
        Pesquisa alerta que oceanos mais quentes estão influenciando.'
        title="'Geleira do Juízo Final' corre mais risco de derretimento do que a
        ciência sabia, diz novo estudo"
        onClickButton={function () {
          alert('Cliquei no Headline 1');
        }}
      />

      <Headline
        description='O app Truecaller vai usar inteligência artificial (IA) para clonar sua voz e atender chamadas por você. Alimentada pelo Microsoft Azure AI Speech, a ferramenta complementará o AI Assistant do aplicativo, mas agora respondendo às ligações de forma convincente.'
        title='Truecaller agora pode atender chamadas com sua voz usando IA'
        onClickButton={function () {
          alert('Cliquei no Headline 2');
        }}
      />
    </>
  );
}

export default App;
