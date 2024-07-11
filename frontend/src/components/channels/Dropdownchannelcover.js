import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import plus from "../images/PlusDi.svg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import {
  setDropdownflag,
  setcreatechannelflag,
  setCategoryflag,
} from "@Redux/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { settogglesidebar } from "@/Redux/sessionSlice";
import { current } from "@reduxjs/toolkit";

const Dropdownchannelcover = () => {
  const dispatch = useDispatch();
  const { id, channelId, treadId } = useParams();
  const queryClient = useQueryClient();
  const container = useRef();
  const [isOpen, setIsOpen] = useState(true); // State to track if the dropdown is open
  const [currentWidth, setCurrentwidth] = useState(window.innerWidth);

  const Deleteserver = async (id) => {
    try {
      const response = await axios.delete(`/api/server/servers/${id}`);
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["Serverlist"] });
    } catch (error) {
      console.error("Error deleting server:", error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setCurrentwidth(window.innerWidth);
      console.log(currentWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, currentWidth]);

  useGSAP(
    () => {
      const animation = gsap.fromTo(
        container.current,
        { scale: 0.5 },
        { scale: 1, ease: "back.out(1.7)", duration: 0.5 }
      );
    },

    { scope: container, dependencies: [] }
  );

  return (
    <Cover ref={container}>
      <div
        onClick={() => {
          dispatch(setDropdownflag(false));
          dispatch(setcreatechannelflag(true));
          currentWidth > 768 && dispatch(settogglesidebar(false));
        }}
        className="dropdowndiv"
      >
        <p>Create channel</p>
        <div>
          <img src={plus} alt="" />
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(setDropdownflag(false));
          dispatch(setCategoryflag(true));
          currentWidth > 768 && dispatch(settogglesidebar(false));
        }}
        className="dropdowndiv"
      >
        <p>Create Category</p>
        <div>
          <img src={plus} alt="" />
        </div>
      </div>
      <div
        onClick={() => Deleteserver(id)}
        style={{ cursor: "pointer", color: "red" }}
        className="dropdowndiv"
      >
        <p>Delete Server</p>
        <div>
          <img src={plus} alt="" />
        </div>
      </div>
    </Cover>
  );
};

export default Dropdownchannelcover;

const Cover = styled.div`
  width: 95%;
  position: absolute;
  bottom: -6rem;
  left: 0.5rem;
  display: flex;
  background-color: #111214;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  z-index: 2131232;
  gap: 0.3rem;
  border-radius: 0.4rem;
  .dropdowndiv {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #282a2e;
    }
    border-radius: 0.4rem;
    div {
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      img {
        width: 1.5rem;
        height: 1.5rem;
        color: white;
        cursor: pointer;
        border-radius: 100%;
      }
    }
  }
`;
