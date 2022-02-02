import './App.css';
import { UserContextProvider } from './context/UserContext';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <UserContextProvider >
    <AppRouter/>
  </UserContextProvider>
  );
}

export default App;
