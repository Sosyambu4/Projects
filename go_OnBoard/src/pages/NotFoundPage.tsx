import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <p>Strona o podanym adresie nie istnieje</p>
      <Link to="/dashboard">
        <button>Przejdź do strony głównej</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
