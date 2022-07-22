import Image from "next/image";
import React from "react";
import IconFacebook from "../../../public/icons/IconFacebook";
import IconMail from "../../../public/icons/IconMail";
import IconMap from "../../../public/icons/IconMap";
import IconPhone from "../../../public/icons/IconPhone";
import IconTwitter from "../../../public/icons/IconTwitter";
import IconWhatsapp from "../../../public/icons/IconWhatsapp";
import IconYoutube from "../../../public/icons/IconYoutube";
import Container from "../container";

const Footer = () => {
  return (
    <footer id="contacto">
      <Container
        bgColor="bg-[#2F0007]"
        className="flex flex-col  md:flex-row text-white py-5 gap-5 md:gap-0"
      >
        <div className="flex-1 flex items-center flex-col text-gray-300 text-[14px] justify-center sm:items-start gap-5">
          <div className="flex gap-5">
            <IconPhone fill="#A02E2B" width={18} height={18} />
            <p>+51 924 674 627</p>
          </div>
          <div className="flex gap-5">
            <IconMail fill="#A02E2B" width={18} height={18} />
            <p>info@laesperanza.pe</p>
          </div>
          <div className="flex gap-5">
            <IconMap fill="#A02E2B" width={18} height={18} />
            <p>Av. Buena Vista, 10-141, Lurín - Lima</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 justify-center my-10 sm:mt-0">
          <input
            type="text"
            className="w-full text-black focus:outline-none h-10 px-3 font-normal font-parrafo text-[13px]"
            placeholder="Nombres"
          />
          <input
            type="text"
            className="w-full text-black focus:outline-none h-10 px-3 font-normal font-parrafo text-[13px]"
            placeholder="Correo"
          />
          <button className="w-full bg-tertiary tracking-[4.9px] h-10 uppercase text-[12px] font-semibold hover:bg-blacklight transition-all ease-in-out duration-500">
            <p>Suscribete</p>
          </button>
        </div>
        <div className="flex-1 flex-col flex items-center gap-3 -mt-6 justify-center">
          <div className="flex justify-center ">
            <Image
              objectFit="scale-down"
              className="cursor-pointer"
              src="/imgs/logos/logo.png"
              width={175}
              height={70}
              alt="logo"
            />
          </div>
          <div className="flex gap-10">
            <IconFacebook fill="#fff" width={25} height={25} />
            <IconTwitter fill="#fff" width={25} height={25} />
            <IconYoutube fill="#fff" width={25} height={25} />
            <IconWhatsapp fill="#fff" width={25} height={25} />
          </div>
        </div>
      </Container>
      <Container
        bgColor="bg-[#2F0007]"
        className="flex justify-around sm:justify-between text-white text-[8px] font-semibold py-2 lg:px-6"
      >
        <p>© All rights reserved</p>
        <p>Diseñado por IDEAS Avenue</p>
      </Container>
    </footer>
  );
};

export default Footer;
