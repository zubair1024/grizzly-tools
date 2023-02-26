import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const route = routes.filter(
  (i) => i.route === 'simple-password-generator',
)?.[0];

async function fetchPasswords() {
  const res = await axios.get('/api/passwords');
  return res.data as { simplePass: string; strongPass: string };
}

const RandomPortGeneratorScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [simplePassword, setSimplePassword] = useState<string>('');
  const [strongPassword, setStrongPassword] = useState<string>('');

  const generatePasswords = useCallback(async () => {
    setIsLoading(true);
    const passwords = await fetchPasswords();
    setSimplePassword(passwords.simplePass);
    setStrongPassword(passwords.strongPass);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void generatePasswords();
  }, [generatePasswords]);

  const handleRefresh = () => {
    void generatePasswords();
  };

  return (
    <>
      <Layout>
        <div className="max-w-xl min-h-screen mx-auto px-5 py-5">
          <div>
            <h1>{route.title}</h1>
            <p>{route.desc}</p>
          </div>
          <div className="py-10 space-y-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">Simple</p>
                  <p className="text-2xl font-bold">{simplePassword}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => copyTextToClip(simplePassword)}
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center">
                  <p className="text-2xl">Strong</p>
                  <p className="text-2xl font-bold">{strongPassword}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => copyTextToClip(strongPassword)}
                  >
                    Copy
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-between py-2">
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
