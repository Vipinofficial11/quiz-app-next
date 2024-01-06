"use client";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import CreateQuizProblem from "./CreateQuizProblem";
import QuizControl from "./QuizControl";

export default function Admin() {
  const [quizId, setQuizId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [socket, setSocket] = useState<any | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3003");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Socket ID - ", socket.id);
      // Try adding the password from user, It may not work.
      socket.emit("joinAdmin", {
        password: "ADMIN_PASSWORD",
      });
    });
  }, []);

  if (!quizId) {
    return (
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-[#e4b580] to-[#e8729e]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a room
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="number"
                  placeholder="123 - 456"
                  required
                  onChange={(e) => setRoomId(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 md:px-3"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#5e4644] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#7f6867] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#382e2d]"
                onClick={() => {
                  socket.emit("createQuiz", {
                    roomId,
                  });
                  setQuizId(roomId);
                }}
              >
                create room
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  // Give Admin Controls and Problem Creation Authority
  return (
    <div>
      <CreateQuizProblem roomId={quizId} socket={socket} />
      <QuizControl socket={socket} roomId={roomId} />
    </div>
  );
}
