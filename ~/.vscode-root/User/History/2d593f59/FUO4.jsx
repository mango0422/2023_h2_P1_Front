import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const members = () => {
  const [members, setmembers] = useState([]);

  useEffect(() => {
    const fetchAllmembers = async () => {
      try {
        const res = await axios.get("http://192.168.56.101:4000/members");
        setmembers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllmembers();
  }, []);

  console.log(members);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.56.101:4000/members/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Introducing our Team members</h1>
      <div className="members">
        {members.map((member) => (
          <div key={member.id} className="member">
            <img src={member.cover} alt="" />
            <h2>{member.title}</h2>
            <p>{member.desc}</p>
            <span>${member.price}</span>
            <button className="delete" onClick={() => handleDelete(member.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${member.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new member
        </Link>
      </button>
    </div>
  );
};

export default members;
