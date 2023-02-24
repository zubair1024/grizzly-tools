import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { useState } from 'react';

const route = routes.filter((i) => i.route === 'text-to-nato')?.[0];

const TextToNatoScreen = () => {
  const [inputText, setInputText] = useState('');

  return (
    <>
      <Layout>
        <div className="max-w-xl mx-auto px-5 py-5">
          <div>
            <h1>{route.title}</h1>
            <p>{route.desc}</p>
          </div>
          <div className="py-10 space-y-5">
            <div>
              <input
                type="text"
                placeholder="Type here"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="input input-bordered input-lg w-full "
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="testing"
                className="input input-bordered input-lg w-full"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TextToNatoScreen;
