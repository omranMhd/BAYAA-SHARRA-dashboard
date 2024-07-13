import React, { useRef } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination as SwiperPagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

function AdvertisementPhotoesSlider({ photoes }) {
  const swiperRef = useRef(null);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", border: "1px solid red" }}
    >
      <IconButton
        onClick={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
          }
        }}
      >
        <ArrowBackIosNewRoundedIcon
          sx={{
            fontSize: "40px",
          }}
        />
      </IconButton>
      <Swiper
        ref={swiperRef}
        modules={[SwiperPagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        pagination={true}
        slidesPerView={1}
        loop={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
      >
        {photoes?.map((photo, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  // backgroundColor: "red",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  alt="sd"
                  src={`http://127.0.0.1:8000/storage/${photo}`}
                  style={{
                    height: "460px",
                    marginBottom: "30px",
                  }}
                />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <IconButton
        onClick={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
          }
        }}
      >
        <ArrowForwardIosRoundedIcon
          sx={{
            fontSize: "40px",
          }}
        />
      </IconButton>
    </Box>
  );
}

export default AdvertisementPhotoesSlider;
