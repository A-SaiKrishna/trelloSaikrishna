import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
let Boards = ({ data }) => {
  return !data ? (
    <h1>no boards</h1>
  ) : (
    <>
      <h1 style={{ fontSize: "2rem" }}>Your Workspace</h1>
      <div className="d-flex flex-wrap">
        {data.map((obj) => {
          return (
            <Link
              to={`boards/${obj.id}`}
              style={{ textDecoration: "none" }}
              key={obj.id}
            >
              <div
                className=" m-4"
                style={{
                  width: "14rem",
                  height: "6rem",
                  backgroundColor: obj.prefs.backgroundColor
                    ? obj.prefs.backgroundColor
                    : "white",
                  backgroundImage: `URL(${obj.prefs.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
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
