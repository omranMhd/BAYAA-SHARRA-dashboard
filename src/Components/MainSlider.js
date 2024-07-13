import React from "react";
import Box from "@mui/material/Box";
import PhotoSlide from "./PhotoSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

function MainSlider() {
  return (
    <Box>
      <Swiper
        modules={[SwiperPagination, Scrollbar, A11y, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        fadeEffect={{ crossFade: true }} // Additional options for the fade effect
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide1.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide2.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide3.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide10.png" />
        </SwiperSlide>
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <PhotoSlide img="mainSliderPhotoes/slide9.jpg" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default MainSlider;
