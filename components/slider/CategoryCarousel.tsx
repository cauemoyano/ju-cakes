import React, { ReactNode } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import { Pagination, A11y } from "swiper";
import { Box } from "@chakra-ui/react";
import CategoryMainCard from "../card/CategoryMainCard";

const cardItems = [
  { title: "Pao de Mel", image: "/products-card.png" },
  { title: "Brownie", image: "/products-card.png" },
  { title: "Dia das Maes", image: "/products-card.png" },
];

export default function CategoryCarousel() {
  return (
    <Box
      sx={{
        ".category-swiper": { padding: "2rem 0" },
        ".category-swiper li": { listStyleType: "none" },
      }}
      maxWidth="100%"
    >
      <Swiper
        slidesPerView={1.4}
        spaceBetween={10}
        centeredSlides={true}
        modules={[Pagination, A11y]}
        className="category-swiper"
        wrapperTag="ul"
      >
        {cardItems.map((item) => (
          <SwiperSlide tag="li">
            <CategoryMainCard title={item.title} image={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
