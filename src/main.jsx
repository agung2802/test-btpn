import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './component/App'
import './index.css'
import { Provider } from 'react-redux'
import contactStore from './slice/contactStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={contactStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)
