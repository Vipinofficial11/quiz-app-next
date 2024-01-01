"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Quiz from "./Quiz";
import LeaderBoard from "./Leaderboard";

export default function Login() {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isSubmitted) {
    return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter the code to join
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="number"
                  placeholder="123 - 456"
                  required
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-3"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Alex"
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                onClick={() => setIsSubmitted(true)}
              >
                Join room
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Login as admin?
            <a
              href="#"
              className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500"
            >
              Click here
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <User code={code} name={name} />;
}

// Props for the User
interface UserProps {
  code: string;
  name: string;
}

export const User = ({ code, name }: UserProps) => {
  const [socket, setSocket] = useState<null | any>(null);
  const roomId = code;
  const [quizCurrentState, setQuizCurrentState] = useState("not_started");
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userId, setUserId] = useState("");

  // Creating the socket and setting it using setSocket.

  useEffect(() => {
    const socket = io("http://localhost:3003");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connection Socket ID - ", socket.id);
      // Emitting the ID provided by the user and its name.
      socket.emit("join", { roomId, name });
    });

    // Getting emitted from backend once a user joins
    socket.on("init", ({ userId, state }) => {
      console.log("STATE: ", state.type);
      setUserId(userId);

      if (state.leaderboard) {
        setLeaderboard(state.leaderboard);
      }

      if (state.problem) {
        setCurrentQuestion(state.problem);
      }

      setQuizCurrentState(state.type);
    });

    socket.on("leaderboard", (data) => {
      setQuizCurrentState("leaderboard");
      setLeaderboard(data.leaderboard);
    });
    // changed problem -> createProblem
    socket.on("problem", (data) => {
      console.log("Problem is created an I am debugging ");
      setQuizCurrentState("question");
      setCurrentQuestion(data.problem);
    });
  }, []);

  if (quizCurrentState === "not_started") {
    return (
      <div className="text-center font-bold text-xl">
        Quiz is not started yet.
      </div>
    );
  }

  if (quizCurrentState === "question") {
    return (
      <Quiz
        roomId={roomId}
        userId={userId}
        problemId={currentQuestion.id}
        quizData={{
          title: currentQuestion.description,
          options: currentQuestion.options,
        }}
        socket={socket}
      />
    );
  }

  if (quizCurrentState === "leaderboard") {
    return (
      <LeaderBoard
        leaderboardData={leaderboard.map((x: any) => ({
          points: x.points,
          username: x.name,
          image: x.image,
        }))}
      />
    );
  }

  return (
    <div>
      <br />
      Quiz has ended -{quizCurrentState}
    </div>
  );
};
