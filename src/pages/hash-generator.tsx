import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import crypto from 'crypto-js';
import { useCallback, useEffect, useReducer, useState } from 'react';

const route = routes.filter((i) => i.route === 'hash-generator')?.[0];

enum HasherActionKind {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA = 'SHA',
  SHA256 = 'SHA256',
  SHA224 = 'SHA224',
  SHA384 = 'SHA384',
  SHA512 = 'SHA512',
  SHA3 = 'SHA3',
}

interface HasherAction {
  type: HasherActionKind;
  payload: string;
}

interface HasherState {
  md5: string;
  sha1: string;
  sha224: string;
  sha256: string;
  sha3: string;
  sha384: string;
  sha512: string;
}

function hasherReducer(state: HasherState, action: HasherAction) {
  return { ...state, [action.type.toLowerCase()]: action.payload };
}

const HashGeneratorScreen = () => {
  const [inputText, setInputText] = useState('');
  const [state, dispatch] = useReducer(hasherReducer, {
    md5: '',
    sha1: '',
    sha224: '',
    sha256: '',
    sha3: '',
    sha384: '',
    sha512: '',
  });

  const generateHashes = useCallback(
    (str: string) => {
      dispatch({
        type: HasherActionKind.MD5,
        payload: crypto.MD5(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA1,
        payload: crypto.SHA1(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA224,
        payload: crypto.SHA224(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA256,
        payload: crypto.SHA256(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA3,
        payload: crypto.SHA3(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA384,
        payload: crypto.SHA384(str).toString(),
      });
      dispatch({
        type: HasherActionKind.SHA512,
        payload: crypto.SHA512(str).toString(),
      });
    },
    [dispatch],
  );

  useEffect(() => {
    generateHashes(inputText);
  }, [generateHashes, inputText]);

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
              <textarea
                rows={2}
                placeholder="Type here"
                onChange={(e) => setInputText(e.target.value)}
                className="textarea textarea-bordered textarea-lg w-full"
              />
            </div>
            <div className="bg-gray-900 px-5 py-5 rounded-lg">
              {Object.keys(state).map((key) => (
                <div key={key} className="grid grid-cols-5">
                  <div className="font-bold px-2">{key}</div>
                  <div className="px-2 col-span-3">
                    <input
                      className="input input-bordered w-full "
                      value={state[key as keyof HasherState].toString()}
                    ></input>
                  </div>
                  <div className="tooltip tooltip-top" data-tip="Copied!">
                    <button
                      onClick={() =>
                        copyTextToClip(
                          state[key as keyof HasherState].toString(),
                        )
                      }
                      className="btn btn-ghost"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HashGeneratorScreen;
