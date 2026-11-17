import { useEffect, useState } from "react";

type AverageAge = {
  averageAge: number;
};

export default function Ex2bStartAverage() {
  const [average, setAverage] = useState<number | null>(null);

  async function load(): Promise<void> {
    const response = await fetch(
        "/users-api/api/users/average-age"
    );

    const data: AverageAge = await response.json();
    setAverage(data.averageAge);
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        <h1>Vârsta medie</h1>
        <p>
          Vârsta medie: {average === null ? "..." : average}
        </p>
      </>
  );
}