import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  
  const formatPercent = number =>
  `${new Number(number).toFixed(2)}%`

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'usd',
        maximumSignificantDigits
      
    })
    .format(number);

  return (
    <div className={styles.container}>
      <Head>
        <title className={styles.title}>Egg Coin</title>
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src='/egg.png' width='100' height='100' />
      <p className={styles.header}>Egg Coin</p>
      
      <p className={styles.p}>Stay updated with <strong>EGG COIN</strong> Crypto Dashboard...</p>
      
      <table className="table table-dark table-hover table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24 Hour Change</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
            <td className={styles.td}>
              <img 
                src={coin.image}
                style={{width: 25, height: 25, marginRight: 10}}
              />
              {coin.symbol.toUpperCase()}
              </td>
             <td className={styles.td}>
             <span
               className={coin.market_cap_change_percentage_24h > 0 ? (
                 'text-success'
               ) : 'text-danger'}
              >
              {formatPercent(coin.market_cap_change_percentage_24h)}
             </span>
             </td>
             <td className={styles.td}>{formatDollar(coin.current_price, 20)}</td>
             <td className={styles.marketcap}>{formatDollar(coin.market_cap, 12)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps(context) {
  const parmas = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await CoinGeckoClient.coins.markets({parmas});
  return {
    props: {
      result
    }
  };
}