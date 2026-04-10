import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

const Dashboard = () => {
  const name = localStorage.getItem("name");

  // 🔹 STATES
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    age: "",
  });

  const [editingStudent, setEditingStudent] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    studentId: "",
  });

  // 🔹 FETCH STUDENTS
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/students`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  // 🔹 FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/tasks`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  // 🔹 ADD STUDENT
  const handleAddStudent = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/students`,
        newStudent,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setStudents([...students, res.data]);
      setNewStudent({ name: "", class: "", age: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 DELETE STUDENT
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/students/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setStudents(students.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 UPDATE STUDENT
  const handleUpdateStudent = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/students/${editingStudent._id}`,
        editingStudent,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setStudents(
        students.map((s) =>
          s._id === editingStudent._id ? res.data : s
        )
      );

      setEditingStudent(null);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 ADD TASK
  const handleAddTask = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/tasks`,
        newTask,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTasks([...tasks, res.data]);
      setNewTask({ title: "", studentId: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 COMPLETE TASK
  const handleCompleteTask = async (id) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/tasks/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Welcome, {name} 👋
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">

        {/* STUDENTS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">👨‍🎓 Students</h2>

          {/* ADD STUDENT */}
          <div className="mb-4 space-y-2">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Class"
              className="w-full p-2 border rounded"
              value={newStudent.class}
              onChange={(e) =>
                setNewStudent({ ...newStudent, class: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Age"
              className="w-full p-2 border rounded"
              value={newStudent.age}
              onChange={(e) =>
                setNewStudent({ ...newStudent, age: e.target.value })
              }
            />

            <button
              onClick={handleAddStudent}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Add Student
            </button>
          </div>

          {/* EDIT STUDENT */}
          {editingStudent && (
            <div className="mb-4 space-y-2 bg-yellow-50 p-3 rounded">
              <input
                type="text"
                value={editingStudent.name}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                value={editingStudent.class}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, class: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                value={editingStudent.age}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, age: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <button
                onClick={handleUpdateStudent}
                className="w-full bg-yellow-500 text-white py-2 rounded"
              >
                Update Student
              </button>
            </div>
          )}

          {/* LIST */}
          {students.length === 0 ? (
            <p>No students yet</p>
          ) : (
            <ul className="space-y-2">
              {students.map((student) => (
                <li
                  key={student._id}
                  className="p-2 bg-gray-100 rounded flex justify-between items-center"
                >
                  <span>
                    {student.name} (Class {student.class})
                  </span>

                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TASKS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">📝 Tasks</h2>

          {/* ADD TASK */}
          <div className="mb-4 space-y-2">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />

            <select
              className="w-full p-2 border rounded"
              value={newTask.studentId}
              onChange={(e) =>
                setNewTask({ ...newTask, studentId: e.target.value })
              }
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddTask}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Assign Task
            </button>
          </div>

          {/* LIST */}
          {tasks.length === 0 ? (
            <p>No tasks yet</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="p-2 bg-gray-100 rounded flex justify-between items-center"
                >
                  <div>
                    <p>{task.title}</p>
                    <p className="text-sm text-gray-500">
                      {task.studentId?.name}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCompleteTask(task._id)}
                    className={`px-2 py-1 rounded ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {task.completed ? "Done" : "Mark Done"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;