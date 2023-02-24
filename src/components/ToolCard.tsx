import { IRoute } from '@/types';
import Link from 'next/link';

interface IToolCardProps {
  route: IRoute;
}
const ToolCard = (props: IToolCardProps) => {
  return (
    <>
      <Link href={props.route.route}>
        <div className="card w-full h-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{props.route.title}</h2>
            <p>{props.route.desc}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Go</button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ToolCard;
