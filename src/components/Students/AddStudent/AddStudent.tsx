"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useStudents from "@/hooks/useStudents";
import type StudentInterface from "@/types/StudentInterface";

const AddStudent: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<StudentInterface>();
  const { addStudentMutate } = useStudents();

  const onSubmit: SubmitHandler<StudentInterface> = (data) => {
    const newStudent: StudentInterface = {
      id: 0,
      first_name: data.first_name.trim(),
      middle_name: data.middle_name?.trim() ?? "",
      last_name: data.last_name.trim(),
      group_id: Number(data.group_id) || 1,
      group_name: "",
      isDeleted: false,
    };

    addStudentMutate(newStudent);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("first_name", { required: true })}
        placeholder="Имя"
      />
      <input type="text" {...register("middle_name")} placeholder="Отчество" />
      <input
        type="text"
        {...register("last_name", { required: true })}
        placeholder="Фамилия"
      />
      <input
        type="number"
        {...register("group_id", { required: true, min: 1 })}
        placeholder="ID группы"
      />

      <label>
        <input type="checkbox" {...register("isDeleted")} />
        <span>Помечен как удалённый</span>
      </label>

      <button type="submit">Добавить студента</button>
    </form>
  );
};

export default AddStudent;
