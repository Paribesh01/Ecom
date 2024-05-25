import { Link } from "react-router-dom";
import Button from "./Button";

const GetStarted = () => {
  return (
    <div className="flex flex-col justify-center items-center rounded-lg shadow-xl p-5 gap-4 m-5 bg-white md:m-0 md:w-2/3 md:my-10 md:mx-auto">
      <h1 className="font-bold text-xl text-orange-600">
        Would You Like to Start with Us?
      </h1>
      <div className="flex flex-col md:flex-row md:gap-5 gap-3">
        <p>
          Please contact us and one of our relationship managers will guide you
          with our easy onboarding process. Lets us help you meet your goals.
        </p>
        <Link to="contact">
          <Button title="Get Started" />
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
