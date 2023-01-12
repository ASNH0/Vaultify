import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/Item";
import "../Resources/items.css";
import { useDispatch } from "react-redux";

function Homepage() {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("fruits");
  const newdata = []
  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4",
    },
    {
      name: "vegetables",
      imageURL:
        "https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg",
    },
    {
      name: "meat",
      imageURL:
        "https://assets.bonappetit.com/photos/6304fda53831470090e2a87f/1:1/w_1799,h_1799,c_limit/You-Are-What-You%20Eat-Raw-Meat-Diet%20.jpg",
    },
  ];
  const getallItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.map((datas)  =>{
          if(datas.user  ===  JSON.parse(localStorage.getItem("pos-user"))._id){
            // console.log(datas)
            newdata.push(datas)
          }
          else if(datas.user  ===  JSON.parse(localStorage.getItem("pos-user")).user){
          newdata.push(datas)
          }
        })
        setItemsData(newdata);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });

        console.log(error);
      });
  };

  useEffect(() => {
    getallItems();
  }, []);

  return (
    <DefaultLayout>
      <div className="d-flex categories">
        {categories.map((category) => {
          return (
            <div onClick={() => setSelectedCategory(category.name)}
              className={`d-flex category ${
                selectedCategory === category.name && "selected-category"
              }`}
            >
              <h4>{category.name}</h4>
              <img src={category.imageURL} height="60" width="80" alt="" />
            </div>
          );
        })}
      </div>

      <Row gutter={20}>
        {itemsData.filter((i)=> i.category === selectedCategory).map((item) => {
          return (
            <Col xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}
export default Homepage;
