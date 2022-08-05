import { changeInterval, setNewTicker } from '../redux/stockSlice';
import { useDispatch } from 'react-redux';
import { Tickers } from './Tickers';
import { useRef } from 'react';



function App() {

  const dispatch = useDispatch()

  const tickerInput = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setNewTicker(tickerInput.current.value))
    e.currentTarget.reset()
  }

  return (
    <div className='container'>
      <h1 className='h1 text-center my-5'>Fake NASDAQ Real-Time Tickers</h1>
      <h2 className='h2 text-center my-5'>(Ticker add/delete is processed according to interval)</h2>
      <div className='d-flex justify-content-center my-4'>
        <div className="dropdown me-2">
          <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Set Interval
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" href="#" onClick={() => dispatch(changeInterval(1000))}>1 sec</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => dispatch(changeInterval(3000))}>3 sec</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => dispatch(changeInterval(5000))}>5 sec</a></li>
          </ul>
        </div>
        <form className='d-flex ms-4' onSubmit={handleSubmit}>
          <input className='form-control' type='text' ref={tickerInput} />
          <input
            className='btn btn-primary'
            type="submit"
            value="Add Ticker"
          />
        </form>
      </div>
    
      <Tickers />
    </div>
  );
}

export default App;
