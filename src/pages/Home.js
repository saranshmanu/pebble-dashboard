import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/summary");
  }, []);

  return <></>;
}

export default Home;
