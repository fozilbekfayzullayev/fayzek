import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../assets/image/img-1.jpg";
import img2 from "../assets/image/img-2.jpg";
import img3 from "../assets/image/img-3.jpg";
import img4 from "../assets/image/img-4.jpg";
import img5 from "../assets/image/img-5.jpg";
import img6 from "../assets/image/img-6.jpg";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  // Rasmlar massivi
  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const imageElements = imagesRef.current;

    // Barcha rasmlarni yashirish (birinchisidan tashqari)
    imageElements.forEach((img, index) => {
      if (index > 0) {
        gsap.set(img, { opacity: 0, force3D: true });
      } else {
        gsap.set(img, { force3D: true });
      }
    });

    // Timeline yaratish - barcha animatsiyalarni bir vaqtda boshqarish uchun
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Har bir o'tish uchun animatsiya qo'shish
    for (let i = 0; i < images.length - 1; i++) {
      const currentImg = imageElements[i];
      const nextImg = imageElements[i + 1];

      // Har bir transition 1 soniya (yoki istalgan qiymat)
      tl.to(
        currentImg,
        {
          opacity: 0,
          duration: 1,
          ease: "none",
        },
        i
      ).to(
        nextImg,
        {
          opacity: 1,
          duration: 1,
          ease: "none",
        },
        i
      ); // Bir vaqtda boshlanadi
    }

    // Container pin
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full about relative z-10"
      style={{ minHeight: `${(images.length - 1) * 100 + 100}vh` }}
    >
      <div
        ref={containerRef}
        className="max-w-300 w-full mx-auto px-5 py-8 flex justify-between gap-7 h-screen items-center flex-col md:flex-row"
      >
        <div className="text-white w-full md:w-1/2 mt-5">
          <h1 className="font-poly text-4xl md:text-5xl mb-4">
            Tanlangan ishlar
          </h1>
          <p className="text-sm md:text-lg mb-4">
            Original illustratsiyalar, personaj dizaynlari va raqamli san’at —
            tasavvur, pop madaniyat va his-tuyg‘ulardan ilhomlanilgan.
          </p>
          <p className="text-sm md:text-lg mb-4">
            Galleraya o'tib barcha rasmlarni ko'rishingiz mumkin.
          </p>
          <Link
            to={"/gallery"}
            className="text-sm md:text-lg cursor-none border-white bg-white text-black border py-1 px-3 rounded-3xl hover:bg-transparent hover:text-white transition-all duration-75 ease-in"
          >
            O'tish
          </Link>
        </div>
        <div className="relative h-150 w-full md:w-1/2">
          {images.map((img, index) => (
            <img
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              src={img}
              alt={`Illustratsiya ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
