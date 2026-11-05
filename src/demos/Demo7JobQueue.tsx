import { useState } from "react";

type Job = {
  id: string;
  type: string;
  status: number;
};

const statusText: string[] = ["În coadă", "Rulează", "Gata", "Eșuat"];

export default function Demo7JobQueue() {
  const [jobId, setJobId] = useState<string>("");
  const [job, setJob] = useState<Job | null>(null);

  async function send(): Promise<void> {
    const response = await fetch("/jobs-api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email", payload: "Salut" }),
    });
    const data = await response.json();
    setJobId(data.jobId);
    setJob(null);
  }

  async function check(): Promise<void> {
    const response = await fetch(`/jobs-api/jobs/${jobId}`);
    const data: Job = await response.json();
    setJob(data);
  }

  return (
    <>
      <h1>Un răspuns care vine mai târziu</h1>
      <button onClick={send}>Trimite un job</button>
      {jobId !== "" && <p>Job trimis: {jobId}</p>}
      {jobId !== "" && <button onClick={check}>Verifică statusul</button>}
      {job !== null && <p>Status: {statusText[job.status]}</p>}
      <p className="hint">
        POST nu așteaptă să termine treaba: îți dă doar un id. Tu întrebi apoi, cu GET, „e gata?”.
        Apasă „Verifică” imediat și după 2 secunde.
      </p>
    </>
  );
}
