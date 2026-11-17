import { useState } from "react";

type Job = {
  id: string;
  type: string;
  status: number;
};

type JobResponse = {
  jobId: string;
};

const statusText: string[] = ["În coadă", "Rulează", "Gata", "Eșuat"];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Ex7dAutoCheck() {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendAndCheck(): Promise<void> {
    setLoading(true);
    setHistory([]);

    try {
      const response = await fetch("/jobs-api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "email", payload: "Salut" }),
      });

      if (!response.ok) {
        throw new Error("Nu am putut trimite jobul");
      }

      const data: JobResponse = await response.json();

      let status = 0;
      const seen: string[] = [];

      while (status < 2) {
        await wait(500);

        const checkResponse = await fetch(`/jobs-api/jobs/${data.jobId}`);

        if (!checkResponse.ok) {
          throw new Error("Nu am putut verifica jobul");
        }

        const job: Job = await checkResponse.json();

        status = job.status;
        seen.push(statusText[status]);
        setHistory([...seen]);
      }
    } catch (error) {
      setHistory((previous) => [
        ...previous,
        error instanceof Error ? error.message : "Eroare necunoscută",
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
      <>
        <h1>Verifică singur până e gata</h1>

        <button onClick={sendAndCheck} disabled={loading}>
          {loading ? "Se verifică..." : "Trimite job"}
        </button>

        <ol>
          {history.map((item, index) => (
              <li key={index}>{item}</li>
          ))}
        </ol>
      </>
  );
}
