import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import { useEffect, useState } from 'react';

const route = routes.filter((i) => i.route === 'random-port-generator')?.[0];

function generateRandomPort() {
  return Math.floor(1000 + Math.random() * 9000);
}

const RandomPortGeneratorScreen = () => {
  const [portNumber, setPortNumber] = useState<number>(0);

  useEffect(() => {
    setPortNumber(generateRandomPort);
  }, []);

  const copyToClipBoard = () => {
    copyTextToClip(portNumber.toString());
  };

  const handleRefresh = () => {
    setPortNumber(generateRandomPort);
  };

  return (
    <>
      <CustomHead
        ogType="article"
        title={route.title}
        description={route.desc}
      />
      <Layout>
        <div className="max-w-xl min-h-screen mx-auto px-5 py-5">
          <div>
            <h1>{route.title}</h1>
            <p>{route.desc}</p>
          </div>
          <div className="py-10 space-y-5">
            <div className="text-center text-3xl">{portNumber}</div>
          </div>
          <div className="flex justify-between py-2">
            <button onClick={copyToClipBoard} className="btn btn-ghost">
              Copy
            </button>
            <button
              onClick={handleRefresh}
              className="btn btn-ghost text-accent"
            >
              Refresh
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RandomPortGeneratorScreen;
