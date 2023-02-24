import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { useEffect, useState } from 'react';

const route = routes.filter((i) => i.route === 'uuid-v4-generator')?.[0];

const TextToNatoScreen = () => {
  const [numberOfIDs, setNumberOfIDs] = useState<number>(1);
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(
      Array(numberOfIDs)
        .fill(null)
        .map(() => self.crypto.randomUUID()),
    );
  }, [numberOfIDs]);

  useEffect(() => {
    setIds([self.crypto.randomUUID()]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberOfIDs(Number(value));
  };

  const handleGenerateNewIds = () => {
    setIds(
      Array(numberOfIDs)
        .fill(null)
        .map(() => self.crypto.randomUUID()),
    );
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
            <div className="flex items-center justify-center">
              <input
                min={1}
                type="number"
                placeholder="Type here"
                onChange={handleInputChange}
                value={numberOfIDs}
                className="input input-bordered input-lg w-sm "
              />
              <button
                onClick={() => setNumberOfIDs(numberOfIDs + 1)}
                className="btn btn-ghost text-2xl"
              >
                +
              </button>
              <button
                onClick={() =>
                  numberOfIDs - 1 !== -1 && setNumberOfIDs(numberOfIDs - 1)
                }
                className="btn btn-ghost text-2xl"
              >
                -
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <ul className="bg-gray-900 px-5 py-5 rounded-lg">
                {ids.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="flex justify-between py-2">
                <button
                  onClick={handleGenerateNewIds}
                  className="btn btn-ghost"
                >
                  Refresh
                </button>
                <button
                  onClick={() => setNumberOfIDs(1)}
                  className="btn btn-ghost text-accent"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TextToNatoScreen;
