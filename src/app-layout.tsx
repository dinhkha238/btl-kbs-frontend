import { Outlet, useNavigate } from "react-router-dom";
import { Col, Layout, Menu, Row } from "antd";
import { SearchOutlined, BulbOutlined } from "@ant-design/icons";

export const AppLayout: React.FC = () => {
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = window.location.pathname.split("/")[1];
  return (
    <>
      <Layout>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            style={{
              height: "100%", // Đặt chiều cao của Sider theo 100% để nó cố định trên màn hình
              position: "fixed",
              zIndex: 1,
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[location]}
              onSelect={handleSelectMenu}
              items={[
                {
                  key: "",
                  icon: <BulbOutlined />,
                  label: "Giải đáp thắc mắc",
                },
                {
                  key: "tra-cuu-dieu-luat",
                  icon: <SearchOutlined />,
                  label: "Tra cứu điều luật",
                },
              ]}
            />
          </Sider>
          <Layout style={{ backgroundColor: "#fff" }}>
            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <Outlet />
              </Col>
            </Row>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
  function handleSelectMenu(e: any) {
    navigate(e.key);
  }
};
