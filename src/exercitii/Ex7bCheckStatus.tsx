
import { useState } from "react";

type JobResponse = {
  jobId: string;
};

type Job = {
  status: number;
};

export default function Ex7bCheckStatus() {
  const [jobId, setJobId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const statusText: string[] = [
    "În coadă",
    "Rulează",
    "Gata",
    "Eșuat"
  ];

  async function sendJob(): Promise<void> {
    setJobId("");
    setStatus("");

    const response = await fetch("/jobs-api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "email",
        payload: "Salut"
      })
    });

    if (response.ok) {
      const data: JobResponse = await response.json();
      setJobId(data.jobId);
    }
  }

  async function checkStatus(): Promise<void> {
    const response = await fetch(
        `/jobs-api/jobs/${jobId}`
    );

    if (response.ok) {
      const job: Job = await response.json();
      setStatus(statusText[job.status]);
    }
  }

  return (
      <>
        <h2>Verifică statusul jobului</h2>

        <button onClick={sendJob}>
          Trimite
        </button>

        <button
            onClick={checkStatus}
            disabled={jobId === ""}
        >
          Verifică
        </button>

        {jobId && <p>Job ID: {jobId}</p>}

        {status && <p>Status: {status}</p>}
      </>
  );
}
