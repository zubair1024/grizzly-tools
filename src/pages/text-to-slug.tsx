import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { useState } from 'react';
import slugify from 'slugify';

const route = routes.filter((i) => i.route === 'text-to-slug')?.[0];

const TextToSlugScreen = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const output = slugify(value, {
      replacement: '-',
      lower: true,
      strict: true,
      trim: true,
    });
    setInputText(value);
    setOutputText(output);
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

export default TextToSlugScreen;
