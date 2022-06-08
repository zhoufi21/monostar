import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
const NavigationButton = ({ to, icon, text }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(to)}
      style={{ width: "8em", height: "8em" }}
    >
      {icon}
      <br />
      {text}
    </Button>
  );
};
export { NavigationButton };
