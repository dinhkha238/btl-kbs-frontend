import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Col, Form, Input, Row } from "antd";
import { useGetDieuLuat } from "./app.loader";
import { useNavigate } from "react-router-dom";
interface Chat {
  role: string;
  option: string;
  content: any;
  title: string;
}
interface Suggest {
  value: string;
  label: string;
}
const dieuLuat = [
  {
    value: "1",
    label: "SÂN VÀ CÁC THIẾT BỊ TRÊN SÂN THI ĐẤU",
  },
  {
    value: "2",
    label: "CẦU",
  },
  {
    value: "3",
    label: "THỬ CẦU",
  },
  {
    value: "4",
    label: "VỢT",
  },
  {
    value: "5",
    label: "TRANG THIẾT BỊ HỢP LỆ",
  },
  {
    value: "6",
    label: "TUNG ĐỒNG XU BẮT THĂM",
  },
  {
    value: "7",
    label: "HỆ THỐNG TÍNH ĐIỂM",
  },
  {
    value: "8",
    label: "ĐỔI SÂN",
  },
  {
    value: "9",
    label: "GIAO CẦU",
  },
  {
    value: "10",
    label: "THI ĐẤU ĐƠN",
  },
  {
    value: "11",
    label: "THI ĐẤU ĐÔI",
  },
  {
    value: "12",
    label: "LỖI Ô GIAO CẦU",
  },
  {
    value: "13",
    label: "LỖI",
  },
  {
    value: "14",
    label: "GIAO CẦU LẠI",
  },
  {
    value: "15",
    label: "CẦU NGOÀI CUỘC",
  },
  {
    value: "16",
    label: "THI ĐẤU LIÊN TỤC, LỖI TÁC PHONG ĐẠO ĐỨC VÀ CÁC HÌNH PHẠT",
  },
  {
    value: "17",
    label: "CÁC NHÂN VIÊN VÀ NHỮNG KHIẾU NẠI",
  },
];
export const DieuLuat = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [cauHoi, setCauHoi] = useState<Suggest>();
  const [suggest, setSuggest] = useState<Suggest[]>(dieuLuat);
  const [chats, setChats] = useState<Chat[]>([
    {
      role: "bot",
      content: suggest,
      option: "suggest",
      title: "Bạn muốn tra cứu về điều gì ?",
    },
  ]);
  const { data: dataTraLoi } = useGetDieuLuat({ dieuluat: cauHoi?.value });

  useEffect(() => {
    if (dataTraLoi && dataTraLoi.length > 0) {
      const contentElements = dataTraLoi?.map((item: any, index: any) => {
        const titleElement = (
          <b style={{ fontSize: 20 }} key={`title-${index}`}>
            {item?.tieuDe}
          </b>
        );
        const paragraphs = item?.moTaChiTiet.split("\n");
        const paragraphElements = paragraphs?.map(
          (paragraph: any, index: any) => {
            if (paragraph?.startsWith("-") || paragraph?.startsWith("+")) {
              return <li key={index}>{paragraph?.slice(1)}</li>;
            } else {
              return <p key={index}>{paragraph}</p>;
            }
          }
        );
        return (
          <Col>
            <Row>{titleElement}</Row>
            <div>{paragraphElements}</div>
          </Col>
        );
      });
      setChats([
        ...chats,
        {
          role: "bot",
          content: [{ id: "", label: contentElements }],
          option: "traLoi",
          title: `Đây là các điều luật liên quan đến ${cauHoi?.label}:`,
        },
      ]);
      setSuggest([
        { value: "sg1", label: "Tiếp tục tra cứu" },
        { value: "sg2", label: "Giải đáp thắc mắc" },
      ]);
    }
  }, [dataTraLoi]);

  const onFinish = (values: any) => {
    const newChat = {
      role: "user",
      content: `Tôi chọn số: ${values?.question}`,
      option: "question",
      title: "",
    };
    setChats([...chats, newChat]);
    form.resetFields();
    if (suggest[values?.question - 1]?.value === "sg1") {
      setSuggest(dieuLuat);
      setChats([
        ...chats,
        newChat,
        {
          role: "bot",
          content: dieuLuat,
          option: "suggest",
          title: "Bạn muốn tra cứu về điều gì ?",
        },
      ]);
    } else if (suggest[values?.question - 1]?.value === "sg2") {
      navigate("/");
      window.location.reload();
    } else setCauHoi(suggest[values?.question - 1]);
  };
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      const scrollHeight = messagesRef.current.scrollHeight as number;
      const clientHeight = messagesRef.current.clientHeight;
      const scrollValue = scrollHeight - clientHeight;
      messagesRef.current.scrollTop = scrollValue;
    }
  };
  const validateNumber = (rule: any, value: any, callback: any) => {
    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      callback("Vui lòng nhập số!");
    } else if (numberValue < 1 || numberValue > suggest?.length) {
      callback(`Vui lòng nhập số từ 1 đến ${suggest?.length}!`);
    } else {
      callback();
    }
  };
  return (
    <div
      ref={messagesRef}
      style={{ height: "600px", overflowY: "auto", backgroundColor: "#fff" }}
    >
      <Row justify={"center"}>
        <Col span={20}>
          {chats.map((chat) => {
            return (
              <>
                {chat.role === "user" && (
                  <Row>
                    <Col span={20}></Col>
                    <Col span={4} className="user">
                      <Row justify={"center"}>{chat?.content}</Row>
                    </Col>
                  </Row>
                )}
                {chat?.role === "bot" && chat?.option === "suggest" && (
                  <Row>
                    <Col className="bot" span={18}>
                      <div style={{ fontSize: 20 }}>{chat?.title}</div>
                      {chat?.content?.map((item: any, index: any) => {
                        return (
                          <Row>
                            {index + 1}. {item?.label}
                          </Row>
                        );
                      })}
                    </Col>
                  </Row>
                )}
                {chat?.role === "bot" && chat?.option === "traLoi" && (
                  <>
                    <Row>
                      <Col className="bot" span={18}>
                        <div style={{ fontSize: 20 }}>{chat?.title}</div>
                        {chat?.content?.map((item: any) => {
                          return <Row>{item?.label}</Row>;
                        })}
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                      <Col className="bot" span={18}>
                        <div style={{ fontSize: 20 }}>
                          Tiếp theo bạn muốn tôi giúp gì ?
                        </div>
                        <Row>1. Tiếp tục tra cứu</Row>
                        <Row>2. Giải đáp thắc mắc</Row>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            );
          })}
        </Col>
      </Row>
      <Row justify={"center"}>
        <Form onFinish={onFinish} form={form} className="form">
          <Col span={24}>
            <Form.Item
              name="question"
              rules={[
                {
                  validator: validateNumber,
                },
              ]}
            >
              <Row>
                <Input
                  autoFocus
                  size="large"
                  placeholder="Vui lòng nhập số"
                  className="input"
                />
              </Row>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  );
};
