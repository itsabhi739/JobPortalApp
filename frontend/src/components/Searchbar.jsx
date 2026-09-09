const SearchBar = () => {
  return (
    <section className="-mt-10 relative z-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Job Title"
            className="border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Location"
            className="border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <input
            type="text"
            placeholder="Skills"
            className="border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <button className="bg-blue-600 text-white rounded-lg">
            Search
          </button>

        </div>
      </div>
    </section>
  );
};

export default SearchBar;