import { Button, Space, message, DatePicker, Input, Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "客户",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "合作日期",
      dataIndex: "date_created",
      key: "date_created",
    },
  ];
  useEffect(() => {
    getCustomer();
  }, [date]);
  async function getCustomer() {
    fetch("./customer")
      .then((res) => res.json())
      .then((res) => {
        setData(res.body);
      });
  }
  async function postCustomer() {
    const response = await fetch("./customer", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        name: name,
      }),
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
  return (
    <Space style={{ "background-color": "white" }} direction="vertical">
      <DatePicker
        onChange={(date, dateString) => {
          console.log(date, dateString);
          setDate(dateString);
        }}
      />
      <Input
        placeholder="客户名称"
        onChange={(input) => {
          console.log(input.target.value);
          setName(input.target.value);
        }}
      />
      <Button
        onClick={() => {
          postCustomer();
          getCustomer();
        }}
      >
        Add customer
      </Button>
      <Table columns={columns} dataSource={data} />
    </Space>
  );
};
export { CustomerPage };
