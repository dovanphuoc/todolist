import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./NewTask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";

const NewTask = () => {
  const jsonTask = JSON.parse(localStorage.getItem("todo")) || [];
  const [inputText, setInputText] = useState("");
  const [inputTextarea, setInputTextarea] = useState("");
  const [selectOption, setSelectOption] = useState("normal");
  const [selectedDate, setSelectedDate] = useState(null);
  const [todo, setTodo] = useState(jsonTask);
  const [validatorMsg, setValidatorMsg] = useState("");

  const validateAll = () => {
    const msg = {};
    if (isEmpty(inputText)) {
      msg.text = "The title is required";
    }

    if (isEmpty(inputTextarea)) {
      msg.desc = "The description is required";
    }

    setValidatorMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    else {
      const newTask = {
        inputText,
        inputTextarea,
        selectOption,
        selectedDate,
        uuid: uuidv4(),
      };
      setTodo((todoPrev) => {
        const todo = [...todoPrev, newTask];
        const jsonTodo = JSON.stringify(todo);
        localStorage.setItem("todo", jsonTodo);
        return todo;
      });
    }
    setInputText("");
    setInputTextarea("");
    setSelectedDate(null);
    setSelectOption("normal");
  };

  return (
    <div className="container">
      <h2>New Task</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            placeholder="Add new task"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <span className="error-msg">{validatorMsg.text}</span>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            cols="30"
            rows="10"
            value={inputTextarea}
            onChange={(e) => setInputTextarea(e.target.value)}
          />
          <span className="error-msg">{validatorMsg.desc}</span>
        </div>
        <div className="form-option">
          <div className="form-group">
            <label htmlFor="date">Due Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              value={selectOption}
              onChange={(e) => setSelectOption(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn-submit"
            onClick={handleSubmitForm}
          >
            Add
          </button>
          <Link to="/" className="btn-return">
            Quay lai
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
