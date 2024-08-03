import React, { useState, useRef, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverTrigger, PopoverContent } from "@ui/popover";
import { Input } from "@ui/input";
import { PopoverAnchor } from "@radix-ui/react-popover";
import styled from "styled-components";
import { setFilters, setTextFilter } from "@/Redux/sessionSlice"; // Import the action

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];
const channels = [
  { id: "1", name: "General" },
  { id: "2", name: "Random" },
  { id: "3", name: "Support" },
];

const chats = [
  { id: "1", message: "Hello from Alice", userId: "1", channelId: "1" },
  { id: "2", message: "Random chat", userId: "2", channelId: "2" },
  {
    id: "3",
    message: "Support chat from Charlie",
    userId: "3",
    channelId: "3",
  },
  { id: "4", message: "General chat", userId: "1", channelId: "1" },
];

const initialState = {
  inputValue: "",
  filters: [],
  selectedFilter: null,
  isPopoverOpen: false,
  searchResults: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload, isPopoverOpen: true };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_SELECTED_FILTER":
      return { ...state, selectedFilter: action.payload };
    case "SET_POPOVER_OPEN":
      return { ...state, isPopoverOpen: action.payload };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

const PopoverInput = () => {
  const [state, dispatchLocal] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const popoverRef = useRef(null);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const reduxFilters = useSelector((state) => state?.filters?.filters);

  useEffect(() => {
    if (state.filters.length > 0 && state.inputValue) {
      const criteria = getSearchCriteria(state.filters);
      fetchSearchResults(criteria);
    }
  }, [state.inputValue, state.filters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target)
      ) {
        dispatchLocal({ type: "SET_POPOVER_OPEN", payload: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, anchorRef]);

  const handleInputChange = (e) => {
    dispatch(setTextFilter(e.target.value));
    dispatchLocal({ type: "SET_INPUT_VALUE", payload: e.target.value });
  };

  const handleFilterClick = (filter) => {
    if (!state.selectedFilter) {
      const newFilters = [...state.filters, { type: filter }];
      dispatchLocal({ type: "SET_FILTERS", payload: newFilters });
      dispatchLocal({ type: "SET_SELECTED_FILTER", payload: filter });
      dispatch(setFilters(newFilters)); // Update Redux state
    }
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      state.inputValue === "" &&
      state.filters.length > 0
    ) {
      dispatchLocal({ type: "SET_FILTERS", payload: [] });
      dispatchLocal({ type: "SET_SELECTED_FILTER", payload: null });
      dispatch(setFilters([])); // Update Redux state
    }
    dispatchLocal({ type: "SET_POPOVER_OPEN", payload: true });
  };

  const handleOptionClick = (option) => {
    const updatedFilters = state.filters.map((filter) =>
      filter.type === state.selectedFilter
        ? { ...filter, value: option }
        : filter
    );
    dispatchLocal({ type: "SET_FILTERS", payload: updatedFilters });
    dispatchLocal({ type: "SET_INPUT_VALUE", payload: "" });
    dispatchLocal({ type: "SET_SELECTED_FILTER", payload: null });
    dispatchLocal({ type: "SET_POPOVER_OPEN", payload: false });
    dispatch(setFilters(updatedFilters)); // Update Redux state
    inputRef.current.focus();
  };

  const fetchSearchResults = (criteria) => {
    const results = chats.filter(
      (chat) =>
        (!criteria.sender || chat.userId === criteria.sender) &&
        (!criteria.channel || chat.channelId === criteria.channel) &&
        chat.message.toLowerCase().includes(state.inputValue.toLowerCase())
    );
    dispatchLocal({ type: "SET_SEARCH_RESULTS", payload: results });
  };

  const filteredOptions =
    state.selectedFilter === "from:user"
      ? users.filter(
          (user) =>
            !state.filters.some((filter) => filter.value?.id === user.id) &&
            user.name.toLowerCase().includes(state.inputValue.toLowerCase())
        )
      : channels.filter(
          (channel) =>
            !state.filters.some((filter) => filter.value?.id === channel.id) &&
            channel.name.toLowerCase().includes(state.inputValue.toLowerCase())
        );

  const getSearchCriteria = (filters) => {
    const criteria = {};
    filters.forEach((filter) => {
      if (filter.type === "from:user") {
        criteria.sender = filter.value.id;
      } else if (filter.type === "from:channel") {
        criteria.channel = filter.value.id;
      }
    });
    return criteria;
  };

  return (
    <div>
      <Popover
        open={state.isPopoverOpen}
        onClose={() =>
          dispatchLocal({ type: "SET_POPOVER_OPEN", payload: false })
        }
      >
        <PopoverAnchor asChild ref={anchorRef}>
          <StyledInputWrapper>
            <StyledFilters>
              {state.filters.map((filter, index) => (
                <Filter key={index}>
                  {filter.type.replace("from:", "")}:{" "}
                  {filter.value ? filter.value.name : ""}
                </Filter>
              ))}
            </StyledFilters>
            <StyledInput
              ref={inputRef}
              value={state.inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() =>
                dispatchLocal({ type: "SET_POPOVER_OPEN", payload: true })
              }
              className="h-full max-h-2 w-full bg-[#1e1f22] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1]"
              placeholder="Search"
            />
          </StyledInputWrapper>
        </PopoverAnchor>
        <PopoverContent
          ref={popoverRef}
          className="relative left-14 w-[300px] bg-[#1e1f22] text-white outline-none border-none placeholder:text-muted-foreground placeholder:text-[#b5bac1] z-[21333333332123]"
        >
          <>
            <div>
              {!state.selectedFilter &&
              !state.inputValue &&
              state.filters.length === 0 ? (
                <div className="flex flex-col gap-1">
                  <div>
                    <div className="flex flex-col justify-start items-start gap-1 text-[#b5bac1]">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-[#b5bac1]">SEARCH OPTIONS</p>
                      </div>
                      {!state.selectedFilter && (
                        <>
                          <div
                            className="p-2 flex items-center text-sm min-h-6 w-[100%] hover:bg-[#313338] hover:text-white cursor-pointer rounded-md"
                            onClick={() => handleFilterClick("from:user")}
                          >
                            <p>
                              <strong>from:</strong> user
                            </p>
                          </div>
                          <div
                            className="p-2 flex items-center text-sm min-h-6 w-[100%] hover:bg-[#313338] hover:text-white cursor-pointer rounded-md"
                            onClick={() => handleFilterClick("from:channel")}
                          >
                            <p className="text-sm">
                              <strong>from:</strong> channel
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <OptionsList className="flex flex-col gap-2">
                  {state.filters.length !== 0 &&
                    state.selectedFilter !== null &&
                    filteredOptions.map((option) => (
                      <Option
                        className="flex items-center gap-2 cursor-pointer hover:bg-[#313338] hover:text-white rounded-md"
                        key={option.id}
                        onClick={() => {
                          handleOptionClick(option);
                        }}
                      >
                        {option.name}
                      </Option>
                    ))}
                </OptionsList>
              )}
              {state.inputValue && (
                <SearchResults>
                  {state.searchResults.map((result) => (
                    <Option key={result.id}>{result.message}</Option>
                  ))}
                </SearchResults>
              )}
            </div>
          </>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverInput;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #1e1f22;
  padding: 5px;
  border-radius: 5px;
  gap: 5px;
`;

const StyledFilters = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledInput = styled(Input)`
  outline: none !important;
  box-shadow: none !important;
  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
  color: white !important;
  flex: 1;
  background: #1e1f22 !important;
  transition: width 0.3s ease-in-out;
  &:focus {
    width: 15rem;
  }
`;

const Filter = styled.div`
  background: #313338;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.875rem;
`;

const OptionsList = styled.div`
  background: #1e1f22;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

const Option = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #313338;
    color: white;
  }
`;

const SearchResults = styled.div`
  margin-top: 10px;
  background: #1e1f22;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;
