import React from "react";
import { Button } from "@ui/button";
import styled from "styled-components";
import Profilephoto from "@/components/userprofile/profilephoto";

const SearchResults = () => {
  return (
    <div className="pl-[1px]   min-w-[400px] max-w-[700px] min-h-[200px] relative z-[1233333213213211231232131231231221312312312312323123123] bg-[#1e1f22] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1] z-[21333333332123]">
      <div className="min-h-full flex flex-col items-start pr-2 pl-2 bg-[#2b2d31] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1] z-[21333333332123]">
        <div className="flex justify-between items-center pr-2 pl-2 w-full">
          <div>
            <h3>86 Results</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hover:bg-[#313338] hover:text-white"
            >
              New
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-[#313338] hover:text-white"
            >
              Old
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 bg-[#2b2d31] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1] z-[21333333332123]">
          <div className="flex flex-col justify-between items-start pr-2 pl-2 w-full">
            <div className="flex justify-center items-center gap-2 text-md">
              <p>#Wqpd </p>
              <p>Username</p>
            </div>
            <div className="mt-2 rounded-md w-full p-2 flex justify-between items-center gap-2 bg-[#313338] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1] z-[21333333332123]">
              <div className="w-full flex items-center gap-2">
                <div className="w-10 flex items-center gap-2">
                  <Profilephoto />
                </div>
                <div className="flex flex-col items-start ">
                  <p className="text-sm">Username</p>
                  <p className="text-sm">Username</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className=" text-white self-end w-12 h-8 -translate-y-4 flex items-center justify-center"
              >
                jump
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
