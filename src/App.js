import AccountContext, { UseAccountContext } from './context/accountContext'
import Pages from './pages'

import './App.css';

function App() {
  const [accountContext, setAccountContext] = UseAccountContext()

  return (
    <AccountContext.Provider
      value={{
        accountContext,
        setAccountContext
      }}>
      <Pages />
    </AccountContext.Provider>
  );
}

export default App;
