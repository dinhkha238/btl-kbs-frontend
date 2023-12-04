import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Col, Form, InputNumber, Row } from "antd";
import { useGetSuyDien, useGetThacMac } from "./app.loader";
interface Chat {
  // id: number;
  role: string;
  option: string;
  content: any;
  title: string;
}
interface Suggest {
  value: string;
  label: string;
}
function App() {
  const [form] = Form.useForm();
  const [thacMac, setThacMac] = useState("");
  const [cauHoi, setCauHoi] = useState<Suggest>();
  const [suggest, setSuggest] = useState<Suggest[]>([
    {
      value: "Q01",
      label: "Thắc mắc về sân đấu, phụ kiện và trang thiết bị trên sân",
    },
    { value: "Q07", label: "Thắc mắc về qui định với quả cầu" },
    { value: "Q11", label: "Thắc mắc về quy định với vợt" },
    { value: "Q12", label: "Thắc mắc về hệ thống thi đấu" },
    { value: "Q34", label: "Thắc mắc về lỗi trong thi đấu" },
    { value: "Q38", label: "Như thế nào là cầu ngoài cuộc" },
    {
      value: "Q39",
      label: "Thắc mắc về những vi phạm vận động viên phải tránh và xử phạt",
    },
    { value: "Q40", label: "Thắc mắc về các nhân viên" },
    { value: "DL", label: "Xem 17 điều luật" },
  ]);
  const [chats, setChats] = useState<Chat[]>([
    {
      role: "bot",
      content: suggest,
      option: "suggest",
      title: "Bạn đang thắc mắc về điều gì ?",
    },
  ]);
  const { data: dataThacMac } = useGetThacMac({
    thacMac: thacMac,
  });
  const { data: dataTraLoi } = useGetSuyDien({
    suydien: cauHoi?.value,
  });
  useEffect(() => {
    if (dataThacMac && dataThacMac.length > 0) {
      const convertData = dataThacMac?.map((item: any) => {
        return { value: item?.id, label: item?.moTa };
      });
      setSuggest(convertData);
      setChats([
        ...chats,
        {
          role: "bot",
          content: convertData,
          option: "suggest",
          title: `Có vẻ bạn đang thắc mắc về "${cauHoi?.label}", xin hãy cho tôi biết chi tiết hơn:`,
        },
      ]);
    }
  }, [dataThacMac]);
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
          title: "Đây là các điều luật liên quan đến câu hỏi của bạn:",
        },
      ]);
    }
  }, [dataTraLoi]);
  const onFinish = (values: any) => {
    const newChat = {
      role: "user",
      content: `Tôi chọn thắc mắc số: ${values?.question}`,
      option: "question",
      title: "",
    };
    setChats([...chats, newChat]);
    form.resetFields();
    setThacMac(suggest[values?.question - 1]?.value);
    setCauHoi(suggest[values?.question - 1]);
  };
  const messagesRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom whenever messages change
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
  return (
    <div ref={messagesRef} style={{ height: "600px", overflowY: "auto" }}>
      <Row justify={"center"}>
        <Col span={16}>
          {chats.map((chat) => {
            return (
              <>
                {chat.role === "user" && (
                  <Row>
                    <Col span={18}></Col>
                    <Col span={6} className="user">
                      <Row justify={"center"}>{chat?.content}</Row>
                    </Col>
                  </Row>
                )}
                <Row>
                  {chat?.role === "bot" && chat?.option === "suggest" && (
                    <>
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
                    </>
                  )}
                  {chat?.role === "bot" && chat?.option === "traLoi" && (
                    <>
                      <Col
                        className="bot"
                        span={18}
                        // style={{ marginBottom: 50 }}
                      >
                        <div style={{ fontSize: 20 }}>{chat?.title}</div>
                        {chat?.content?.map((item: any) => {
                          return <Row>{item?.label}</Row>;
                        })}
                      </Col>
                    </>
                  )}
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Form onFinish={onFinish} form={form}>
        <div>
          <div>
            <Form.Item name="question">
              <InputNumber autoFocus className="input" size="large" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default App;
