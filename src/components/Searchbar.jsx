import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); //stops page from reloading
    navigate(`/search/${searchTerm}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-slate-300 focus-within:text-slate-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all Songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-6 h-6 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none placeholder-slate-500 text-base text-white p-4"
        />
      </div>
    </form>
  );
};
export default Searchbar;
