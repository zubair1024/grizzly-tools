import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import routes from '@/data/routes';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-4 py-10 px-10">
          {routes.map((item) => (
            <ToolCard key={item.route} route={item} />
          ))}
        </div>
      </Layout>
    </>
  );
}
