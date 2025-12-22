import RegisterForm from "../components/RegisterForm.jsx";

const RegisterPage = () => {
  return (
    <div className="flex items-center w-full h-full">
      <div className="max-w-175 w-full h-full p-2 md:block hidden">
        <div className="bg-[url(./assets/image/register.jpg)] w-full h-full bg-center bg-cover bg-no-repeat rounded-[55px]"></div>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
