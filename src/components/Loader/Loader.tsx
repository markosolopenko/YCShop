import { Spin } from "antd";
import "antd/dist/antd.css";

export const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 70px)",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin />
    </div>
  );
};
