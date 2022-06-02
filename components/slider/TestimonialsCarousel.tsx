import React, { ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/a11y";
import { Pagination, A11y, Navigation } from "swiper";
import { Box, useMediaQuery } from "@chakra-ui/react";
import CategoryMainCard from "../card/CategoryMainCard";
import TestimonialCard from "../card/TestimonialCard";
import useViewportChecker, {
  MediaQueriesTypes,
} from "../../utilities/hooks/useViewportChecker";

const cardItems = [
  {
    name: "Pao de Mel",
    image: "/Avatar.png",
    content:
      "We’ve got you covered for any holiday, special occasion, or cause for celebration.",
    date: "10/05/2022",
    socialMedia: "Facebook",
  },
  {
    name: "Pao de Mel",
    image: "/Avatar.png",
    content:
      "We’ve got you covered for any holiday, special occasion, or cause for celebration.",
    date: "10/05/2022",
    socialMedia: "Facebook",
  },
  {
    name: "Pao de Mel",
    image: "/Avatar.png",
    content:
      "We’ve got you covered for any holiday, special occasion, or cause for celebration.",
    date: "10/05/2022",
    socialMedia: "Facebook",
  },
  {
    name: "Pao de Mel",
    image: "/Avatar.png",
    content:
      "We’ve got you covered for any holiday, special occasion, or cause for celebration.",
    date: "10/05/2022",
    socialMedia: "Facebook",
  },
  {
    name: "Pao de Mel",
    image: "/Avatar.png",
    content:
      "We’ve got you covered for any holiday, special occasion, or cause for celebration.",
    date: "10/05/2022",
    socialMedia: "Facebook",
  },
];

export default function TestimonialsCarousel({
  mediaQueries,
}: {
  mediaQueries: MediaQueriesTypes;
}) {
  return (
    <Box
      sx={{
        ".category-swiper": {
          padding: "1rem 0",
          _before: {
            content: '""',
            height: "full",
            width: "100px",
            position: "absolute",
            zIndex: "10",
            top: "0",
            left: "-5px",
            bg: "black",
            background: "linear-gradient(to right, #C4F4F4, transparent)",
          },
          _after: {
            content: '""',
            height: "full",
            width: "100px",
            position: "absolute",
            zIndex: "10",
            top: "0",
            right: "-5px",
            bg: "black",
            background: "linear-gradient(to left, #C4F4F4, transparent)",
          },
        },
        ".category-swiper li": {
          listStyleType: "none",
          padding: "2rem 0",
          display: "flex",
          justifyContent: "center",
        },
        ".swiper-button-prev": { color: "secondary.dark", zIndex: "50" },
        ".swiper-button-next": { color: "secondary.dark", zIndex: "50" },
      }}
      maxWidth="900px"
      mx="auto"
      position="relative"
      zIndex="5"
    >
      <Swiper
        slidesPerView={
          mediaQueries.md
            ? 2.8
            : mediaQueries.lg || mediaQueries.xl
            ? 3.4
            : mediaQueries.xs
            ? 1
            : 1.4
        }
        spaceBetween={10}
        centeredSlides={true}
        modules={[Pagination, A11y, Navigation]}
        className="category-swiper"
        wrapperTag="ul"
        navigation={true}
        loop={true}
      >
        {cardItems.map((item, i) => (
          <SwiperSlide tag="li" key={i}>
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
