import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/a11y";
import { Pagination, A11y, Navigation } from "swiper";
import { Box } from "@chakra-ui/react";
import CategoryMainCard from "../card/CategoryMainCard";
import useViewportChecker from "../../utilities/hooks/useViewportChecker";
import ProductCard from "../card/ProductCard";
import { Product } from "../../utilities/Types/Products";

export default function ProductsCarousel({
  products,
}: {
  products: Product[];
}) {
  const { mediaQueries } = useViewportChecker();

  return (
    <>
      <Box
        sx={{
          ".category-swiper": { padding: "2rem 0" },
          ".category-swiper li": { listStyleType: "none" },
          ".swiper-button-prev": { color: "secondary.dark", zIndex: "50" },
          ".swiper-button-next": { color: "secondary.dark", zIndex: "50" },
        }}
        width="100%"
      >
        <Swiper
          slidesPerView={1.4}
          spaceBetween={5}
          centeredSlides={
            mediaQueries.md || mediaQueries.lg || mediaQueries.xl ? false : true
          }
          modules={[Pagination, A11y, Navigation]}
          className="category-swiper"
          wrapperTag="ul"
          breakpoints={{
            540: {
              slidesPerView: 2.4,
              spaceBetween: 10,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3.4,
              spaceBetween: 30,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide tag="li" key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
