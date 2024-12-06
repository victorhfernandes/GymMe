import loading from "../../assets/loading.gif";
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          width: "200px",
        }}
        src={loading}
        alt=""
      />
    </div>
  );
}

export default Loading;
