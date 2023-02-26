import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const route = routes.filter((i) => i.route === 'my-ip-address')?.[0];

interface IIpLookupData {
  query: string;
  city: string;
  country: string;
  isp: string;
  lat: string;
  lon: string;
  timezone: string;
  zip: string;
}

async function fetchIpDetails(): Promise<IIpLookupData> {
  const res = await axios.get('http://ip-api.com/json/');
  return res.data;
}

const RandomPortGeneratorScreen = (props: { geoApiKey: string }) => {
  const { geoApiKey } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lookup, setLookup] = useState<IIpLookupData | null>(null);

  const generatePasswords = useCallback(async () => {
    setIsLoading(true);
    const details = await fetchIpDetails();
    console.log(details);
    console.log(
      `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lookup?.lon},${lookup?.lat}&zoom=14&apiKey=${geoApiKey}`,
    );
    const { query, city, country, isp, lat, lon, timezone, zip } = details;
    setLookup({ query, city, country, isp, lat, lon, timezone, zip });
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
                  <p className="text-2xl">Public IP</p>
                  <p className="text-2xl font-bold">{lookup?.query}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.query && copyTextToClip(lookup?.query)
                    }
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">City</p>
                  <p className="text-2xl font-bold">{lookup?.city}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => lookup?.city && copyTextToClip(lookup?.city)}
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">Country</p>
                  <p className="text-2xl font-bold">{lookup?.country}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.country && copyTextToClip(lookup?.country)
                    }
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">ISP</p>
                  <p className="text-2xl font-bold">{lookup?.isp}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => lookup?.isp && copyTextToClip(lookup?.isp)}
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">Timezone</p>
                  <p className="text-2xl font-bold">{lookup?.timezone}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.timezone && copyTextToClip(lookup?.timezone)
                    }
                  >
                    Copy
                  </button>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">ZIP</p>
                  <p className="text-2xl font-bold">{lookup?.zip}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => lookup?.zip && copyTextToClip(lookup?.zip)}
                  >
                    Copy
                  </button>
                </div>
                <div>
                  {lookup?.lat && lookup.lon ? (
                    <div className="flex items-center justify-center">
                      <Image
                        src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lookup?.lon},${lookup?.lat}&zoom=14&apiKey=${geoApiKey}`}
                        height={512}
                        width={512}
                        alt={'address'}
                      ></Image>
                    </div>
                  ) : (
                    ''
                  )}
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

export async function getServerSideProps() {
  const geoApiKey = process.env.GEO_API_KEY;
  return {
    props: {
      geoApiKey,
    },
  };
}

export default RandomPortGeneratorScreen;
