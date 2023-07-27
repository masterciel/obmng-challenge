import React from "react";
import { Link } from "react-router-dom";
import { GiPositionMarker } from "react-icons/gi";
import { HiMail } from "react-icons/hi";
import { BsSignpostFill, BsFillTelephoneFill } from "react-icons/bs";

import { RatingStar } from "../../../components/Icons/RatingStar";
import { ImageSlide } from "./ImageSlide";
import { Hotel } from "../../../types";

interface PropsType {
  hotelItem: Hotel;
}

type Rating = {
  isRating: boolean;
};

export const HotelCard = ({ hotelItem }: PropsType) => {
  const ratings = Array(5).fill({ isRating: false });
  const startCount = parseInt(hotelItem.starRating);

  return (
    <div className="flex rounded-3xl h-56 w-[1000px] border bg-white shadow-xl">
      <ImageSlide images={hotelItem.images} />
      <div className="flex flex-col gap-4 py-3 px-7 w-full">
        <div className="flex gap-10">
          <p className="text-xl font-bold">{hotelItem.name}</p>
          <div className="flex gap-1">
            {ratings.map((ratingItem: Rating, index: number) => (
              <RatingStar key={index} isRated={index < startCount} />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <GiPositionMarker className="w-6 h-6 mt-1" fill="rgb(150,150,150)" />
          <p className="text-lg font-semibold">{`${hotelItem.address1}${
            hotelItem.address2 ? `, ${hotelItem.address2}` : ""
          }, ${hotelItem.town}, ${hotelItem.countryCode}`}</p>
        </div>
        <div className="flex gap-2">
          <HiMail className="w-6 h-6 mt-1" fill="rgb(150,150,150)" />
          <p className="text-lg font-semibold">{hotelItem.email}</p>
        </div>
        <div className="flex w-full">
          <div className="flex gap-2 flex-grow">
            <BsSignpostFill className="w-6 h-6" fill="rgb(150,150,150)" />
            <p className="text-lg font-semibold">{hotelItem.postcode}</p>
          </div>
          <div className="flex gap-2 flex-grow">
            <BsFillTelephoneFill
              className="w-6 h-6 mt-1"
              fill="rgb(150,150,150)"
            />
            <p className="text-lg font-semibold">{hotelItem.telephone}</p>
          </div>
        </div>
        <div className="flex w-full justify-end pb-2">
          <Link
            to={`${hotelItem.id}`}
            className="text-lg text-blue-500 hover:text-blue-600 active:text-blue-700 underline"
          >
            More details
          </Link>
        </div>
      </div>
    </div>
  );
};
