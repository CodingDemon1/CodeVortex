import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useVerify from "../Hooks/useVerify";
import axios from "axios";
import { Spinner } from "@chakra-ui/spinner";
import { useDispatch } from "react-redux";
import { QUESTIONS_UPDATE } from "../Redux/actionTypes";

function Home() {
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const topics = [
    "React JS",
    "Node JS",
    "Spring",
    "Django",
    "JavaScript",
    "Java",
    "Python",
  ];
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verified = useVerify();
  console.log(verified, "verified");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (role && experience) {
      let obj = {
        role,
        experience,
      };
      console.log(obj);
      axios
        .post(`${url}/question/query`, obj)
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            const questions = {};
            res.data.data.forEach((question, i) => {
              // questions.push({ question, answer: "" });
              questions[`question${i + 1}`] = { question, answer: "" };
            });
            dispatch({ type: QUESTIONS_UPDATE, payload: questions });
            navigate("/interview");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Fill the necessary details required.",
        // description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text animate-marquee">
        Welcome to CodeVertax.....
      </h1>
      <div className="max-w-3xl mx-auto flex h-96 mb-16">
        <img
          src="https://i.makeagif.com/media/7-04-2018/qDFTM-.gif"
          alt=""
          className="w-1/2"
        />
        <form
          className="bg-white rounded-lg shadow-md p-10 pt-20 w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="selectOption"
            >
              Name of the Role:-
            </label>
            <select
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="selectOption"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="">Select the interview topic</option>
              {topics.map((topic) => (
                <option key={topic + Date.now()} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="selectExperience"
            >
              Experience:-
            </label>
            <select
              className="block w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="selectExperience"
              value={experience}
              onChange={handleExperienceChange}
            >
              <option value="">---Select Option---</option>
              <option value={0}>Fresher</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>More</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 flex justify-center items-center min-w-[145px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              {loading ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                />
              ) : (
                "Start Interview"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
