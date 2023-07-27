import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import { Image } from "../../../types";

interface PropType {
  images: Image[];
}

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  easing: "ease",
};

export const ImageSlide = ({ images }: PropType) => {
  return (
    <div className="w-80 h-56 rounded-l-3xl">
      {images.length > 0 ? (
        <Slide {...properties}>
          {images.map((item: Image, index: number) => (
            <img
              src={item.url}
              key={index}
              alt="Image1"
              className="h-56 w-80 rounded-l-3xl"
            />
          ))}
        </Slide>
      ) : (
        <div className="flex flex-col w-full h-full bg-gray-200 rounded-l-3xl text-center justify-center">
          <p className="text-2xl text-gray-600 font-semibold">No Image</p>
        </div>
      )}
    </div>
  );
};
