import './Styles/normalize.scss'
import './Styles/index.scss'
import SpaceXList from "./Components/SpaceXList/SpaceXList.tsx";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider>
      <SpaceXList />
    </MantineProvider>
  )
}

export default App;
