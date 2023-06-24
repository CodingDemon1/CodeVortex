import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import FontAwesomeIcon from ""
import { AiOutlineFileDone } from "react-icons/ai";
import { PiNotePencil } from "react-icons/pi";
import { Link } from "react-router-dom";
const quotes = [
  "Believe in yourself and your abilities.",
  "Confidence is the key to success in any interview.",
  "Preparation is the foundation of success.",
  "Putting the effort beforehand, will make you shine during the interview.",
  "Let your authenticity shine through.",
  "Stay positive and maintain a can-do attitude. ",
  "Remember Your enthusiasm and optimism will leave a lasting impression.",
  "Focus on your strengths, but also be willing to acknowledge areas for improvement.",
  " Show a growth mindset and a willingness to learn.",
  "Remember The interview is a conversation, not an interrogation.",
  "Tip: Engage with the interviewers show genuine interest.",
  "Keep pushing forward",
  "the right opportunity will come your way.",
];
const PerfomanceFeedback = () => {
  const name = useSelector((store) => store.reducer.user?.name);
  const feedback = useSelector((store) => store.reducer.feedback);
  const [loading, setLoading] = useState(true);

  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  if (loading) {
    return (
      <Center mt={40}>
        <VStack>
          <Spinner size="xl" />
          <Heading>Please wait while we generate feedback for you...</Heading>
          <Divider p={"10px"} />
        </VStack>
      </Center>
    );
  }
  return (
    <Box>
      <Center>
        <Flex alignItems={"center"} fontSize={"30px"} mt={10} fontWeight={500}>
          <AiOutlineFileDone />
          {quotes[Math.floor((Math.random() * 1000) / 100)]}
        </Flex>
      </Center>

      <Text fontSize={"25px"} fontWeight={700} textAlign={"center"} m={"4%"}>
        YOUR {feedback?.split("\n")[2]?.replace(",", "")?.toUpperCase()}/10
        {/* {feedback} */}
        {console.log(
          feedback?.split("\n")[3]?.replace("feedback:", ""),
          "feedback"
        )}
        {console.log(feedback?.split("\n")[2], "score")}
      </Text>
      <Box
        border={"5px solid #cf49f0b5"}
        borderBlockStartColor={"#9958F5"}
        borderLeftColor={"#a978edc0"}
        w={"70%"}
        margin={"auto"}
      >
        <Box bg={"#cd8fe3cc"}>
          <Flex alignItems={"center"}>
            <PiNotePencil />{" "}
            <Heading fontSize={"18px"} p={"3px"}>
              Feedback note's
            </Heading>
          </Flex>
          <hr />
          <Text fontSize={"13px"} pl={"15px"}>
            -These tips can expedite your hiring success.{" "}
          </Text>
        </Box>
        <Box p={"10px"} width={"80%"} fontSize={"20px"} marginLeft={"20px"}>
          <Text>
            <span style={{ fontWeight: 500 }}> Advice :</span>
            {feedback
              .split("\n")[3]
              ?.replace("feedback:", "")
              .replace(",", "")
              .replaceAll("'", "")
              .replace("extra:", "")
              .replace(",", "")
              .replaceAll("'", "")
              .replaceAll("[", "")
              .replaceAll("]", "")
              .replaceAll(".", "")
              .replace("feedback", "")
              .replace("error", "")
              .replace(":", "")
              .replace("extra", "")}
            .
          </Text>
          <Box>
            <Text m={"5px"}>
              <span style={{ fontWeight: 500 }}> Extra Tip :</span>{" "}
              {feedback
                ?.split("\n")[4]
                ?.replace("feedback:", "")
                .replace(",", "")
                .replaceAll("'", "")
                .replace("extra:", "")
                .replace(",", "")
                .replaceAll("'", "")
                .replaceAll("[", "")
                .replaceAll("]", "")
                .replaceAll(".", "")
                .replace("feedback", "")
                .replace("error", "")
                .replace(":", "")
                .replace("extra", "")
                .replace(`""`, "")}
              .
            </Text>
            <Text m={"5px"}>
              {feedback
                ?.split("\n")[5]
                ?.replace("feedback:", "")
                .replace(",", "")
                .replaceAll("'", "")
                .replace("extra:", "")
                .replace(",", "")
                .replaceAll("'", "")
                .replaceAll("[", "")
                .replaceAll("]", "")
                .replaceAll(".", "")
                .replace("feedback", "")
                .replace("error", "")
                .replace(":", "")
                .replace("extra", "")
                .replace('""', "")
                .replace("error", "") === "null"
                ? ""
                : `${`${"Oversight" + " :"}`} ${feedback
                    .split("\n")[5]
                    ?.replace("feedback:", "")
                    .replace(",", "")
                    .replaceAll("'", "")
                    .replace("extra:", "")
                    .replace(",", "")
                    .replaceAll("'", "")
                    .replaceAll("[", "")
                    .replaceAll("]", "")
                    .replaceAll(".", "")
                    .replace("feedback", "")
                    .replace("error", "")
                    .replace(":", "")
                    .replace("extra", "")
                    .replace('""', "")
                    .replace("error", "")}`}
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex justify={"end"} mr={"15%"} mt={"5px"}>
        <Button bg={"#9759F5"} color={"white"}>
          <Link to={"/home"}>Home</Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default PerfomanceFeedback;
