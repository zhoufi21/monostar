import {
  Space,
  Form,
  Input,
  Button,
  InputNumber,
  AutoComplete,
  message,
  Table,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
const ItemPage = () => {
  const [crate, setCrate] = useState([]);
  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [form] = Form.useForm();
  const columns = [
    {
      title: "款号",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "厂家",
      dataIndex: "producer",
      key: "producer",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "箱数",
      dataIndex: "box_number",
      key: "box_number",
    },
    {
      title: "件数",
      dataIndex: "item_per_box",
      key: "item_per_box",
    },
    {
      title: "单价",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "卖出",
      dataIndex: "box_sold",
      key: "box_sold",
    },
    {
      title: "序号",
      dataIndex: "crate_ID",
      key: "crate_ID",
    },
  ];
  useEffect(() => {
    fetch("./item/crate")
      .then((res) => res.json())
      .then((res) => {
        const temp = res.body.map((item) => {
          return { value: item.crate_ID };
        });
        setCrate(temp);
      });
    getItems();
  }, []);
  async function getItems() {
    fetch("./item")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.body);
      });
  }
  async function postItem(values) {
    const response = await fetch("./item", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    switch (response.status) {
      case 200:
        message.success("Successfully added!");
        break;
      default:
        message.error(response.json());
        break;
    }
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        postItem(values);
        console.log(values);
        getItems();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Space style={{ "background-color": "white" }} direction="vertical">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加款式
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          id="myForm"
          form={form}
        >
          <Form.Item
            label="款式"
            name="model"
            rules={[
              {
                required: true,
                message: "请输入款式",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="厂家"
            name="producer"
            rules={[
              {
                required: true,
                message: "请输入厂家",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            rules={[
              {
                required: false,
                message: "请输入名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="箱数"
            name="box"
            rules={[
              {
                required: true,
                message: "请输入箱数",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="件数"
            name="item_per_box"
            rules={[
              {
                required: true,
                message: "请输入件数",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="单价"
            name="price"
            rules={[
              {
                required: true,
                message: "请输入单价",
              },
            ]}
          >
            <InputNumber step="0.01" />
          </Form.Item>
          <Form.Item
            label="序号"
            name="crate"
            rules={[
              {
                required: true,
                message: "请选择序号",
              },
            ]}
          >
            <AutoComplete options={crate} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </Space>
  );
};
export { ItemPage };
