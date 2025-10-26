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
      firstName: data.firstName.trim(),
      middleName: data.middleName?.trim() ?? "",
      lastName: data.lastName.trim(),
      groupId: Number(data.groupId) || 1,
      groupName: "",
      isDeleted: false,
      contacts: "",
    };

    addStudentMutate(newStudent);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("firstName", { required: true })}
        placeholder="Имя"
      />
      <input type="text" {...register("middleName")} placeholder="Отчество" />
      <input
        type="text"
        {...register("lastName", { required: true })}
        placeholder="Фамилия"
      />
      <input
        type="number"
        {...register("groupId", { required: true, min: 1 })}
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
