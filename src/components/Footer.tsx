import Link from 'next/link';

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <div className="text-sm py-5 px-5 flex justify-between">
      <p>Copyright © {year} - All right reserved</p>
      <p>
        <Link target={'_blank'} href="https://www.grizzlybit.dev">
          <button className="btn ">Grizzlybit.dev</button>
        </Link>
      </p>
    </div>
  );
};

export default Footer;
