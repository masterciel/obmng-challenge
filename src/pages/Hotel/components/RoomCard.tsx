import React from "react";
import { ImManWoman } from "react-icons/im";
import { FaChildren } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";

import { ImageSlide } from "./ImageSlide";
import { Room } from "../../../types";

interface PropType {
  roomItem: Room;
}

export const RoomCard = ({ roomItem }: PropType) => {
  return (
    <div className="flex rounded-3xl h-56 w-[1000px] border bg-white shadow-xl">
      <ImageSlide images={roomItem.images} />
      <div className="flex flex-col gap-1 py-5 px-7 w-full">
        <p className="text-xl font-bold text-left">{roomItem.name}</p>
        <div className="flex w-full">
          <div className="flex gap-1 flex-grow">
            <ImManWoman className="w-6 h-6 mt-1" fill="rgb(150,150,150)" />
            <p className="text-xl font-semibold mt-1">
              {roomItem.occupancy.maxAdults}
            </p>
          </div>
          <div className="flex gap-1 flex-grow">
            <FaChildren className="w-6 h-6 mt-1" fill="rgb(150,150,150)" />
            <p className="text-xl font-semibold mt-1">
              {roomItem.occupancy.maxChildren}
            </p>
          </div>
          <div className="flex gap-1 flex-grow">
            <MdFamilyRestroom
              className="w-6 h-6 mt-1"
              fill="rgb(150,150,150)"
            />
            <p className="text-xl font-semibold mt-1">
              {roomItem.occupancy.maxOverall}
            </p>
          </div>
        </div>
        <div className="flex w-full h-36 overflow-y-auto myScroll">
          <p className="text-lg font-semibold">{roomItem.longDescription}</p>
        </div>
      </div>
    </div>
  );
};
