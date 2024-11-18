import React, { useState } from "react";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import { BsCloudFog2, BsShare } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  IoSunnyOutline,
  IoRainyOutline,
  IoCloudOutline,
  IoSnowOutline,
  IoThunderstormOutline,
} from "react-icons/io5";
import styles from "./EpisodeDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getEpisode,
  getPublicDiaries,
  getPublicEpisode,
  removeEpisode,
} from "../../services/diary";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function EpisodeDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { id, selectedPlace, isPublic } = location.state || {};
  const [showShareToast, setShowShareToast] = useState(false);
  const [toastPosition, setToastPosition] = useState({ x: 0, y: 0 });

  const weatherIcons = {
    Clear: <IoSunnyOutline />,
    Rain: <IoRainyOutline />,
    Clouds: <IoCloudOutline />,
    Snow: <IoSnowOutline />,
    Thunderstorm: <IoThunderstormOutline />,
    Drizzle: <IoRainyOutline />,
    Atmosphere: <BsCloudFog2 />,
  };

  const fetchEpisodeDetails = isPublic ? getPublicEpisode : getEpisode;

  const {
    data: episode = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: () => fetchEpisodeDetails(id),
    onError: (error) => {
      console.error(error);
    },
    enabled: !!id,
  });

  console.log(episode);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: () => removeEpisode(id),
    onSuccess: (data) => {
      navigate("/map");
      queryClient.invalidateQueries(["diaries"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const [photoIndex, setPhotoIndex] = useState(0);

  const handleClick = () => {
    navigate("/map");
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    navigate("../episode/edit", {
      state: {
        id,
        episode,
        selectedPlace,
      },
    });
  };

  const handleRemove = () => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");

    if (isConfirmed) {
      mutateDelete();
    }
  };

  const handleShare = async () => {
    const rating = "★".repeat(episode.rating) + "☆".repeat(5 - episode.rating);
    const currentUrl = window.location.href;
    const shareText = `[다이어리 공유]\n\n제목: ${
      episode.title || "무제"
    }\n날짜: ${episode.visitDate || "언젠가 들렀음"}\n평점: ${rating}\n날씨: ${
      episode.weather || "-"
    }\n\n${episode.content}\n\n🔗 링크: ${currentUrl}`;

    try {
      await navigator.clipboard.writeText(shareText);

      const shareButton = document.querySelector("[data-share-button]");
      if (shareButton) {
        const rect = shareButton.getBoundingClientRect();
        const buttonCenter = rect.left + rect.width / 2;

        setToastPosition({
          x: buttonCenter,
          y: rect.top - 10,
        });
      }

      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("텍스트 복사에 실패했습니다.");
    }
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextPhoto = () => {
    setPhotoIndex((prevIndex) =>
      prevIndex < episode.diaryImage.length - 1
        ? prevIndex + 1
        : episode.diaryImage.length - 1
    );
  };

  return (
    <div className={styles.filter} onClick={handleClick}>
      <div className={styles.episode} onClick={handleInnerClick}>
        <div className={styles.wrap_title}>
          <div className={styles.rating}>
            {[...Array(episode.rating || 0)].map((_, i) => (
              <PiStarFill className="star" key={i} />
            ))}
            {[...Array(5 - (episode.rating || 0))].map((_, i) => (
              <PiStarLight className="star" key={i} />
            ))}
          </div>
          <h2 className={styles.title}>{episode.title || "무제"}</h2>
          <div className={styles.wrap_date}>
            <p className={styles.date}>
              {episode.visitDate || "언젠가 들렀음"}
            </p>
            <span className={styles.weather}>
              {weatherIcons[episode.weather]}
            </span>
          </div>
        </div>
        <div className={styles.wrap_content}>
          <div
            className={styles.wrap_photo}
            style={{
              backgroundImage: `url(${
                episode.diaryImage && episode.diaryImage.length > 0
                  ? episode.diaryImage[photoIndex]
                  : "https://res.cloudinary.com/dnbf7czsn/image/upload/v1715768138/3129545_mcze7g.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className={styles.wrap_slider}>
              {episode.diaryImage && episode.diaryImage.length > 1 && (
                <button className={styles.slider} onClick={handlePrevPhoto}>
                  <GrFormPrevious />
                </button>
              )}
              {episode.diaryImage && episode.diaryImage.length > 1 && (
                <button className={styles.slider} onClick={handleNextPhoto}>
                  <GrFormNext />
                </button>
              )}
            </div>
          </div>
          <p className={styles.content} style={{ whiteSpace: "pre-wrap" }}>
            {episode.content}
          </p>
        </div>
        <div className={styles.wrap_btn}>
          {episode.isMe !== false && (
            <>
              <button className={styles.btn} onClick={handleEdit}>
                Edit
              </button>
              <button className={styles.btn} onClick={handleRemove}>
                Delete
              </button>
            </>
          )}
          {episode.isMe !== false && episode.goPublic && (
            <button
              className={styles.btn}
              onClick={handleShare}
              data-share-button
            >
              <BsShare /> Share
            </button>
          )}
        </div>
        {showShareToast && (
          <div className={styles.toast}>
            <div className={styles.toastContent}>
              텍스트가 클립보드에 복사되었습니다!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
