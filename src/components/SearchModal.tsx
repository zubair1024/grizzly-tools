import routes from '@/data/routes';
import { IRoute } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

const SearchModal = () => {
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[]>([]);
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') return setFilteredRoutes([]);
    const filtered = routes.filter(
      (i) => i.title.toLowerCase().indexOf(value.toLowerCase()) > -1,
    );
    setFilteredRoutes(filtered);
  };

  return (
    <>
      <input type="checkbox" id="search-modal" className="modal-toggle" />
      <label htmlFor="search-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div>
            <input
              type="text"
              className="input w-full"
              placeholder="Search..."
              onChange={handleSearchTermChange}
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
          <div>
            <ul className="w-full pt-6 flex flex-col items-start justify-center">
              {filteredRoutes.map((item) => {
                return (
                  <li key={`search_${item.title}`}>
                    <Link href={item.route}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </label>
      </label>
    </>
  );
};

export default SearchModal;
