import AccountContext, { UseAccountContext } from './context/accountContext'
import Pages from './pages'

import './App.css';

function App() {
  const accountStates = UseAccountContext()

  return (
    <AccountContext.Provider
      value={{
        ...accountStates
      }}>
      <Pages />
    </AccountContext.Provider>
  );
}

export default App;
