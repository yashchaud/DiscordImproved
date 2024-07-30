import React from "react";
import Photo from "@/components/images/nike-just-do-it (2).png";
import Profilephoto from "../userprofile/profilephoto";
import KingSvg from "./KingSvg.svg";

const SvgKing = ({ w, d }) => {
  return (
    <svg
      aria-label="Server Owner"
      class="ownerIcon_a31c43 icon_a31c43"
      aria-hidden="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={d}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#f0b132"
        d="M5 18a1 1 0 0 0-1 1 3 3 0 0 0 3 3h10a3 3 0 0 0 3-3 1 1 0 0 0-1-1H5ZM3.04 7.76a1 1 0 0 0-1.52 1.15l2.25 6.42a1 1 0 0 0 .94.67h14.55a1 1 0 0 0 .95-.71l1.94-6.45a1 1 0 0 0-1.55-1.1l-4.11 3-3.55-5.33.82-.82a.83.83 0 0 0 0-1.18l-1.17-1.17a.83.83 0 0 0-1.18 0l-1.17 1.17a.83.83 0 0 0 0 1.18l.82.82-3.61 5.42-4.41-3.07Z"
        class=""
      ></path>
    </svg>
  );
};

const MembersTab = () => {
  return (
    <div className="w-[18%] h-full flex flex-col justify-between p-2 bg-[#2b2d31] sticky top-0 z-[2222222222222222222222222]">
      <div className="w-full h-full flex flex-col  items-center ">
        <h1 className="w-[95%] text-[#b5bac1] text-sm mt-4 ml-2 mb-2">
          OFFLINE -
        </h1>
        <div className="bg-[#313338] w-[95%] h-[2.7rem] flex  items-center gap-4 rounded-sm">
          <div className="h-8 w-8 rounded-full ml-2 bg-white flex justify-center items-center">
            <Profilephoto className="w-6 h-6  rounded-full self-center" />
          </div>
          <div className="flex   justify-center items-center gap-[5px]">
            <h1 className="text-[#b5bac1] text-md ">yash</h1>
            <SvgKing w={15} d={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersTab;
