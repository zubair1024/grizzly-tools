import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import generator from 'generate-password-ts';
import { useCallback, useEffect, useState } from 'react';

const route = routes.filter(
  (i) => i.route === 'strong-password-generator',
)?.[0];

async function fetchPasswords(
  length = 12,
  numbers = true,
  symbols = true,
  uppercase = true,
) {
  return generator.generate({
    length,
    numbers,
    symbols,
    uppercase,
  });
}

const RandomPortGeneratorScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState(12);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [uppercase, setUpperCase] = useState(true);

  const generatePasswords = useCallback(async () => {
    setIsLoading(true);
    const password = await fetchPasswords(length, numbers, symbols, uppercase);
    setPassword(password);
    setIsLoading(false);
  }, [length, numbers, symbols, uppercase]);

  useEffect(() => {
    console.log(length, numbers, symbols, uppercase);
    void generatePasswords();
  }, [generatePasswords, numbers, symbols, uppercase, length]);

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
                <div className="grid grid-cols-2 text-center items-center justify-center">
                  <p className="text-2xl font-bold">{password}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => copyTextToClip(password)}
                  >
                    Copy
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Length</span>
            </label>
            <input
              type="number"
              value={length}
              min={1}
              onChange={(e) => setLength(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label cursor-pointer">
              <span className="label-text">numbers</span>
              <input
                type="checkbox"
                checked={numbers}
                onClick={() => {
                  setNumbers(!numbers);
                }}
                className="checkbox checkbox-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">uppercase</span>
              <input
                type="checkbox"
                checked={uppercase}
                onClick={() => {
                  setUpperCase(!uppercase);
                }}
                className="checkbox checkbox-primary"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">symbols</span>
              <input
                type="checkbox"
                checked={symbols}
                onClick={() => {
                  setSymbols(!symbols);
                }}
                className="checkbox checkbox-primary"
              />
            </label>
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
