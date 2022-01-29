import Head from 'next/head';
import { Administration } from '@/page-components/Administration';

const AdministrationPage = () => {
  return (
    <>
      <Head>
        <title>Administration</title>
      </Head>
      <Administration />
    </>
  );
};

export default AdministrationPage;
