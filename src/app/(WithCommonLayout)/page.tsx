"use client";

import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log("🚀 ~ HomePage ~ user:", user);

  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
};

export default HomePage;
