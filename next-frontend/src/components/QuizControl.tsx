"use client";
export default function QuizControls({
  socket,
  roomId,
}: {
  socket: any;
  roomId: string;
}) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-1 lg:px-8">
      <div className="mt-6 mb-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#a55f79] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-[#da6e96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={() => {
              socket.emit("next", {
                roomId,
              });
            }}
          >
            Next Problem
          </button>
        </div>
      </div>
    </div>
  );
}
