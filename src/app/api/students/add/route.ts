import StudentInterface from "@/types/StudentInterface";
import { addStudentDb } from "@/db/studentDb";

export async function POST(request: Request): Promise<Response> {
  try {
    const student = (await request.json()) as StudentInterface;

    const insertedId = await addStudentDb(student);
    student.id = insertedId.id;

    return new Response(JSON.stringify(student), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/students/add error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
