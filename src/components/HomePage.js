import { Space } from "antd";
import "antd/dist/antd.css";
import {
  DropboxOutlined,
  UserOutlined,
  SkinOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { NavigationButton } from "./NavigationButton.js";
const HomePage = () => {
  return (
    <Space
      style={{
        "background-color": "white",
        alignContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}
      direction="horizontal"
    >
      <NavigationButton
        text={"集装箱"}
        to={"crate"}
        icon={<DropboxOutlined style={{ fontSize: "4vw" }} />}
      />
      <NavigationButton
        text={"客户"}
        to={"customer"}
        icon={<UserOutlined style={{ fontSize: "4vw" }} />}
      />
      <NavigationButton
        text={"款式"}
        to={"item"}
        icon={<SkinOutlined style={{ fontSize: "4vw" }} />}
      />
      <NavigationButton
        text={"流水"}
        to={"transaction"}
        icon={<TransactionOutlined style={{ fontSize: "4vw" }} />}
      />
    </Space>
  );
};
export { HomePage };
