"use client";
export default function QuizControl({
  roomId,
  socket,
}: {
  roomId: string;
  socket: any;
}) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={() => {
              socket.emit("next", { roomId });
            }}
          >
            Next Problem
          </button>
        </div>
      </div>
    </div>
  );
}
