import {useState} from "react";

type Job = {
  id: string;
  type: string;
  status: number;
};

type JobResponse = {
  jobId: string;
};

export default function Ex7eThreeJobs() {

  const [jobIds, setJobIds] = useState<string[]>([]);
  const [done, setDone] = useState<number | null>(null);

  async function sendJobs(): Promise<void> {
    const ids: string[] = [];

    setJobIds([]);
    setDone(null);

    for (const type of ["email", "raport", "export"]) {
      const response = await fetch("/jobs-api/jobs",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ type, payload: "Salut"})
      });

      const data: JobResponse = await response.json();

      ids.push(data.jobId);
    }

    setJobIds(ids);
  }

  async function checkJobs(): Promise<void> {
    let count = 0;

    for (const id of jobIds) {
      const response = await fetch(`/jobs-api/jobs/${id}`);
      const job: Job = await response.json();

      if( job.status === 2 ) {
        count += 1;
      }
    }
    setDone(count);
  }

  return (
      <>
        <h1>Trei joburi deodată</h1>

        <button onClick={sendJobs}>Trimite 3 joburi</button>

        <button onClick={checkJobs}
                disabled={jobIds.length !== 3}
        >Check jobs
        </button>

        {done !== null && (
            <p>Gata: {done} din {jobIds.length}</p>
        )}
      </>
  );
}
