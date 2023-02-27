import globalMeta from '@/data/globalMeta';
import Head from 'next/head';

interface ICustomHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType: string;
}

const CustomHead = (props: ICustomHeadProps) => {
  const title = props.title ?? globalMeta.siteName;
  const description = props.description ?? globalMeta.description;
  const canonicalUrl = props.canonicalUrl ?? globalMeta.canonicalUrl;
  const ogType = props.ogType;

  return (
    <Head>
      <title>{title} </title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {/* Open graph meta tags. */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={globalMeta.siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={globalMeta.siteLogo} />
      <meta property="og:url" content={canonicalUrl} />
    </Head>
  );
};

export default CustomHead;
