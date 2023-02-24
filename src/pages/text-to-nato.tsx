import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { word2words } from 'node.nato-phonetics.lib';
import { useState } from 'react';

const route = routes.filter((i) => i.route === 'text-to-nato')?.[0];

const TextToNatoScreen = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const output = word2words(value);
    setInputText(value);
    setOutputText(output.join(' '));
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
            <div>
              <input
                type="text"
                placeholder="Type here"
                value={inputText}
                onChange={handleInputChange}
                className="input input-bordered input-lg w-full "
              />
            </div>
            <div>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
                rows={5}
                value={outputText}
              ></textarea>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TextToNatoScreen;
