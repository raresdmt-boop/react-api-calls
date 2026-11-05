import { useState } from "react";
import type { ReactNode } from "react";
import Demo1FetchClick from "./demos/Demo1FetchClick";
import Ex1aCount from "./exercitii/Ex1aCount";
import Ex1bAverageAge from "./exercitii/Ex1bAverageAge";
import Ex1cTop3 from "./exercitii/Ex1cTop3";
import Ex1dEmails from "./exercitii/Ex1dEmails";
import Ex1eMinors from "./exercitii/Ex1eMinors";
import Demo2UseEffect from "./demos/Demo2UseEffect";
import Ex2aStartList from "./exercitii/Ex2aStartList";
import Ex2bStartAverage from "./exercitii/Ex2bStartAverage";
import Ex2cAdults from "./exercitii/Ex2cAdults";
import Ex2dYahoo from "./exercitii/Ex2dYahoo";
import Ex2eFirstUser from "./exercitii/Ex2eFirstUser";
import Demo3LoadingError from "./demos/Demo3LoadingError";
import Ex3aLoading from "./exercitii/Ex3aLoading";
import Ex3bServerDown from "./exercitii/Ex3bServerDown";
import Ex3cNotFound from "./exercitii/Ex3cNotFound";
import Ex3dRetry from "./exercitii/Ex3dRetry";
import Ex3eStatuses from "./exercitii/Ex3eStatuses";
import Demo4Params from "./demos/Demo4Params";
import Ex4aOlderThan from "./exercitii/Ex4aOlderThan";
import Ex4bDomain from "./exercitii/Ex4bDomain";
import Ex4cBetweenAges from "./exercitii/Ex4cBetweenAges";
import Ex4dEmailExists from "./exercitii/Ex4dEmailExists";
import Ex4ePages from "./exercitii/Ex4ePages";
import Demo5Post from "./demos/Demo5Post";
import Ex5aCreate from "./exercitii/Ex5aCreate";
import Ex5bValidationErrors from "./exercitii/Ex5bValidationErrors";
import Ex5cConflict from "./exercitii/Ex5cConflict";
import Ex5dAddToList from "./exercitii/Ex5dAddToList";
import Ex5eClearOnSuccess from "./exercitii/Ex5eClearOnSuccess";
import Demo6PatchDelete from "./demos/Demo6PatchDelete";
import Ex6aDelete from "./exercitii/Ex6aDelete";
import Ex6bYounger from "./exercitii/Ex6bYounger";
import Ex6cRename from "./exercitii/Ex6cRename";
import Ex6dPassword from "./exercitii/Ex6dPassword";
import Ex6eDeleteTwice from "./exercitii/Ex6eDeleteTwice";
import Demo7JobQueue from "./demos/Demo7JobQueue";
import Ex7aSendJob from "./exercitii/Ex7aSendJob";
import Ex7bCheckStatus from "./exercitii/Ex7bCheckStatus";
import Ex7cAllJobs from "./exercitii/Ex7cAllJobs";
import Ex7dAutoCheck from "./exercitii/Ex7dAutoCheck";
import Ex7eThreeJobs from "./exercitii/Ex7eThreeJobs";
import Demo8Login from "./demos/Demo8Login";
import Ex8aShopLogin from "./exercitii/Ex8aShopLogin";
import Ex8bProducts from "./exercitii/Ex8bProducts";
import Ex8cWrongPassword from "./exercitii/Ex8cWrongPassword";
import Ex8dSchoolCourses from "./exercitii/Ex8dSchoolCourses";
import Ex8eLogout from "./exercitii/Ex8eLogout";

type Page = {
  title: string;
  page: ReactNode;
};

type Section = {
  title: string;
  page: ReactNode;
  exercises: Page[];
};

const sections: Section[] = [
  {
    title: "1. fetch la click",
    page: <Demo1FetchClick />,
    exercises: [
      { title: "1a. Câți utilizatori", page: <Ex1aCount /> },
      { title: "1b. Vârsta medie", page: <Ex1bAverageAge /> },
      { title: "1c. Top 3 cei mai în vârstă", page: <Ex1cTop3 /> },
      { title: "1d. Emailurile", page: <Ex1dEmails /> },
      { title: "1e. Câți minori", page: <Ex1eMinors /> },
    ],
  },
  {
    title: "2. useEffect la pornire",
    page: <Demo2UseEffect />,
    exercises: [
      { title: "2a. Lista la pornire", page: <Ex2aStartList /> },
      { title: "2b. Media la pornire", page: <Ex2bStartAverage /> },
      { title: "2c. Adulții", page: <Ex2cAdults /> },
      { title: "2d. Utilizatorii de pe yahoo", page: <Ex2dYahoo /> },
      { title: "2e. Primul utilizator", page: <Ex2eFirstUser /> },
    ],
  },
  {
    title: "3. Se încarcă / eroare",
    page: <Demo3LoadingError />,
    exercises: [
      { title: "3a. Se încarcă...", page: <Ex3aLoading /> },
      { title: "3b. Serverul oprit", page: <Ex3bServerDown /> },
      { title: "3c. Email inexistent", page: <Ex3cNotFound /> },
      { title: "3d. Reîncearcă", page: <Ex3dRetry /> },
      { title: "3e. Statusul pe ecran", page: <Ex3eStatuses /> },
    ],
  },
  {
    title: "4. Parametri în URL",
    page: <Demo4Params />,
    exercises: [
      { title: "4a. Mai în vârstă decât", page: <Ex4aOlderThan /> },
      { title: "4b. După domeniu", page: <Ex4bDomain /> },
      { title: "4c. Între două vârste", page: <Ex4cBetweenAges /> },
      { title: "4d. Emailul există?", page: <Ex4dEmailExists /> },
      { title: "4e. Pagini de câte 2", page: <Ex4ePages /> },
    ],
  },
  {
    title: "5. POST",
    page: <Demo5Post />,
    exercises: [
      { title: "5a. Creează un utilizator", page: <Ex5aCreate /> },
      { title: "5b. Erorile 400", page: <Ex5bValidationErrors /> },
      { title: "5c. Email deja folosit", page: <Ex5cConflict /> },
      { title: "5d. Apare în listă", page: <Ex5dAddToList /> },
      { title: "5e. Golește doar la succes", page: <Ex5eClearOnSuccess /> },
    ],
  },
  {
    title: "6. PATCH și DELETE",
    page: <Demo6PatchDelete />,
    exercises: [
      { title: "6a. Șterge", page: <Ex6aDelete /> },
      { title: "6b. −1 an", page: <Ex6bYounger /> },
      { title: "6c. Redenumește", page: <Ex6cRename /> },
      { title: "6d. Schimbă parola", page: <Ex6dPassword /> },
      { title: "6e. Șterge de două ori", page: <Ex6eDeleteTwice /> },
    ],
  },
  {
    title: "7. Job queue",
    page: <Demo7JobQueue />,
    exercises: [
      { title: "7a. Trimite un job", page: <Ex7aSendJob /> },
      { title: "7b. Verifică statusul", page: <Ex7bCheckStatus /> },
      { title: "7c. Toate joburile", page: <Ex7cAllJobs /> },
      { title: "7d. Verifică singur până e gata", page: <Ex7dAutoCheck /> },
      { title: "7e. Trei joburi deodată", page: <Ex7eThreeJobs /> },
    ],
  },
  {
    title: "8. Login + token",
    page: <Demo8Login />,
    exercises: [
      { title: "8a. Login la shop", page: <Ex8aShopLogin /> },
      { title: "8b. Produsele cu token", page: <Ex8bProducts /> },
      { title: "8c. Parolă greșită", page: <Ex8cWrongPassword /> },
      { title: "8d. Cursurile de la school", page: <Ex8dSchoolCourses /> },
      { title: "8e. Logout", page: <Ex8eLogout /> },
    ],
  },
];

export default function App() {
  const [selected, setSelected] = useState<Page>(sections[0]);

  return (
    <div className="app">
      <nav className="menu">
        {sections.map((section) => (
          <div key={section.title}>
            <h2>{section.title}</h2>
            {[section, ...section.exercises].map((item) => (
              <button
                key={item.title}
                className={item === selected ? "active" : ""}
                onClick={() => setSelected(item)}
              >
                {item === section ? "Demo" : item.title}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <main className="content">{selected.page}</main>
    </div>
  );
}
