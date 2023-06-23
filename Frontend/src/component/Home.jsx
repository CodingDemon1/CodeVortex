import React from 'react';

function Home() {
  const topics = ["React JS", "Node JS", "Spring", "Django", "JavaScript", "Java", "Python"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="max-w-3xl mx-auto flex h-96 mb-16">
        <img src="https://i.makeagif.com/media/7-04-2018/qDFTM-.gif" alt="" className="w-1/2" />
        <form className="bg-white rounded-lg shadow-md p-10 pt-20 w-1/2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectOption">
              Name of the Role
            </label>
            <select
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="selectOption"
            >
              {topics.map((topic) => (
                <option key={topic + Date.now()} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
              Experience:
            </label>
            <input
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="inputField"
              type="number"
              placeholder="Enter your Experience in Years"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
