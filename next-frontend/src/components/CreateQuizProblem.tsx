"use client";
import { useState } from "react";

export default function CreateQuizProblem({
  quizId,
  socket,
}: {
  quizId: string;
  socket: any;
}) {
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [answer, setAnswer] = useState(0);
  const [problemOptions, setProblemOptions] = useState([
    {
      id: 0,
      title: "",
    },
    {
      id: 1,
      title: "",
    },
    {
      id: 2,
      title: "",
    },
    {
      id: 3,
      title: "",
    },
  ]);

  return (
    <div>
      Create problem Title ={" "}
      <input
        type="text"
        onChange={(e) => {
          setProblemTitle(e.target.value);
        }}
      ></input>
      <br />
      <br />
      Description -{" "}
      <input
        type="text"
        onChange={(e) => {
          setProblemDescription(e.target.value);
        }}
      ></input>
      <br />
      {[0, 1, 2, 3].map((optionId) => (
        <div>
          <input
            type="radio"
            checked={optionId === answer}
            onChange={() => {
              setAnswer(optionId);
            }}
          ></input>
          Option {optionId}
          <input
            type="text"
            onChange={(e) => {
              setProblemOptions((options) =>
                options.map((x) => {
                  if (x.id === optionId) {
                    return {
                      ...x,
                      title: e.target.value,
                    };
                  }
                  return x;
                })
              );
            }}
          ></input>
          <br />
        </div>
      ))}
      <button
        onClick={() => {
          socket.emit("createProblem", {
            quizId,
            problem: {
              problemTitle,
              problemDescription,
              problemOptions,
              answer,
            },
          });
        }}
      >
        Add problem
      </button>
    </div>
  );
}
