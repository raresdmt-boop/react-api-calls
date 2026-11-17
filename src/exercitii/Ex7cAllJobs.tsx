
import { useEffect, useState } from "react";

type Job = {
  id: string;
  type: string;
  status: number;
};

export default function Ex7cAllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const statusText: string[] = [
    "În coadă",
    "Rulează",
    "Gata",
    "Eșuat"
  ];

  async function load(): Promise<void> {
    const response = await fetch("/jobs-api/jobs");
    const data: Job[] = await response.json();
    setJobs(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
      <>
        <h2>Joburi: {jobs.length}</h2>

        <button onClick={load}>
          Reîncarcă
        </button>

        <ul>
          {jobs.map((job) => (
              <li key={job.id}>
                {job.type}: {statusText[job.status]}
              </li>
          ))}
        </ul>
      </>
  );
}
