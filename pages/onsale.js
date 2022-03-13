import Head from 'next/head'
import styles from '../styles/Onsale.module.scss'
import Link from 'next/link'
import React from 'react'

export default function action({games, onSaleDetails}) {

  // console.log(games)

  const [covers, setCovers] = React.useState([])

  React.useEffect(()=> {
    setCovers(onSaleDetails.map(g => g.results).reduce((prev, current) => [...prev, ...current]).map((e, i) => ({ name: e.name, image: e.image.original })))
  },[])

  
  // function cover(s, i) {
    
  //   React.useEffect(()=> {
  //     const fk = [onSaleDetails.map(g => g)[i]]
  //     setCovers(fk.reduce((prev, current) => [...prev, ...current]))
  //     const filter = covers[s]
  //     console.log(filter)
  //     return filter
  //   },[])

  // }

  function cover(i) {
      const filter = covers.map(c=> c.image)[i]
      return filter
    }
  
  // console.log(covers)

  const MainGames = games.map((g, index) => {
    
  return (
    
      <div key={g.gameID} className={styles["games"]}>
          
          {/* <Link href={'/' + g.internalName}> */}
              <img src={cover(index)} alt={g.title.substring(0,22)} className={styles['onsale-covers']}></img>
          {/* </Link> */}
          <div className={styles["infos"]}>
              {/* limit characters to 22 */}
              <Link href={'/' + g.id}>
                  <p className={styles['gameName']}>{g.title}</p>
              </Link>
              {/* <p className={styles["tag"]}>{g.steamAppID}</p> */}
              <p className={styles["price"]}>${g.salePrice}</p>
          </div>
      </div>
    
  )
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>On Sale!</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <section className={styles["layout"]}>
        <main className={styles['main']}>
          <div>
            <h1>TOP GAMES ON SALE!</h1>
            <article className={styles['main-layout']}>
              {MainGames}
            </article>
          </div>
        </main>
        
      </section>
    </div>
  )
}

// call the api to get featured games
export async function getStaticProps() {

  const apiRoot= 'https://www.cheapshark.com/api/1.0/deals'

  const res = await fetch(`${apiRoot}?storeID=1&upperPrice=30&sortBy=Metacritic&pageSize=15&AAA=true`)

  const gameData = await res.json()

  // fetch featured games details
  // const onSaleDetails = await Promise.all(gameData.map((g) => fetch(`https://store.steampowered.com/api/appdetails?appids=${g.steamAppID}`).then(data => data.json()))
  // )

  // fetch from gamespot
  const onSaleDetails = await Promise.all(gameData.map((g) => fetch(`https://www.gamespot.com/api/games/?${process.env.gamespotKey}&format=json&filter=name:${g.title.substring(0,13)}&limit=1`).then(data => data.json())))
  
  return {
    props: {
      games: gameData,
      onSaleDetails
    },
  }
}