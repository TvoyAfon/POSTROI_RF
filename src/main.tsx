
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './App.tsx'
import Loader from './components/ui/Loader/Loader.tsx'
import './customStyles.scss'
import './index.scss'
import './scrollbar.scss'
import { persistor, store } from './store/store.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate
        loading={<Loader text='Загрузка...' />}
        persistor={persistor}>
        <App />
      </PersistGate >
    </QueryClientProvider>
  </Provider>
)
