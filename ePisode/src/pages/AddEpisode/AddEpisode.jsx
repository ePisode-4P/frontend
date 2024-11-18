import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { BsQuestion, BsCloudFog2 } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdAddPhotoAlternate } from "react-icons/md";
import {
  IoSunnyOutline,
  IoRainyOutline,
  IoCloudOutline,
  IoSnowOutline,
  IoThunderstormOutline,
} from "react-icons/io5";
import styles from "./AddEpisode.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewEpisode, getWeather } from "../../services/diary";
import { addDiaryImage } from "../../services/image";

export default function AddEpisode() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { x, y, selectedPlace } = location.state || {};

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [content, setContent] = useState("");

  const weatherIcons = {
    Clear: <IoSunnyOutline />,
    Rain: <IoRainyOutline />,
    Clouds: <IoCloudOutline />,
    Snow: <IoSnowOutline />,
    Thunderstorm: <IoThunderstormOutline />,
    Drizzle: <IoRainyOutline />,
    Atmosphere: <BsCloudFog2 />,
  };

  const {
    data: weather = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weather", date],
    queryFn: () => getWeather(x, y, date),
    onError: (error) => {
      console.error(error);
    },
    enabled: !!date,
  });

  const { mutate: mutateEpisode } = useMutation({
    mutationFn: addNewEpisode,
    onSuccess: (data) => {
      navigate("/map");
      queryClient.invalidateQueries(["diaries"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    navigate("/map");
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let newPhotos = Array.from(e.target.files);
      if (newPhotos.length > 10) {
        newPhotos = newPhotos.slice(0, 10);
        alert("최대 10장의 사진만 업로드할 수 있습니다.");
      }
      setPhotos(newPhotos);
      setPhotoUrls(newPhotos.map((photo) => URL.createObjectURL(photo)));
      setPhotoIndex(0);
    }
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextPhoto = () => {
    setPhotoIndex((prevIndex) =>
      prevIndex < photos.length - 1 ? prevIndex + 1 : photos.length - 1
    );
  };

  const handleSave = async () => {
    const uploadedPhotosUrls = await Promise.all(
      photos.map(async (photo) => {
        const data = await addDiaryImage(photo);
        return data.imageUrl;
      })
    );

    setUploadedPhotos(uploadedPhotosUrls);

    mutateEpisode({
      placeId: selectedPlace.id, //
      placeName: selectedPlace.place_name,
      addressName: selectedPlace.address_name,
      x,
      y,
      visitDate: date,
      goPublic: isPublic,
      rating,
      title,
      content,
      weather: weather.weather,
      image: uploadedPhotosUrls,
    });
  };

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.episode} onClick={handleInnerClick}>
        <div className={styles.wrap_title}>
          <div className={styles.rating}>
            {[...Array(rating)].map((a, i) => (
              <PiStarFill
                className="star"
                key={i}
                onClick={() => setRating(i + 1)}
              />
            ))}
            {[...Array(5 - rating)].map((a, i) => (
              <PiStarLight
                className="star"
                key={i}
                onClick={() => setRating(rating + i + 1)}
              />
            ))}
          </div>
          <input
            className={styles.title}
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.wrap_date}>
            <input
              className={styles.date}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <span className={styles.weather}>
              {weather.weather === null ? (
                <BsQuestion />
              ) : weather.weather ? (
                weatherIcons[weather.weather]
              ) : (
                <BsQuestion />
              )}
            </span>
          </div>
        </div>
        <div className={styles.wrap_content}>
          <div
            className={styles.wrap_photo}
            style={{
              backgroundImage: `url(${photoUrls[photoIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: photoUrls[photoIndex] ? 0.8 : 1,
            }}
          >
            <div className={styles.wrap_slider}>
              {photoUrls.length > 1 && (
                <button className={styles.slider} onClick={handlePrevPhoto}>
                  <GrFormPrevious />
                </button>
              )}
              <label htmlFor="photo-upload" className={styles.photo}>
                <MdAddPhotoAlternate />
              </label>
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              {photoUrls.length > 1 && (
                <button className={styles.slider} onClick={handleNextPhoto}>
                  <GrFormNext />
                </button>
              )}
            </div>
          </div>
          <textarea
            className={styles.content}
            placeholder="여기에 글을 작성하세요..."
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setContent(e.target.value);
              }
            }}
          />
        </div>
        <div className={styles.wrap_btn}>
          <input
            id="public-checkbox"
            className={styles.checkbox}
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="public-checkbox">전체 공개</label>
          <button className={styles.btn} onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}
