import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch("http://localhost:8080/readReport2")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data =>", data.reports);
        const filterData = data.reports.filter(
          (elemet) => elemet._id === id
        )[0];
        console.log("filterData =>", filterData);
        setProduct({
          name: filterData.patientname,
          email: filterData.patientemail,
          date: filterData.patientdate,
          disc: filterData.patientdisc,
        });
      });
  }, []);
  const productUpdateHandle = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/updateReport/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prouct),
    });

    navigate("/");
  };
  return (
    <>
      <div className="container">
        <header className="row nav">
          <a className="logo" href="/">
            student
          </a>
          <div className="add--new--user">
            <Link className="" to="/">
              view all student
            </Link>
          </div>
        </header>

        <div className="add--popup--update">
          <form onSubmit={productUpdateHandle}>
            <h4 className="titlebar">Update document</h4>
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
                placeholder="Discription"
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
                value="update"
                className="update--popup--btn"
              />
            </div>
          </form>
        </div>
        <footer>
          <p>student @copyright 2020</p>
        </footer>
      </div>
    </>
  );
};

export default UpdateProduct;
