import sqlite3 from "sqlite3";

import type StudentInterface from "@/types/StudentInterface";

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const students = await new Promise((resolve, reject) => {
    const sql =
      "SELECT S.id, S.first_name, S.last_name, S.middle_name, G.name AS group_name, S.isDeleted AS isDeleted FROM students S INNER JOIN [groups] G ON S.group_id == G.id";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });
  console.log(students);
  return students as StudentInterface[];
};

export const deleteStudentDb = async (id: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const sql = `UPDATE students SET isDeleted = 1 WHERE id = ${id}`;
  await db.run(sql);
  return id;
};

export const addStudentDb = async (
  student: StudentInterface,
): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const sql = `INSERT INTO students (first_name, middle_name, last_name, group_id) VALUES (?, ?, ?, ?)`;
  const params = [
    student.first_name,
    student.middle_name,
    student.last_name,
    student.group_id,
  ];

  const insertedId: number = await new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        db.close();
        return reject(err);
      }

      resolve(this.lastID);
      db.close();
    });
  });

  return insertedId;
};
