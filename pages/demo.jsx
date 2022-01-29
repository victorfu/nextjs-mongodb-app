import Head from 'next/head';
import { Demo } from '@/page-components/Demo';

const DemoPage = () => {
  return (
    <>
      <Head>
        <title>Demo</title>
      </Head>
      <Demo />
    </>
  );
};

export default DemoPage;
