
import { useState } from "react";

type Course = {
  id: number;
  courseName: string;
  departament: string;
};

export default function Ex8dSchoolCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses(): Promise<void> {
    const loginResponse = await fetch("/school-api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@online-school.ro",
        password: "password"
      }),
    });

    if (!loginResponse.ok) {
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.accessToken;

    const coursesResponse = await fetch("/school-api/courses", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (!coursesResponse.ok) {
      return;
    }

    const data: Course[] = await coursesResponse.json();
    setCourses(data);
  }

  return (
      <>
        <h1>Cursurile de la school</h1>

        <button onClick={() => getCourses()}>
          Cursurile
        </button>

        <ul>
          {courses.map((course) => (
              <li key={course.id}>
                {course.courseName} ({course.departament})
              </li>
          ))}
        </ul>
      </>
  );
}
