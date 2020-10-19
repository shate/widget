import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import styles from './App.module.scss';

function App() {
    const [statistic, setStatistic] = useState(false);
    useEffect(()=> {
        fetch(
            `https://testback.coinmarketrate.com/api/asset_statistic/bitcoin`
        )
            .then((response) => response.json())
            .then((data) => {
                setStatistic(data.data);
            })
            .catch(e => console.error(e));
    }, [])
  return (
      statistic
          ? <div
            className={`${styles.d_flex} ${styles.flex_column} ${styles.justify_content_between} ${styles.h_100} ${styles.bg_white} ${styles.p_4} ${styles.border} ${styles.border_border1}`}>
            <div className={`${styles.d_flex} ${styles.mb_5} mb-sm-0`}>
                <div className={styles.tab_tools_ico}>
                    <img src={((statistic.name ? '/icons/' + statistic.name + '.png' : null))}/>
                </div>
                <div className={styles.ml_3}>
                    <small className={styles.text_grey3}>
                        {(statistic.symbol ? statistic.symbol : null)}
                    </small>
                    <h3 className={`${styles.text_uppercase} ${styles.text_grey4} ${styles.mb_0}`}>
                        {(statistic.name ? statistic.name : null)}
                    </h3>
                </div>
            </div>
            <div className={`${styles.d_flex} ${styles.justify_content_between}`}>
                <div>
                    <div className={`${styles.text_14} ${styles.text_grey3}`}>
                        Rank
                    </div>
                    <strong className={`${styles.text_18} ${styles.text_grey4}`}>15.61M</strong>
                    <small><strong className={`${styles.text_grey4} ${styles.text_uppercase}`}>usd</strong></small>
                </div>
                <div>
                    <div className={`${styles.text_14} ${styles.text_grey3}`}>
                        Cap
                    </div>
                    <strong className={`${styles.text_18} t${styles.text_grey4}`}>${statistic.stat && parseFloat(statistic.stat.market_cap/1000000).toFixed(2)}M</strong>
                </div>
                <div>
                    <div className={`${styles.text_14} ${styles.text_grey3}`}>
                        Volume
                    </div>
                    <strong className={`${styles.text_18} ${styles.text_grey4}`}>${statistic.stat && parseFloat(statistic.stat.volume24h/1000).toFixed(2)}K</strong>
                </div>
            </div>
            <div className={`${styles.d_flex} ${styles.justify_content_end} ${styles.p_0} ${styles.currency_head_info}`}>
                <div className={styles.currency_head_stats}>
                    <div className={styles.text_right}>
                  <span
                      className={
                          'currency-head-stats-usd-change ' +
                          (statistic.stat ? (statistic.stat.percent24h >= 0
                              ? styles.text_success
                              : styles.text_danger) : styles.text_success)
                      }
                  >
                    <NumberFormat
                        value={(statistic.stat ? statistic.stat.percent24h : 0)}
                        displayType={'text'}
                        thousandSeparator={false}
                        suffix={'%'}
                        decimalScale={2}
                        fixedDecimalScale={true}
                    />
                  </span>
                        <span className="currency-head-stats-usd-price">
                    <NumberFormat
                        value={(statistic.stat ? statistic.stat.price : 0)}
                        displayType={'text'}
                        thousandSeparator={false}
                        prefix={'$'}
                        decimalScale={statistic.stat ? (statistic.stat.price >= 1 ? 2 : 6) : 2}
                        fixedDecimalScale={true}
                    />
                  </span>
                        <span className="currency-head-stats-usd-id">USD</span>
                    </div>
                    <div className="currency-head-stats-btc">
                  <span
                      className={`${styles.currency_head_stats_usd_change} ${statistic.stat ? (statistic.stat.percent24h_btc >= 0
                          ? styles.text_success
                          : styles.text_danger) : styles.text_success}`

                      }
                  >
                    <NumberFormat
                        value={(statistic.stat ? statistic.stat.percent24h_btc : 0)}
                        displayType={'text'}
                        thousandSeparator={false}
                        suffix={'%'}
                        decimalScale={2}
                        fixedDecimalScale={true}
                    />
                  </span>
                        <span className="currency-head-stats-btc-price">
                    <NumberFormat
                        value={(statistic.stat ? statistic.stat.price_btc : 0)}
                        displayType={'text'}
                        thousandSeparator={false}
                        prefix={''}
                        decimalScale={statistic.stat ? (statistic.stat.price_btc >= 1 ? 2 : 6) : 2}
                        fixedDecimalScale={true}
                    />
                  </span>
                        <span className="currency-head-stats-btc-id">BTC</span>
                    </div>
                </div>
            </div>
            <a href="">
                <small className={styles.text_primary}>Powered by CoinMarketRate</small>
            </a>
        </div>
          : <div>Loading...</div>

  );
}

export default App;
