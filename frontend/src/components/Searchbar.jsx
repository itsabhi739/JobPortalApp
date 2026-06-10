const SearchBar = () => {
  return (
    <section className="-mt-10 relative z-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Job Title"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Skills"
            className="border p-3 rounded-lg"
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