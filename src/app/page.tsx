"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [userData, setUserData] = useState(session.data);

  useEffect(() => {
    setUserData(session.data);
  }, [session.data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre className="bg-secondary p-3 rounded-lg">
        <code>{JSON.stringify(userData, null, 2)}</code>
      </pre>
    </main>
  );
}
