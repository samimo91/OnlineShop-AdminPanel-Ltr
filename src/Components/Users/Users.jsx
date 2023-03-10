import React, { useState, useEffect } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DeleteModal from "./../DeleteModal/DeleteModal";
import EditModal from "./../EditModal/EditModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import { AiOutlineDollarCircle } from "react-icons/ai";

import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [mainUserInfos, setMainUserInfos] = useState({});

  const [userNewFirsname, setUserNewFirsname] = useState("");
  const [userNewLastname, setUserNewLastname] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewScore, setUserNewScore] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    console.log(userID);
    fetch(`http://localhost:8000/api/users`)
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }

  const cancelModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeDetailsModal = () => setIsShowDetailsModal(false);

  const deleteUser = () => {
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowDeleteModal(false);
        getAllUsers();
      });
  };

  const updateUser = (event) => {
    event.preventDefault();

    const userNewInfos = {
      firsname: userNewFirsname,
      lastname: userNewLastname,
      username: userNewUsername,
      password: userNewPassword,
      phone: userNewPhone,
      city: userNewCity,
      email: userNewEmail,
      address: userNewAddress,
      score: userNewScore,
      buy: userNewBuy,
    };

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllUsers();
      });
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title"> ???????? ?????????????? </h1>

      {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th> ?????? ?? ?????? ???????????????? </th>
              <th> ?????????????? </th>
              <th> ?????? ???????? </th>
              <th> ?????????? ???????? </th>
              <th> ?????????? </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firsname} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setUserID(user.id);
                      setIsShowDeleteModal(true);
                    }}
                  >
                    {" "}
                    ??????{" "}
                  </button>
                  <button
                    onClick={() => {
                      setMainUserInfos(user);
                      setIsShowDetailsModal(true);
                    }}
                  >
                    {" "}
                    ????????????{" "}
                  </button>
                  <button
                    onClick={() => {
                      setIsShowEditModal(true);
                      setUserID(user.id);
                      setUserNewFirsname(user.firsname);
                      setUserNewLastname(user.lastname);
                      setUserNewUsername(user.username);
                      setUserNewPassword(user.password);
                      setUserNewPhone(user.phone);
                      setUserNewCity(user.city);
                      setUserNewEmail(user.email);
                      setUserNewAddress(user.address);
                      setUserNewScore(user.score);
                      setUserNewBuy(user.buy);
                    }}
                  >
                    {" "}
                    ????????????{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="?????? ???????????? ???????? ??????" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteUser}
          deleteAction={cancelModal}
          title="?????? ???? ?????? ?????? ?????????? ?????????? ????????????"
        />
      )}
      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={updateUser}>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewFirsname}
              onChange={(event) => setUserNewFirsname(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewLastname}
              onChange={(event) => setUserNewLastname(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewUsername}
              onChange={(event) => setUserNewUsername(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPassword}
              onChange={(event) => setUserNewPassword(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewPhone}
              onChange={(event) => setUserNewPhone(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewCity}
              onChange={(event) => setUserNewCity(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewEmail}
              onChange={(event) => setUserNewEmail(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <textarea
              type="text"
              className="edit-user-info-input"
              value={userNewAddress}
              onChange={(event) => setUserNewAddress(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            ></textarea>
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewScore}
              onChange={(event) => setUserNewScore(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
          <div className="edit-user-info-input-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="edit-user-info-input"
              value={userNewBuy}
              onChange={(event) => setUserNewBuy(event.target.value)}
              placeholder="?????????? ???????? ???? ???????? ????????"
            />
          </div>
        </EditModal>
      )}

      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th> ?????? </th>
                <th> ???????? </th>
                <th> ???????????? </th>
                <th> ?????????? ???????? </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainUserInfos.city}</td>
                <td> {mainUserInfos.address} </td>
                <td> {mainUserInfos.score} </td>
                <td> {mainUserInfos.buy} </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
    </div>
  );
}
