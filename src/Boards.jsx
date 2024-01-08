import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
let Boards = ({ data }) => {
  return data.length === 0 ? (
    <h1>no boards</h1>
  ) : (
    <>
      <h1 style={{ fontSize: "2rem" }}>Your Workspace</h1>
      <div className="d-flex flex-wrap">
        {data.map((obj) => {
          return (
            <Link to={`boards/${obj.id}`} style={{ textDecoration: "none" }}>
              <div
                className=" m-4"
                style={{
                  width: "12rem",
                  height: "8rem",
                  backgroundColor: obj.prefs.backgroundColor,
                }}
              >
                <h1 style={{ color: "black", textDecoration: "none" }}>
                  {obj.name}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Boards;
