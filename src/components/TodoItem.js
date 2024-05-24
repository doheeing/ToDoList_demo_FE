import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDelete, onToggleComplete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "completed" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => onDelete(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => onToggleComplete(item._id)}
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
