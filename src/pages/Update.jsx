import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [member, setMember] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const memberId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setMember((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://192.168.56.101:4000/members/${memberId}`, member);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Member</h1>
      <input
        type="text"
        placeholder="Member title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Member desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Member price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Member cover"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all members</Link>
    </div>
  );
};

export default Update;
