import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)




  const updateNews = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9618faaa9a34737a6a8f0d50435cf25&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    console.log(props, url)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResult)
    setLoading(false)
  }

  useEffect(() => {
    updateNews();
  }, [])


  // const handleNextClick = async () => {
  //      setpage(page + 1)
  //   updateNews()
  // }



  // const handlePrevClick = async () => {}
  //   setpage(page + 1)
  //   updateNews()
  // }


  const fetchMoreData = async () => {
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c9618faaa9a34737a6a8f0d50435cf25&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResult)
  }


  return (
    <>
      <h2 className='text-center' style={{ margin: '50px 0px' }}>News-Top Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News



/*


https://codesandbox.io/s/react-playground-forked-bvx97o?file=/index.js

const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'


// S.. A.. R...

// STORE + ACTIONS + REDUCER
    // *
    // *
    // *
    // *
    // V
// INITIAL STATE


function buyCake () {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream () {
  return {
    type: BUY_ICECREAM
  }
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// }

const initialCakeState = {
  numOfCakes: 10
}

const initialIceCreamState = {
  numOfIceCreams: 20
}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE: return {
//       ...state,
//       numOfCakes: state.numOfCakes - 1
//     }
//     case BUY_ICECREAM: return {
//       ...state,
//       numOfIceCreams: state.numOfIceCreams - 1
//     }
//     default: return state
//   }
// }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}



const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
// const store = createStore(rootReducer, applyMiddleware(logger))


const store = createStore(rootReducer, applyMiddleware(logger))




console.log('Initial State ', store.getState())
const unsubscribe = store.subscribe(() => { })


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()



*/