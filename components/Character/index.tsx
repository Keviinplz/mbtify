import { signOut } from "next-auth/react";
import { trpc } from "../../utils/trpc";

interface CharacterProps {
  tracksIds: string[];
}

export default function Character({ tracksIds }: CharacterProps) {
  const response = trpc.useQuery([
    "get-valence-by-tracks",
    { tracks: tracksIds },
  ]);

  if (!response.data) {
    return <p>Loading...</p>;
  }

  if (response.data.error && response.data.error === "Unauthorized") {
    signOut();
    return <p>Your access token is not valid, please login again.</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(response.data.features![0], null, 4)}</pre>
    </div>
  );
}
