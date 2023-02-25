import routes from '@/data/routes';
import Link from 'next/link';
import SearchModal from './SearchModal';

const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {routes.map((i) => (
                <li key={`menu_entry_${i.title}`}>
                  <Link href={i.route}>{i.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Tools - Grizzlybit.dev
          </Link>
        </div>
        <div className="navbar-end">
          <label htmlFor="search-modal" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </label>
          <SearchModal />
        </div>
      </div>
    </>
  );
};

export default Header;
