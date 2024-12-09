import Header from '../../components/Header';
const Custom404 = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-neutral-900 shadow-lg rounded-lg">
          <h1 className="text-6xl font-bold text-yellow-800 mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-4">
            The page that you search doesn't exist!
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-block bg-yellow-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out mb-3"
          >
           Back before
          </button>
        </div>
      </div>
    </>
  );
};

export default Custom404;
