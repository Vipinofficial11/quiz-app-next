"use client";
export default function LeaderBoard({
  leaderboardData,
}: {
  points: number;
  username: string;
  profileImage: string;
}) {
  return (
    <>
      <div className="flex justify-between px-4 py-6 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Leaderboard</h2>
      </div>

      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {/* Showing the user's point on leaderboard by listing the items. */}

        {leaderboardData.map((person: any) => (
          <li
            key={person.username}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.profileImage}
                alt="user.jpeg"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {person.name}
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
    </>
  );
}
