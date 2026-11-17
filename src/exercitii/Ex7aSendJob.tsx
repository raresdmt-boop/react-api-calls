
import { useState } from "react";

type JobResponse = {
  jobId: string;
};

export default function Ex7aSendJob() {
  const [type, setType] = useState<string>("email");
  const [jobId, setJobId] = useState<string>("");

  async function sendJob(): Promise<void> {
    const response = await fetch("/jobs-api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        payload: "Salut"
      })
    });

    if (response.ok) {
      const data: JobResponse = await response.json();
      setJobId(data.jobId);
    }
  }

  return (
      <>
        <h2>Trimite un job</h2>

        <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
        />

        <button onClick={sendJob}>
          Trimite
        </button>

        {jobId && <p>Job: {jobId}</p>}
      </>
  );
}
