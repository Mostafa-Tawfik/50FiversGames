import Head from 'next/head'
import styles from '../styles/Action.module.scss'
import Main from '../components/Main'

export default function action({games}) {

  const pageName = 'RACING Games'

  return (
    <div className={styles.container}>
      <Head>
        <title>Racing Games</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <section className={styles["layout"]}>
        <main className={styles['main']}>
          <Main games={games} pageName={pageName}/>
        </main>
        
      </section>
    </div>
  )
}

// call the api to get featured games
export async function getStaticProps() {

  const apiRoot= 'https://rawg.io/api/games'

  const res = await fetch(`${apiRoot}?${process.env.rawgkey}&genres=1&metacritic=70,100&dates=2021-01-01,2022-06-01&ordering=-added&ordering=-metacritic`)

  const gameData = await res.json()

  return {
    props: {games: gameData},
  }
}