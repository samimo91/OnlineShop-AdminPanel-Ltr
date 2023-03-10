import React, { useState } from "react";
import { useEffect } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import DetailsModal from "../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import "./Comments.css";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [commentID, setCommentID] = useState(null);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((comment) => setAllComments(comment));
  }

  const closeDetailsModal = () => setIsShowDetailsModal(false);
  const closeDeleteModal = () => setIsShowDeleteModal(false);
  const closeEditModal = () => setIsShowEditModal(false);
  const closeAcceptModal = () => setIsShowAcceptModal(false);
  const closeRejectModal = () => setIsShowRejectModal(false);

  const AcceptComment = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment);
        setIsShowAcceptModal(false);
        getAllComments();
      });
  };
  const RejectComment = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment);
        setIsShowRejectModal(false);
        getAllComments();
      });
  };

  const deleteComment = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        closeDeleteModal();
        getAllComments();
      });
  };

  const editComment = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowEditModal(false);
        getAllComments();
      });
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title"> ???????? ?????????? ???? </h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th> ?????? ?????????? </th>
              <th> ?????????? </th>
              <th> ?????????? </th>
              <th> ?????????? </th>
              <th> ???????? </th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td> {comment.userID} </td>
                <td> {comment.productID} </td>
                <td>
                  <button
                    onClick={() => {
                      setMainCommentBody(comment.body);
                      setIsShowDetailsModal(true);
                    }}
                  >
                    {" "}
                    ???????? ??????{" "}
                  </button>
                </td>
                <td> {comment.date} </td>
                <td> {comment.hour} </td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setCommentID(comment.id);
                    }}
                  >
                    ??????
                  </button>
                  <button
                    onClick={() => {
                      setCommentID(comment.id);
                      setIsShowEditModal(true);
                      setMainCommentBody(comment.body);
                    }}
                  >
                    ????????????
                  </button>
                  <button>????????</button>

                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        setCommentID(comment.id);
                        setIsShowAcceptModal(true);
                      }}
                    >
                      ??????????
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCommentID(comment.id);
                        setIsShowRejectModal(true);
                      }}
                    >
                      ????
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="?????? ???????????? ???????? ??????" />
      )}

      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <p className="text-modal">{mainCommentBody}</p>
          <button className="text-modal-close-btn" onClick={closeDetailsModal}>
            {" "}
            ????????{" "}
          </button>
        </DetailsModal>
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="?????? ???? ?????? ?????? ???????? ?????????? ????????????"
          deleteAction={closeDeleteModal}
          submitAction={deleteComment}
        />
      )}

      {isShowEditModal && (
        <EditModal onClose={closeEditModal} onSubmit={editComment}>
          <textarea
            className="edit-comment-textarea"
            value={mainCommentBody}
            onChange={(event) => setMainCommentBody(event.target.value)}
          ></textarea>
        </EditModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title="???? ?????????? ?????? ?????????? ?????????? ????????????"
          deleteAction={closeAcceptModal}
          submitAction={AcceptComment}
        />
      )}
      {isShowRejectModal && (
        <DeleteModal
          title="???? ???? ?????? ?????????? ?????????? ????????????"
          deleteAction={closeRejectModal}
          submitAction={RejectComment}
        />
      )}
    </div>
  );
}
