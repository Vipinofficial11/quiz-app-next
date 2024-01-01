"use client";
export default function LeaderBoard({
  leaderboardData,
}: {
  points: number;
  username: string;
  profileImage: string;
}) {
  let imgcounter: number = 0;
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8 lg:py-8">
      <h1 className="text-2xl font-medium text-gray-900 text-center my-2">
        Leaderboard
      </h1>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {/* Showing the user's point on leaderboard by listing the items. */}

        {leaderboardData.map((person: any, index: number) => (
          <li
            key={index}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={`https://source.unsplash.com/random/200x200?sig=${imgcounter++}`}
                alt="user.jpeg"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-lg leading-6 text-gray-700">
                  <a>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.username}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.points} Points
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
