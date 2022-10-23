import "../styles/card.css";
import { Link } from "react-router-dom";

const Card = ({ picture, pseudo, emial, bio, isAdmin, id }) => {
    const deleteProfil = () => {
        fetch(`${process.env.REACT_APP_BASE2_URL}/api/auth/delete/${id}`, {
          method: "DELETE",
          withCredentials: true,
          headers: {
            "content-Type": "application/json",
          },  
        })
        .then((data) => {
            if (data.statusText === "Unauthorized") {
                alert("Error deleting profile: " +  data.statusText);
            } else {
                localStorage.removeItem("userAuth");
                alert("Profile deleted");
                window.location.href ="/";
            }
        })
        .catch((error) => console.log(error));
    };

    return (
        <div className="card profile-header">
            <div className="body">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                        <div classNme="profile-image float-md-right">
                            {" "}
                            <img src={picture} alt="" />{" "}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                        <h4 className="m-t-0 m-b-0">
                            <strong>{pseudo}</strong>
                        </h4>
                        <span className="job_post">{emial}</span>
                        <p>{bio}</p>
                        <span>{isAdmin ? "admin" : "User"}</span>
                        <div>
                            <Link to={"/updateProfil/" + id} className="btn btn-primary btn-round">
                                Update
                            </Link>
                            <button onClick={deleteProfil} className="btn btn-primry btn-round btn-simple">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;


