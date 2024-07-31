import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter} from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import { QueryProvider } from './lib/react-query/QueryProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </HashRouter>
)

