import React, { useEffect, useState } from "react";
import "./ProductTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import ErrorBox from "../ErrorBox/ErrorBox";

export default function ProductTable({ allProducts, getAllProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [productID, setProductID] = useState(null);
  const [mainProductInfo, setMainProductInfo] = useState([]);

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProducts();
        setIsShowDeleteModal(false);
      });
  };
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  const closeDetailsModal = () => {
    setIsShowDetailsModal(false);
  };

  const updateProductsInfos = (e) => {
    e.preventDefault();
    const productsNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopularity,
      sale: productNewSale,
      colors: productNewColors,
    };

    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productsNewInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        setIsShowEditModal(false);
      });
  };

  return (
    <>
      {allProducts.length ? (
        <table className="product-table">
          <thead>
            <tr className="product-table-heading-tr">
              <th> ?????? </th>
              <th> ?????? </th>
              <th> ???????? </th>
              <th> ???????????? </th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="product-table-tr">
                <td>
                  <img src={product.img} alt="" className="product-table-img" />
                </td>
                <td>{product.title} </td>
                <td>{product.price} ??????????</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainProductInfo(product);
                    }}
                  >
                    ????????????
                  </button>
                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductID(product.id);
                    }}
                  >
                    ??????
                  </button>
                  <button
                    className="product-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);
                      setProductID(product.id);
                      setMainProductInfo(product);
                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewCount(product.count);
                      setProductNewImg(product.img);
                      setProductNewPopularity(product.popularity);
                      setProductNewSale(product.sale);
                      setProductNewColors(product.colors);
                    }}
                  >
                    ????????????
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
          title="?????? ???? ?????? ?????? ???????? ?????????? ????????????"
          submitAction={deleteModalSubmitAction}
          deleteAction={deleteModalCancelAction}
        />
      )}
      {isShowDetailsModal && (
        <DetailsModal onHide={closeDetailsModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th> ?????????????? </th>
                <th> ???????? </th>
                <th> ?????? ???????? </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainProductInfo.popularity}%</td>
                <td> {mainProductInfo.sale} </td>
                <td> {mainProductInfo.colors} </td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductsInfos}
        >
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="?????????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="???????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="???????????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="???????? ???????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="?????????????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="?????????? ???????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
            />
          </div>
          <div className="edit-products-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="?????????? ?????????????? ???????? ???? ???????? ????????"
              className="edit-products-input"
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}
