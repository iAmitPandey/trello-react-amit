import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section>
      <FaExclamationTriangle />
      <h1>404 Not Found</h1>
      <p>This page does not exist</p>
      <Link to="/">Go Back</Link>
    </section>
  );
};

export default PageNotFound;
