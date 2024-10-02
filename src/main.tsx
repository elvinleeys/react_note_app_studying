import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // redux를 사용하기 위해서 Provider를 App 컴포넌트로 감싸준다.
  <Provider store={store}>
    <App />
  </Provider>
  ,
)
