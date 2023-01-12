import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

function Items() {
  const [itemsData, setItemsData] = useState([]);

  const [addEditModalVisabilty, setAddEditModalVisabilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const newdata = []
  const getallItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        console.log(response.data)
        //     if( JSON.parse(localStorage.getItem("pos-user"))._id === response.data._id){
        // setItemsData(response.data);
        //     }

           data.map((datas)  =>{
          if(datas.user  ===  JSON.parse(localStorage.getItem("pos-user"))._id){
            // console.log(datas)
            newdata.push(datas)
            
           
          }
        })

          setItemsData(newdata)
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });

        console.log(error);
      });
  };

  
  const deleteItem  = (record) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/items/delete-item" ,{itemId : record._id})
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success("item deleted successfully")
        getallItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("something went wrong")

        console.log(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },

    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EditOutlined
            className="mx-2"
            onClick={() => {
              setEditingItem(record);
              setAddEditModalVisabilty(true);
            }}
          />

          <DeleteOutlined className="mx-2" onClick={()=> deleteItem(record)} />

        </div>
      ),
    },
  ];

  useEffect(() => {
    getallItems();
  }, []);

  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    if (editingItem == null) {
      axios
        .post("/api/items/add-item",{ ...values,user:  JSON.parse(localStorage.getItem("pos-user"))._id})
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success("Item added successfully");
          setAddEditModalVisabilty(false);
          getallItems();
        })
        .catch((error) => {

          dispatch({ type: "hideLoading" });
          message.success("Something went wrong");

          console.log(error);
        });
    } else {
      axios
        .post("/api/items/edit-item", { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.error("Item Edited successfully");
          setEditingItem(null);
          setAddEditModalVisabilty(false);
          getallItems();
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.success("Something went wrong");

          console.log(error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button
          type="primary"
          onClick={() => setAddEditModalVisabilty(true)}
          set
        >
          Add an Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered></Table>

      {addEditModalVisabilty && (
        <Modal
          onCancel={() => {
            setEditingItem(null);
            setAddEditModalVisabilty(false);
          }}
          open={addEditModalVisabilty}
          title={`${editingItem !== null ? "Edit item" : "Add new item"}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="price" label="Price">
              <Input placeholder="Price" />
            </Form.Item>

            <Form.Item name="image" label="Image">
              <Input placeholder="image url" />
            </Form.Item>

            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="fruits"> Fruites </Select.Option>
                <Select.Option value="vegetables"> Vegetables </Select.Option>
                <Select.Option value="meat"> Meat </Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
}

export default Items;
