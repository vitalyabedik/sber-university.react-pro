import { useEffect, useRef, useState } from "react";
import styles from "./RefExamples.module.css";

const SOCKET_URL = "wss://echo.websocket.org";

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState("не подключён");

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => setStatus("соединение установлено");
    socket.onclose = () => setStatus("соединение закрыто");
    socket.onmessage = (event) => console.log("WebSocket:", event.data);

    return () => {
      if (!socketRef.current) return;

      socketRef.current.close();
      socketRef.current = null;
    };
  }, []);

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>WebSocketLogger</h3>
      <p className={styles.hint}>Входящие сообщения логируются в консоль</p>
      <p className={styles.value}>
        Статус: <strong>{status}</strong>
      </p>
    </section>
  );
};
