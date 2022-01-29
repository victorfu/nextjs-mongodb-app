import Head from 'next/head';
import styles from './Layout.module.css';
import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ponyta</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="ponyta" />
        <meta property="og:title" content="ponyta" />
        <meta property="og:description" content="ponyta" />
        <meta property="og:image" content="/ponyta.jpg" />
      </Head>
      <Nav />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
