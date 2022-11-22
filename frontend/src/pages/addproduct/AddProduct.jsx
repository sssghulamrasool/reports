import React from "react";
import { useState } from "react";

const AddProduct = ({ popUp }) => {
  const [prouct, setProduct] = useState({
    name: "",
    email: "",
    date: "",
    disc: "",
  });

  let value, name;
  const onChangeHandler = (event) => {
    name = event.target.name;
    value = event.target.value;
    setProduct({ ...prouct, [name]: value });
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    console.log(prouct);
    fetch("http://localhost:8080/createReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prouct),
    });
    setProduct({
      name: "",
      email: "",
      date: "",
      disc: "",
    });
  };
  return (
    <>
      <div className="add--popup--overlay "></div>
      <div className="add--popup ">
        <form onSubmit={handelSubmit}>
          <div className="close--popup" onClick={() => popUp()}>
            <span className="line"></span>
            <span className="line"></span>
          </div>
          <h4 className="titlebar">new upload data</h4>
          <div className="add--popup--group">
            <label htmlFor=""> Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={prouct.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="add--popup--group">
            <label htmlFor=""> Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={prouct.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className="add--popup--group">
            <label htmlFor=""> discription</label>
            <textarea
              name="disc"
              id=""
              value={prouct.disc}
              cols="30"
              rows="10"
              onChange={onChangeHandler}
            />
          </div>
          <div className="add--popup--group">
            <label htmlFor=""> date</label>
            <input
              type="date"
              placeholder="City"
              name="date"
              value={prouct.date}
              onChange={onChangeHandler}
            />
          </div>
          <div className="add--popup--group">
            <input
              type="submit"
              value="add new "
              className="add--new--popup--btn"
            />
          </div>
        </form>
      </div>{" "}
    </>
  );
};

export default AddProduct;
