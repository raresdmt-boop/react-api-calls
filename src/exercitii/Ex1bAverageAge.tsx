import {useState} from "react";

export default function Ex1bAverageAge() {

  const [avgAge, setAvgAge] = useState<number | null>(null);

  async function getAvgAverageAge(): Promise<void> {
    const response = await fetch("/users-api/api/users/average-age");
    const data = await response.json();
    setAvgAge(data.averageAge);
  }

  return (
   <>
   <button onClick = {() => getAvgAverageAge()}>
     Vârsta medie
   </button>
     {avgAge !== null && (
         <p>Vârsta medie: {avgAge}</p>
     )}
   </>
  );
}
