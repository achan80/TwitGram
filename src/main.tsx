import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render( //! because it might be null
  <BrowserRouter> {/* Browser Router is going to control routing for our application 
  which makes tsx more powerful */}
    <App />
  </BrowserRouter>
  
)
