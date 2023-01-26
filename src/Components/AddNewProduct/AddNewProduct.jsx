import React, { useState } from "react";
import "./AddNewProduct.css";
import {
  MdProductionQuantityLimits,
  MdOutlineAttachMoney,
  MdOutlineColorLens,
} from "react-icons/md";
import { BsBag, BsImage, BsEmojiHeartEyes } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  const newProductInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  const addNewProduct = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
    console.log(newProductInfos);
    getAllProducts();
    emptyInputs();
  };

  function emptyInputs() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }

  return (
    <div className="products-main">
      <h1 className="products-title"> افزودن محصول جدید </h1>
      <form action="#" className="add-products-form">
        <div className="add-products-form-wrap">
          <div className="add-products-form-group">
            <MdProductionQuantityLimits />
            <input
              type="text"
              placeholder="اسم محصول را بنویسید"
              className="add-products-input"
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <MdOutlineAttachMoney />
            <input
              type="text"
              placeholder="قیمت محصول را بنویسید"
              className="add-products-input"
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BsBag />
            <input
              type="text"
              placeholder="موجودی محصول را بنویسید"
              className="add-products-input"
              value={newProductCount}
              onChange={(event) => setNewProductCount(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BsImage />
            <input
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              className="add-products-input"
              value={newProductImg}
              onChange={(event) => setNewProductImg(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <BsEmojiHeartEyes />
            <input
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              className="add-products-input"
              value={newProductPopularity}
              onChange={(event) => setNewProductPopularity(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <GrMoney />
            <input
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              className="add-products-input"
              value={newProductSale}
              onChange={(event) => setNewProductSale(event.target.value)}
            />
          </div>
          <div className="add-products-form-group">
            <MdOutlineColorLens />
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              className="add-products-input"
              value={newProductColors}
              onChange={(event) => setNewProductColors(event.target.value)}
            />
          </div>
        </div>
        <button className="add-products-submit" onClick={addNewProduct}>
          {" "}
          ثبت محصول{" "}
        </button>
      </form>
    </div>
  );
}
