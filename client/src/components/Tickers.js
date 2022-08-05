import { useGetStocksQuery } from '../redux/stockApiSlice';
import { Ticker } from './Ticker';
import { useSelector } from 'react-redux';

export function Tickers () {

  const { interval, newEntry, toRemove } = useSelector(state => state.stocks)

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetStocksQuery([interval, newEntry, toRemove])

  if (isLoading) {
    console.log('Loading...')
  // } else if (isSuccess) {
  //   console.log(data.flat())
  } else if (isError) {
    console.log(error);
  }

  

  return (
    <div className='mx-auto'>
      {
        isSuccess ? 
        data.flat().map((item, i) => 
          <Ticker 
            key={i + 1}
            id={item.id}
            ticker={item.ticker}
            exchange={item.exchange}
            price={item.price}
            change={item.change}
            change_percent={item.change_percent}
          />
        )
        : 
        null
     
     }
    </div>
  )
}