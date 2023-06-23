import React, { useState } from 'react';

function Home() {
  const topics = ["React JS", "Node JS", "Spring", "Django", "JavaScript", "Java", "Python"]
  const [role, setRole] = useState("")
  const [experience, setExperience] = useState("")

  const handleRoleChange = (event) => {
    setRole(event.target.value)
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      role,
      experience
    };
    console.log(obj)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text animate-marquee">
        Welcome to CodeVertax.....
      </h1>
      <div className="max-w-3xl mx-auto flex h-96 mb-16">
        <img src="https://i.makeagif.com/media/7-04-2018/qDFTM-.gif" alt="" className="w-1/2" />
        <form className="bg-white rounded-lg shadow-md p-10 pt-20 w-1/2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="selectOption">
              Name of the Role:-
            </label>
            <select
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="selectOption"
              value={role}
              onChange={handleRoleChange}
            >
              {topics.map((topic) => (
                <option key={topic + Date.now()} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="inputField">
              Experience:-
            </label>
            <input
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="inputField"
              type="number"
              placeholder="Enter your Experience in Years"
              value={experience}
              onChange={handleExperienceChange}
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
