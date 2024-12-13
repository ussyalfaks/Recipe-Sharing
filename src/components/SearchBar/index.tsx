import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col min-w-40 !h-10 max-w-64">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
        <div className="text-[#886963] flex border-none bg-[#f4f1f0] items-center justify-center pl-4 rounded-l-xl border-r-0">
          <Search className="h-6 w-6" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181211] focus:outline-0 focus:ring-0 border-none bg-[#f4f1f0] focus:border-none h-full placeholder:text-[#886963] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
        />
      </div>
    </form>
  );
};

export default SearchBar;