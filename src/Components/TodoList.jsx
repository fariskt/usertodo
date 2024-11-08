import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, toggle } from "../Redux/users";
import axios from "axios";

const TodoList = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    state: false,
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/users", formData);
    dispatch(fetchUsers());
    setFormData({
      id: Date.now(),
      name: "",
      state: false,
    });
  };


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Todo list</h2>
      <div className="todo">
        <input
          type="text"
          placeholder="enter name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <button onClick={handleSumbit}>ADD</button>
      </div>
      <div>
        {users.map((user) => (
          <ul key={user.id} className="list-items">
            <li className={user.state ? "green" : "yellow"}>{user.name}</li>
            <button onClick={() => dispatch(toggle(user.id))}>
              change color
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
