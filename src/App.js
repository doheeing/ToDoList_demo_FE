import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTodoList(response.data.data);
      console.log("response", response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status == 200) {
        console.log("성공");
        setTodoValue("");
        getTasks();
      } else {
        throw new Error("task can not be addded");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTodoList(todoList.filter((task) => task._id !== id)); // 상태 업데이트
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleCompleteTask = async (id) => {
    try {
      const task = todoList.find((task) => task._id === id);
      const updatedTask = { ...task, isComplete: !task.isComplete };
      await api.put(`/tasks/${id}`, updatedTask);
      setTodoList(
        todoList.map((task) => (task._id === id ? updatedTask : task))
      ); // 상태 업데이트
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []); // 빈 배열을 추가하여 컴포넌트가 처음 마운트될 때만 호출되도록 설정

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onDelete={deleteTask}
        onToggleComplete={toggleCompleteTask}
      />
    </Container>
  );
}

export default App;
