import React, { useEffect, useState } from "react";
import Threads from "../images/Threads.svg";
import bell from "../images/bell.svg";
import search from "../images/search.svg";
import pin from "../images/pin.svg";
import member from "../images/members.svg";
import help from "../images/help.svg";
import inbox from "../images/imbox.svg";
import styled from "styled-components";
import Threadelement from "../clickableComponents/Threads";
import { setThreads, settogglesidebar } from "../../Redux/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import rightarrow from "@images/rightarrow.svg";
import backbutton from "../images/leftarrow.svg";
import { Input } from "@ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@ui/popover";
import PopoverInput from "./PopoverInput";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatNavbar = () => {
  const [Thread, setThread] = useState(false);
  const [User, setUser] = useState();

  const dispatch = useDispatch();
  const handleThreadClick = () => {
    setThread(!Thread);
    dispatch(setThreads(!Thread));
  };
  const { togglesidebar } = useSelector((state) => state.counterSlice);
  const handleSidebar = () => {
    dispatch(settogglesidebar(true));
  };
  const { id, channelId, threadId } = useParams();
  useEffect(() => {
    axios.get(`/api/users/users/getusers`).then((response) => {
      setUser(response.data);
    });
  }, [channelId]);

  return (
    <>
      <Cover>
        <div className="separator">
          <FirstDiv>
            <img
              onClick={() => handleSidebar()}
              className="backButton"
              src={backbutton}
              alt=""
            />
            <img className="titleHas" src={Threads} alt="" />
            <p>general</p>
            <img className="hiddenRightArrow" src={rightarrow} alt="" />
          </FirstDiv>
          <SecondDiv>
            <p>asdbasbdasbdbsdbasdasdasdasd</p>
          </SecondDiv>
        </div>
        <ThirdDiv>
          <div className="innerDiv">
            <div className="firstDivNoti">
              <img
                onClick={() => handleThreadClick()}
                style={{ cursor: "pointer" }}
                src={Threads}
                alt=""
              />
            </div>
            <div className="secondDivNoti relative">
              <PopoverInput users={User} />
            </div>
            <div className="thirdDivNoti"></div>
          </div>
        </ThirdDiv>
      </Cover>
    </>
  );
};

export default ChatNavbar;

const Cover = styled.div`
  width: 100%;
  min-height: 3rem;
  background-color: #313338;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1e1f22;
  .separator {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
  }
`;

const FirstDiv = styled.div`
  width: 7rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  border-right: 1px solid #3f4147;
  .backButton {
    width: 1rem;
    margin-left: 0.8rem;
    cursor: pointer;
    display: none;
    @media (max-width: 1024px) {
      display: block;
    }
  }
  @media (max-width: 1024px) {
    gap: 0.3rem;
    border: none;
  }
  .titleHas {
    width: 1.5rem;
    margin-left: 0.5rem;
  }
  .hiddenRightArrow {
    width: 0.6rem;
    display: none;
    @media (max-width: 1024px) {
      display: block;
    }
  }
  p {
    font-weight: medium;
    margin-left: 0.2rem;
  }
`;

const SecondDiv = styled.div`
  display: flex;
  max-width: 60%;
  color: white;
  font-size: 0.8rem;
  position: absolute;
  left: 8.2rem;
  z-index: 0;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ThirdDiv = styled.div`
  display: flex;
  width: 24rem;
  margin-right: 0.5rem;
  padding-left: 1rem;
  align-items: center;
  position: relative;
  transition: width 0.3s ease-in-out;
  transform: translateX(-3rem);
  z-index: 1;
  background-color: #313338;
  @media (max-width: 1024px) {
    display: none;
  }
  .innerDiv {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .firstDivNoti {
      display: flex;
      gap: 1rem;
      margin-right: 0.3rem;
    }
    .secondDivNoti {
      display: flex;
      width: 12.5rem;
      height: 1.6rem;
      justify-content: space-around;
      border-radius: 0.2rem;

      img {
        width: 1.2rem;
      }
    }
    .thirdDivNoti {
      display: flex;
      gap: 0.7rem;
    }
  }
`;
