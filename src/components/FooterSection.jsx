import { Link } from "react-router";

import instagram from "../assets/image/instagram.png";
import pinterest from "../assets/image/pinterest.png";

const FooterSection = () => {
  return (
    <section className="w-full h-screen relative z-15 bg-[#000] flex flex-col items-center justify-center">
      <h1 className="text-center text-white font-poly uppercase mb-5">
        obuna bo'ling:
      </h1>
      <div className="flex items-center justify-center gap-10">
        <Link to={"https://www.instagram.com/fay_zek_art/"} target="_blank">
          <img src={instagram} alt="" width={36} />
        </Link>
        <Link to={"https://www.pinterest.com/fayZekart/"} target="_blank">
          <img src={pinterest} alt="" width={36} />
        </Link>
      </div>
    </section>
  );
};

export default FooterSection;
