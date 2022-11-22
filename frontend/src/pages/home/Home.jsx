import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { json, Link, Route, useNavigate } from "react-router-dom";
import { ContextUsed } from "../../context/reducer/reducer";
import AddProduct from "../addproduct/AddProduct";
import { someProduct } from "../../data/someProduct";
const Home = () => {
  const data = useContext(ContextUsed);
  const [listOfUser, setListOfUser] = useState([]);

  const [number, setNumber] = useState(0);
  const [totalNumberOfPage, setTotalNumberOfpage] = useState(0);
  const [loading, setloading] = useState(false);
  const popUp = () => {
    data.dispatch({
      type: "ADDPRODUCT",
    });
  };
  const getAllUserData = () => {
    fetch(`http://localhost:8080/readReport?page=${number}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.totalPage);
        setListOfUser(data);
        setTotalNumberOfpage(data.totalPage);
        setloading(true);
      });
  };
  useEffect(() => {
    getAllUserData();
  }, [data.state.addProduct, number]);

  const hanldeDelete = (id) => {
    fetch(`http://localhost:8080/deleteReport/${id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        getAllUserData();
        return data;
      });
  };
  const hanldeSearchByName = (event) => {
    const name = event.target.value;
    if (name.length > 0) {
      fetch(`http://localhost:8080/searchReport/${name}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setListOfUser(data);
        });
    } else {
      getAllUserData();
    }
  };
  const hanldeSearchById = (event) => {
    const id = event.target.value;

    if (id.length > 0) {
      fetch(`http://localhost:8080/searchByIdReport/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setListOfUser(data);
        });
    } else {
      getAllUserData();
    }
  };
  const hanldeSearchByDate = (event) => {
    const date = event.target.value;
    console.log("frontend date :", date);
    if (date.length > 0) {
      fetch(`http://localhost:8080/seachByDate/${date}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setListOfUser(data);
        });
    } else {
      getAllUserData();
    }
  };

  return (
    <>
      <div className="container">
        <header className="row nav">
          <a className="logo" href="/">
            student
          </a>
          <div className="filter">
            <h4>
              By Name{" "}
              <input
                type="text"
                onChange={hanldeSearchByName}
                placeholder="Search By Name"
              />
            </h4>

            <h4>
              By ID{" "}
              <input
                type="text"
                onChange={hanldeSearchById}
                placeholder="Search By ID"
              />
            </h4>

            <h4>
              By Date <input type="date" onChange={hanldeSearchByDate} />
            </h4>
          </div>
          <h2 className="sort">Sorting By Name</h2>
          <div className="add--new--user">
            <button className="add--new--user--btn" onClick={popUp}>
              add new user
            </button>
          </div>
        </header>
        <div className="row height--f">
          <div className="colum">
            <table>
              <thead>
                <tr>
                  <th>sr</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Discription</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {listOfUser.reports?.map((element, index) => {
                  return (
                    <tr key={element._id}>
                      <td> {index + 1}</td>
                      <td> {element._id}</td>
                      <td> {element.patientname}</td>
                      <td> {element.patientemail}</td>
                      <td> {element.patientdate}</td>
                      <td>
                        <p>{element.patientdisc}</p>
                      </td>

                      <td>
                        <Link
                          className="btn update"
                          to={`/update/${element._id}`}
                        >
                          update
                        </Link>
                        <Link
                          className="btn delete"
                          onClick={() => hanldeDelete(element._id)}
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination">
          {/* {number === 0 || totalNumberOfPage === 0 ? null : ( */}
          <button
            className="page-back"
            disabled={number >= 1 ? false : true}
            onClick={() => {
              setNumber((p) => {
                if (p === 0) return 0;
                return number - 1;
              });
            }}
          >
            &larr;
          </button>
          {/* )} */}

          {new Array(totalNumberOfPage).fill(null).map((v, i) => (
            <span
              className={number === i ? "page--num active" : "page--num "}
              key={i}
              onClick={(e) => setNumber(i)}
            >
              {i + 1}
            </span>
          ))}
          {/* 
          {loading ? (
            <>
              {listOfUser.reports?.length > totalNumberOfPage ? (
                <code
                  className="page-back"
                  onClick={() => {
                    setNumber(number + 1);
                  }}
                >
                  {" "}
                  &rarr;
                </code>
              ) : null}
            </>
          ) : null} */}

          {loading ? (
            <>
              <button
                className="page-back"
                disabled={listOfUser.reports?.length > number ? false : true}
                onClick={() => {
                  setNumber(number + 1);
                }}
              >
                &rarr;
              </button>
            </>
          ) : (
            <button
              className="page-back"
              disabled={
                listOfUser.reports?.length >= totalNumberOfPage ? false : true
              }
              onClick={() => {
                setNumber(number + 1);
              }}
            ></button>
          )}
        </div>

        <footer>
          <p>student @copyright 2020</p>
        </footer>
        {data.state.addProduct && <AddProduct popUp={popUp} />}
      </div>
    </>
  );
};

export default Home;
