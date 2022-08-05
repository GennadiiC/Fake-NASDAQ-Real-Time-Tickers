import { useState, useEffect } from "react"
import { setCachedTicker, filterCachedTickers, setToRemove } from "../redux/stockSlice"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faArrowTrendUp,
  faArrowTrendDown,
  faCircleStop,
  faSpinner,
  faPause,
  faPlay,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'



export function Ticker ({
  id,
  ticker,
  exchange,
  price,
  change,
  change_percent
}) 
{

  const dispatch = useDispatch()

  const { cachedTickers } = useSelector(state => state.stocks)

  const filteredTicker = cachedTickers.filter(tickr => tickr.id === id)

  const [clicked, setClicked] = useState(false)

  const handleCache = () => {
    const cachedTicker = {
      id,
      ticker,
      exchange,
      price,
      change,
      change_percent
    }

    setClicked(!clicked)

    if (!cachedTickers.map(tick => tick.id).includes(id)) {
      dispatch(setCachedTicker(cachedTicker))  
    }

    if (clicked === true) {
      dispatch(filterCachedTickers(cachedTicker))
    }
  }
  
  const [priceCompare, setPriceCompare] = useState([])

  const pricePusher = () => {
    setPriceCompare(prev => 
      [...prev, price] 
    ) 
    setPriceCompare(prev => {
      if (prev.length > 2) {
        prev.shift()
      }
      return prev
    })   
  }

  useEffect(() => {
    pricePusher()
  }, [price])

  const arrowUp = <FontAwesomeIcon icon={faArrowTrendUp} className={priceCompare.length === 2 ? 'my-auto mx-2' : 'd-none'} />
  const arrowDown = <FontAwesomeIcon icon={faArrowTrendDown} className={priceCompare.length === 2 ? 'my-auto mx-2' : 'd-none'} />
  const circleStop = <FontAwesomeIcon icon={faCircleStop} className='my-auto mx-2' />
  const spinner = <FontAwesomeIcon icon={faSpinner} className='my-auto mx-2' />
  const pause = <FontAwesomeIcon icon={faPause} className='my-auto' />
  const play = <FontAwesomeIcon icon={faPlay} className='my-auto' />
  const trashCan = <FontAwesomeIcon icon={faTrashCan} className='my-auto' />



  if (!clicked) {
    return (
      <div className='row my-2'>
        <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Name: </span><span>{ticker}</span></p>
        <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Stock: </span><span>{exchange}</span></p>
        <p className="col my-auto py-2 d-flex justify-content-between">
          <span className="title me-2">Price: </span>
            {priceCompare.length < 2 ? spinner : priceCompare[0] > priceCompare[1] ? arrowDown : arrowUp}
          <span className="dyn">{price}$</span>
        </p>
        <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Change: </span><span className="dyn">{change}$</span></p>
        <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">In percents: </span><span className="dyn">{change_percent}%</span></p>
        <div className="d-flex col">
          <button className="btn btn-danger col my-auto me-1" onClick={() => dispatch(setToRemove(ticker))}>{trashCan}</button>
          <button className="btn btn-warning col my-auto ms-1" onClick={() => handleCache()}>{pause}</button>
        </div>     
      </div> 
    )
  } else {
    return (
      <>
        {
          filteredTicker.map((tick, i) => 
            <div key={i} className='row my-2'>
              <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Name: </span><span>{tick.ticker}</span></p>
              <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Stock: </span><span>{tick.exchange}</span></p>
              <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Price: </span>{circleStop}<span className="dyn">{tick.price}$</span></p>
              <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">Change: </span><span className="dyn">{tick.change}$</span></p>
              <p className="col my-auto py-2 d-flex justify-content-between"><span className="title me-2">In percents: </span><span className="dyn">{tick.change_percent}%</span></p>
              <div className="d-flex col">
                <button className="btn btn-danger col my-auto me-1" onClick={() => dispatch(setToRemove(ticker))}>{trashCan}</button>
                <button className="btn btn-warning col my-auto ms-1" onClick={() => handleCache()}>{play}</button>
              </div>     
            </div>
          )
        }  
      </>
      )
      
  }

}