import Layout from '@/components/Layout';
import routes from '@/data/routes';
import { copyTextToClip } from '@/utils';
import axios from 'axios';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const route = routes.filter((i) => i.route === 'my-ip-address')?.[0];

interface IIpLookupData {
  ip: string;
  city: string;
  country_name: string;
  isp: string;
  latitude: string;
  longitude: string;
  timezone: { name: string };
  zipcode: string;
}

async function fetchIpDetails(apiKey: string): Promise<IIpLookupData> {
  const res = await axios.get(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`,
  );
  return res.data;
}

const RandomPortGeneratorScreen = (props: {
  GEO_API_KEY: string;
  IP_GEO_API_KEY: string;
}) => {
  const { GEO_API_KEY, IP_GEO_API_KEY } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [lookup, setLookup] = useState<IIpLookupData | null>(null);

  const generatePasswords = useCallback(async () => {
    setIsLoading(true);
    const details = await fetchIpDetails(IP_GEO_API_KEY);
    const {
      ip,
      city,
      country_name,
      isp,
      latitude,
      longitude,
      timezone,
      zipcode,
    } = details;
    setLookup({
      ip,
      city,
      country_name,
      isp,
      latitude,
      longitude,
      timezone,
      zipcode,
    });
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
                  <p className="text-2xl font-bold">{lookup?.ip}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => lookup?.ip && copyTextToClip(lookup?.ip)}
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
                  <p className="text-2xl font-bold">{lookup?.country_name}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.country_name &&
                      copyTextToClip(lookup?.country_name)
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
                {/* <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">Timezone</p>
                  <p className="text-2xl font-bold">{lookup?.timezone.name}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.timezone && copyTextToClip(lookup?.timezone.name)
                    }
                  >
                    Copy
                  </button>
                </div> */}
                <div className="grid grid-cols-3 text-center items-center justify-center">
                  <p className="text-2xl">ZIP</p>
                  <p className="text-2xl font-bold">{lookup?.zipcode}</p>
                  <button
                    className="btn btn-ghost"
                    onClick={() =>
                      lookup?.zipcode && copyTextToClip(lookup?.zipcode)
                    }
                  >
                    Copy
                  </button>
                </div>
                <div>
                  {lookup?.latitude && lookup.longitude ? (
                    <div className="flex items-center justify-center">
                      <Image
                        src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${lookup?.longitude},${lookup?.latitude}&zoom=14&apiKey=${GEO_API_KEY}`}
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
  const GEO_API_KEY = process.env.GEO_API_KEY;
  const IP_GEO_API_KEY = process.env.IP_GEO_API_KEY;
  return {
    props: {
      GEO_API_KEY,
      IP_GEO_API_KEY,
    },
  };
}

export default RandomPortGeneratorScreen;
