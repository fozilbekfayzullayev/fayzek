import { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLogout } from "../hooks/useLogout";

// COMPONENTS
import AboutSection from "../components/AboutSection";
import FooterSection from "../components/FooterSection";

// IMAGES
import SvgText from "../components/SvgText";
import SvgTextMobile from "../components/SvgTextMobile";
import fayzek from "../assets/image/fayzek.png";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  const main = useRef();
  const smoother = useRef();
  const svgRef = useRef();

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { logout } = useLogout();

  useGSAP(
    () => {
      smoother.current = ScrollSmoother.create({
        smooth: 3,
        effects: true,
      });

      gsap.from("#image", {
        x: 20,
        duration: 3,
        ease: "power2.out",
      });
    },
    { scope: main }
  );

  // Resize event handler
  useEffect(() => {
    const handleResize = () => {
      if (smoother.current) {
        smoother.current.scrollTop(0); // Scroll'ni yuqoriga qaytarish
        ScrollTrigger.refresh(); // ScrollTrigger'larni yangilash
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-end px-6 py-4 z-50">
        <button
          className="cursor-none border-white text-white border py-1 px-2 rounded-3xl text-sm hover:bg-white hover:text-black transition-all duration-75 ease-in"
          onClick={logout}
        >
          Logout
        </button>
      </header>
      <div id="smooth-wrapper" className="home" ref={main}>
        <div id="smooth-content">
          <div className="hero w-full h-screen relative bg-linear-to-b from-teal-900 to-gray-900">
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10 w-full px-5"
              data-speed="0.2"
              ref={svgRef}
            >
              {isDesktop ? <SvgText /> : <SvgTextMobile />}
            </div>
            <div className="flex justify-center">
              <img
                id="image"
                className="absolute bottom-0 z-10"
                src={fayzek}
                alt="fayzek"
                width={600}
              />
            </div>
          </div>

          <AboutSection />

          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
