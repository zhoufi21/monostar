import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { Button, Menu } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { CratePage } from "./components/CratePage.js";
import { CustomerPage } from "./components/CustomerPage.js";
import { ItemPage } from "./components/ItemPage.js";
import { TransactionPage } from "./components/TransactionPage.js";
import { HomePage } from "./components/HomePage.js";
function App() {
  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Menu mode="horizontal">
                  <Menu.Item key="home" icon={<RollbackOutlined />}>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </Menu.Item>
                </Menu>
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="crate" element={<CratePage />} />
            <Route path="customer" element={<CustomerPage />} />
            <Route path="item" element={<ItemPage />} />
            <Route path="transaction" element={<TransactionPage />} />
            <Route path="*" element={<span>404 Page not found</span>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export { App };
