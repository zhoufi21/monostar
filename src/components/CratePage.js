import { AutoComplete, Input, Space, message, Button, InputNumber } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
const CratePage = () => {
  const [companies, setCompanies] = useState([]);
  const [transport, setTransport] = useState("");
  const [cost, setCost] = useState(0);

  const columns = [
    {
      title: "运输公司",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "日期",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  async function getTransportCompanies() {
    fetch("./crate/companies")
      .then((res) => res.json())
      .then((res) => {
        const temp = res.body.map((item) => {
          return { value: item.transport_company };
        });
        setCompanies(temp);
      });
  }

  useEffect(() => {
    getTransportCompanies();
  }, []);
  async function postCrate() {
    const response = await fetch("./crate", {
      method: "POST",
      body: JSON.stringify({
        transport: transport,
        cost: cost,
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
      <AutoComplete
        options={
          !transport ? [...companies] : [...companies, { value: transport }]
        }
        style={{ width: 200 }}
        placeholder="运输公司"
        onSearch={(value) => {
          setTransport(value);
          console.log([...companies, { value: transport }]);
        }}
      />
      <InputNumber
        prefix="￥"
        suffix="RMB"
        placeholder="运费"
        step={2}
        onChange={(value) => {
          setCost(value);
        }}
      />
      <Button
        onClick={() => {
          postCrate();
          getTransportCompanies();
        }}
      >
        添加
      </Button>
    </Space>
  );
};
export { CratePage };
