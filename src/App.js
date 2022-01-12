import Context, { context } from './context'
import Pages from './pages'

import './App.css';

function App() {
  return (
    <Context.Provider value={context}>
      <Pages />
    </Context.Provider>
  );
}

export default App;
