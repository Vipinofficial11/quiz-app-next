"use client";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Component Abouts - Simple Question and Options Page
export default function Quiz({
  roomId,
  userId,
  problemId,
  quizData,
  socket,
}: {
  roomId: string;
  userId: string;
  problemId: string;
  quizData: { title: string; options: string[] };
  socket: any;
}) {
  const [selected, setSelected] = useState(quizData.options[0]);
  return (
    <>
      <div className="mb-5 mt-5">
        <label className="text-base font-semibold text-gray-900">
          {quizData.title}
        </label>
        <p className="text-sm text-gray-500">
          Select any one of the following options.
        </p>
      </div>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className="sr-only">Privacy setting</RadioGroup.Label>
        <div className="-space-y-px rounded-md bg-white">
          {quizData.options.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={settingIdx}
              value={setting}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  settingIdx === quizData.options.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked
                    ? "z-10 border-gray-200 bg-gray-50"
                    : "border-gray-200",
                  "relative flex cursor-pointer border p-4 focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? "bg-gray-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-gray-600" : "",
                      "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <span className="ml-3 flex flex-col">
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-gray-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      {setting}
                    </RadioGroup.Description>
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}
