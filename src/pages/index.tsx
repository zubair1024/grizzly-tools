import CustomHead from '@/components/CustomHead';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import routes from '@/data/routes';

export default function Home() {
  return (
    <>
      <CustomHead ogType={'article'} />
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 px-10 gap-2">
          {routes.map((item) => (
            <ToolCard key={item.route} route={item} />
          ))}
        </div>
      </Layout>
    </>
  );
}
