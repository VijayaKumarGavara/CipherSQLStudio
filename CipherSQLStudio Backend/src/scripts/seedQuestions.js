const mongoose = require("mongoose");
const Question = require("../models/questionModel");
const Table = require("../models/tableModel");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/CipherSQLStudio")
  .then(() => {
    console.log("MongoDB Connected");
    seedQuestions();
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });
const questions = [
  {
    question_title: "List All Departments",
    question_description:
      "Retrieve the names of all departments from the department table.",
    question_level: "Easy",
    tables_involved: ["department"],
    question_expected_query: "SELECT dept_name FROM department;",
  },

  {
    question_title: "Classrooms With Capacity Greater Than 50",
    question_description:
      "Retrieve building, room_number and capacity for classrooms where capacity is greater than 50.",
    question_level: "Easy",
    tables_involved: ["classroom"],
    question_expected_query:
      "SELECT building, room_number, capacity FROM classroom WHERE capacity > 50;",
  },

  {
    question_title: "Courses Offered By Comp. Sci. Department",
    question_description:
      "Retrieve course_id and title for courses offered by the Comp. Sci. department.",
    question_level: "Easy",
    tables_involved: ["course"],
    question_expected_query:
      "SELECT course_id, title FROM course WHERE dept_name = 'Comp. Sci.';",
  },

  {
    question_title: "Instructors With Salary Greater Than 80000",
    question_description:
      "Retrieve ID, name and salary of instructors earning more than 80000.",
    question_level: "Easy",
    tables_involved: ["instructor"],
    question_expected_query:
      "SELECT ID, name, salary FROM instructor WHERE salary > 80000;",
  },

  {
    question_title: "Students From Physics Department",
    question_description:
      "Retrieve ID and name of students belonging to the Physics department.",
    question_level: "Easy",
    tables_involved: ["student"],
    question_expected_query:
      "SELECT ID, name FROM student WHERE dept_name = 'Physics';",
  },

  {
    question_title: "Courses With 4 Credits",
    question_description:
      "Retrieve course_id and title of courses that have 4 credits.",
    question_level: "Easy",
    tables_involved: ["course"],
    question_expected_query:
      "SELECT course_id, title FROM course WHERE credits = 4;",
  },

  {
    question_title: "Sections Offered In Spring 2010",
    question_description:
      "Retrieve all sections offered in Spring semester of 2010.",
    question_level: "Easy",
    tables_involved: ["section"],
    question_expected_query:
      "SELECT * FROM section WHERE semester = 'Spring' AND year = 2010;",
  },

  {
    question_title: "Biology Department Instructors",
    question_description:
      "Retrieve names of instructors who belong to the Biology department.",
    question_level: "Easy",
    tables_involved: ["instructor"],
    question_expected_query:
      "SELECT name FROM instructor WHERE dept_name = 'Biology';",
  },

  {
    question_title: "Students With Total Credits Greater Than 60",
    question_description:
      "Retrieve ID and name of students having total credits greater than 60.",
    question_level: "Easy",
    tables_involved: ["student"],
    question_expected_query:
      "SELECT ID, name FROM student WHERE tot_cred > 60;",
  },

  {
    question_title: "Time Slots Starting At 8 AM",
    question_description: "Retrieve all time slots where start_hr equals 8.",
    question_level: "Easy",
    tables_involved: ["time_slot"],
    question_expected_query: "SELECT * FROM time_slot WHERE start_hr = 8;",
  },

  {
    question_title: "Courses Containing Word Computer",
    question_description:
      "Retrieve course_id and title of courses whose title contains the word 'Computer'.",
    question_level: "Easy",
    tables_involved: ["course"],
    question_expected_query:
      "SELECT course_id, title FROM course WHERE title LIKE '%Computer%';",
  },

  {
    question_title: "Departments Located In Painter Building",
    question_description:
      "Retrieve names of departments located in the Painter building.",
    question_level: "Easy",
    tables_involved: ["department"],
    question_expected_query:
      "SELECT dept_name FROM department WHERE building = 'Painter';",
  },

  {
    question_title: "Instructors Sorted By Salary Descending",
    question_description:
      "Retrieve ID, name and salary of instructors sorted in descending order of salary.",
    question_level: "Easy",
    tables_involved: ["instructor"],
    question_expected_query:
      "SELECT ID, name, salary FROM instructor ORDER BY salary DESC;",
  },

  {
    question_title: "Students Sorted By Total Credits",
    question_description:
      "Retrieve ID, name and tot_cred of students sorted by total credits in descending order.",
    question_level: "Easy",
    tables_involved: ["student"],
    question_expected_query:
      "SELECT ID, name, tot_cred FROM student ORDER BY tot_cred DESC;",
  },

  {
    question_title: "Courses With More Than 3 Credits",
    question_description:
      "Retrieve course_id and title of courses that have more than 3 credits.",
    question_level: "Easy",
    tables_involved: ["course"],
    question_expected_query:
      "SELECT course_id, title FROM course WHERE credits > 3;",
  },

  {
    question_title: "Students Along With Their Departments",
    question_description:
      "Retrieve student name and department name for all students.",
    question_level: "Medium",
    tables_involved: ["student"],
    question_expected_query: "SELECT name, dept_name FROM student;",
  },

  {
    question_title: "Instructor Names With Department Budgets",
    question_description:
      "Retrieve instructor name along with the budget of their department.",
    question_level: "Medium",
    tables_involved: ["instructor", "department"],
    question_expected_query:
      "SELECT i.name, d.budget FROM instructor i JOIN department d ON i.dept_name = d.dept_name;",
  },

  {
    question_title: "Courses Taught In Fall 2009",
    question_description:
      "Retrieve distinct course_id values for courses taught in Fall 2009.",
    question_level: "Medium",
    tables_involved: ["teaches"],
    question_expected_query:
      "SELECT DISTINCT course_id FROM teaches WHERE semester = 'Fall' AND year = 2009;",
  },

  {
    question_title: "Students Enrolled In CS-101",
    question_description:
      "Retrieve names of students who enrolled in course CS-101.",
    question_level: "Medium",
    tables_involved: ["student", "takes"],
    question_expected_query:
      "SELECT s.name FROM student s JOIN takes t ON s.ID = t.ID WHERE t.course_id = 'CS-101';",
  },

  {
    question_title: "Instructors Teaching In Spring 2010",
    question_description:
      "Retrieve distinct instructor names who taught in Spring 2010.",
    question_level: "Medium",
    tables_involved: ["instructor", "teaches"],
    question_expected_query:
      "SELECT DISTINCT i.name FROM instructor i JOIN teaches t ON i.ID = t.ID WHERE t.semester = 'Spring' AND t.year = 2010;",
  },
  {
    question_title: "Total Students Per Department",
    question_description:
      "Retrieve department name and total number of students in each department.",
    question_level: "Medium",
    tables_involved: ["student"],
    question_expected_query:
      "SELECT dept_name, COUNT(*) AS total_students FROM student GROUP BY dept_name;",
  },

  {
    question_title: "Average Instructor Salary Per Department",
    question_description:
      "Retrieve department name and average salary of instructors in each department.",
    question_level: "Medium",
    tables_involved: ["instructor"],
    question_expected_query:
      "SELECT dept_name, AVG(salary) AS avg_salary FROM instructor GROUP BY dept_name;",
  },

  {
    question_title: "Maximum Instructor Salary",
    question_description: "Retrieve the maximum salary among all instructors.",
    question_level: "Medium",
    tables_involved: ["instructor"],
    question_expected_query: "SELECT MAX(salary) FROM instructor;",
  },

  {
    question_title: "Courses That Have Prerequisites",
    question_description:
      "Retrieve distinct course_id values of courses that have prerequisites.",
    question_level: "Medium",
    tables_involved: ["prereq"],
    question_expected_query: "SELECT DISTINCT course_id FROM prereq;",
  },

  {
    question_title: "Students Who Received Grade A",
    question_description:
      "Retrieve distinct student names who received grade 'A' in any course.",
    question_level: "Medium",
    tables_involved: ["student", "takes"],
    question_expected_query:
      "SELECT DISTINCT s.name FROM student s JOIN takes t ON s.ID = t.ID WHERE t.grade = 'A';",
  },

  {
    question_title: "Courses With Multiple Sections",
    question_description:
      "Retrieve course_id and number of sections for courses offered in more than one section.",
    question_level: "Medium",
    tables_involved: ["section"],
    question_expected_query:
      "SELECT course_id, COUNT(*) AS total_sections FROM section GROUP BY course_id HAVING COUNT(*) > 1;",
  },

  {
    question_title: "Instructors Teaching More Than One Course",
    question_description:
      "Retrieve instructor ID and number of courses taught where instructor teaches more than one course.",
    question_level: "Medium",
    tables_involved: ["teaches"],
    question_expected_query:
      "SELECT ID, COUNT(course_id) AS total_courses FROM teaches GROUP BY ID HAVING COUNT(course_id) > 1;",
  },

  {
    question_title: "Classrooms Used In Spring 2010",
    question_description:
      "Retrieve distinct building and room_number used in Spring 2010.",
    question_level: "Medium",
    tables_involved: ["section"],
    question_expected_query:
      "SELECT DISTINCT building, room_number FROM section WHERE semester = 'Spring' AND year = 2010;",
  },

  {
    question_title: "Students With Their Advisors",
    question_description:
      "Retrieve student name along with their advisor name.",
    question_level: "Medium",
    tables_involved: ["advisor", "student", "instructor"],
    question_expected_query:
      "SELECT s.name, i.name AS advisor FROM advisor a JOIN student s ON a.s_ID = s.ID JOIN instructor i ON a.i_ID = i.ID;",
  },

  {
    question_title: "Students Who Took CS-101 With Their Credits",
    question_description:
      "Retrieve student name and total credits for students who took course CS-101.",
    question_level: "Medium",
    tables_involved: ["student", "takes"],
    question_expected_query:
      "SELECT s.name, s.tot_cred FROM student s JOIN takes t ON s.ID = t.ID WHERE t.course_id = 'CS-101';",
  },

  {
    question_title: "Departments With Budget Greater Than Average",
    question_description:
      "Retrieve department names whose budget is greater than the average budget of all departments.",
    question_level: "Medium",
    tables_involved: ["department"],
    question_expected_query:
      "SELECT dept_name FROM department WHERE budget > (SELECT AVG(budget) FROM department);",
  },

  {
    question_title: "Courses Without Prerequisites",
    question_description:
      "Retrieve course_id of courses that do not have any prerequisite.",
    question_level: "Medium",
    tables_involved: ["course", "prereq"],
    question_expected_query:
      "SELECT course_id FROM course WHERE course_id NOT IN (SELECT course_id FROM prereq);",
  },

  {
    question_title: "Students Who Took More Than Two Courses",
    question_description:
      "Retrieve student ID values for students who have taken more than two courses.",
    question_level: "Medium",
    tables_involved: ["takes"],
    question_expected_query:
      "SELECT ID FROM takes GROUP BY ID HAVING COUNT(course_id) > 2;",
  },

  {
    question_title: "Number Of Sections Per Semester",
    question_description:
      "Retrieve semester and number of sections offered in each semester.",
    question_level: "Medium",
    tables_involved: ["section"],
    question_expected_query:
      "SELECT semester, COUNT(*) AS total_sections FROM section GROUP BY semester;",
  },

  {
    question_title: "Instructors Not Teaching Any Course",
    question_description:
      "Retrieve instructor IDs of instructors who are not teaching any course.",
    question_level: "Medium",
    tables_involved: ["instructor", "teaches"],
    question_expected_query:
      "SELECT ID FROM instructor WHERE ID NOT IN (SELECT ID FROM teaches);",
  },

  {
    question_title: "Students Who Never Received Grade F",
    question_description:
      "Retrieve student IDs of students who never received grade 'F'.",
    question_level: "Hard",
    tables_involved: ["student", "takes"],
    question_expected_query:
      "SELECT ID FROM student WHERE ID NOT IN (SELECT ID FROM takes WHERE grade = 'F');",
  },

  {
    question_title: "Department With Highest Budget",
    question_description: "Retrieve department name having the highest budget.",
    question_level: "Hard",
    tables_involved: ["department"],
    question_expected_query:
      "SELECT dept_name FROM department WHERE budget = (SELECT MAX(budget) FROM department);",
  },

  {
    question_title: "Courses With Maximum Credits",
    question_description:
      "Retrieve course_id of courses that have maximum credits.",
    question_level: "Hard",
    tables_involved: ["course"],
    question_expected_query:
      "SELECT course_id FROM course WHERE credits = (SELECT MAX(credits) FROM course);",
  },

  {
    question_title: "Students Who Took Both CS-101 And CS-347",
    question_description:
      "Retrieve student IDs of students who have taken both CS-101 and CS-347.",
    question_level: "Hard",
    tables_involved: ["takes"],
    question_expected_query:
      "SELECT ID FROM takes WHERE course_id IN ('CS-101','CS-347') GROUP BY ID HAVING COUNT(DISTINCT course_id) = 2;",
  },

  {
    question_title: "Instructors Teaching Multiple Departments",
    question_description:
      "Retrieve instructor IDs who teach courses from more than one department.",
    question_level: "Hard",
    tables_involved: ["teaches", "course"],
    question_expected_query:
      "SELECT t.ID FROM teaches t JOIN course c ON t.course_id = c.course_id GROUP BY t.ID HAVING COUNT(DISTINCT c.dept_name) > 1;",
  },
  {
    question_title:
      "Students Advised By Instructors From Different Departments",
    question_description:
      "Retrieve student names where the advisor belongs to a different department than the student.",
    question_level: "Hard",
    tables_involved: ["advisor", "student", "instructor"],
    question_expected_query:
      "SELECT s.name FROM advisor a JOIN student s ON a.s_ID = s.ID JOIN instructor i ON a.i_ID = i.ID WHERE s.dept_name <> i.dept_name;",
  },

  {
    question_title: "Courses Offered In Every Semester",
    question_description:
      "Retrieve course_id values of courses that are offered in every distinct semester available in the section table.",
    question_level: "Hard",
    tables_involved: ["section"],
    question_expected_query:
      "SELECT course_id FROM section GROUP BY course_id HAVING COUNT(DISTINCT semester) = (SELECT COUNT(DISTINCT semester) FROM section);",
  },

  {
    question_title: "Students Who Took Course Without Completing Prerequisite",
    question_description:
      "Retrieve distinct student IDs who enrolled in a course without having taken its prerequisite.",
    question_level: "Hard",
    tables_involved: ["takes", "prereq"],
    question_expected_query:
      "SELECT DISTINCT t.ID FROM takes t JOIN prereq p ON t.course_id = p.course_id WHERE p.prereq_id NOT IN (SELECT course_id FROM takes WHERE ID = t.ID);",
  },

  {
    question_title: "Instructor Teaching Maximum Sections",
    question_description:
      "Retrieve instructor ID(s) who teach the maximum number of sections.",
    question_level: "Hard",
    tables_involved: ["teaches"],
    question_expected_query:
      "SELECT ID FROM teaches GROUP BY ID HAVING COUNT(*) = (SELECT MAX(section_count) FROM (SELECT COUNT(*) AS section_count FROM teaches GROUP BY ID) AS subquery);",
  },

  {
    question_title: "Students With Highest Total Credits",
    question_description:
      "Retrieve names of students who have the maximum total credits.",
    question_level: "Hard",
    tables_involved: ["student"],
    question_expected_query:
      "SELECT name FROM student WHERE tot_cred = (SELECT MAX(tot_cred) FROM student);",
  },

  {
    question_title: "Average Classroom Capacity Per Building",
    question_description:
      "Retrieve building and average classroom capacity for each building.",
    question_level: "Hard",
    tables_involved: ["classroom"],
    question_expected_query:
      "SELECT building, AVG(capacity) AS avg_capacity FROM classroom GROUP BY building;",
  },

  {
    question_title: "Departments Without Instructors",
    question_description:
      "Retrieve department names that have no instructors assigned.",
    question_level: "Hard",
    tables_involved: ["department", "instructor"],
    question_expected_query:
      "SELECT dept_name FROM department WHERE dept_name NOT IN (SELECT DISTINCT dept_name FROM instructor WHERE dept_name IS NOT NULL);",
  },

  {
    question_title: "Students Enrolled In Courses Taught By Their Advisor",
    question_description:
      "Retrieve distinct student IDs of students enrolled in courses that are taught by their advisor.",
    question_level: "Hard",
    tables_involved: ["advisor", "takes", "teaches"],
    question_expected_query:
      "SELECT DISTINCT a.s_ID FROM advisor a JOIN takes t ON a.s_ID = t.ID JOIN teaches te ON te.ID = a.i_ID AND te.course_id = t.course_id AND te.sec_id = t.sec_id AND te.semester = t.semester AND te.year = t.year;",
  },

  {
    question_title: "Courses That Are Prerequisites For Multiple Courses",
    question_description:
      "Retrieve prereq_id values that serve as prerequisites for more than one course.",
    question_level: "Hard",
    tables_involved: ["prereq"],
    question_expected_query:
      "SELECT prereq_id FROM prereq GROUP BY prereq_id HAVING COUNT(course_id) > 1;",
  },

  {
    question_title: "Students Who Took Courses From Multiple Departments",
    question_description:
      "Retrieve student IDs who have taken courses belonging to more than one department.",
    question_level: "Hard",
    tables_involved: ["takes", "course"],
    question_expected_query:
      "SELECT t.ID FROM takes t JOIN course c ON t.course_id = c.course_id GROUP BY t.ID HAVING COUNT(DISTINCT c.dept_name) > 1;",
  },
];

async function seedQuestions() {
  try {

    for (let q of questions) {

      const tableDocs = await Table.find({
        table_name: { $in: q.tables_involved }
      });

      const tableIds = tableDocs.map(t => t._id);

      if (tableIds.length !== q.tables_involved.length) {
        throw new Error(`Missing table reference for question: ${q.question_title}`);
      }

      const question = new Question({
        ...q,
        question_id: `Q${Date.now()}`,
        tables_involved: tableIds   
      });

      await question.save();
    }

    console.log("Questions inserted successfully!");
    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

