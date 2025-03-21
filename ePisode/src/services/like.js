const API_BASE_URL = "https://episode4p.shop";

export const getLikes = async () => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/mark`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("좋아요 리스트를 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  return data || [];
};

export const addNewLike = async (placeInfo) => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/mark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(placeInfo),
  });

  if (!response.ok) {
    throw new Error("좋아요 등록 실패");
  }
};

export const removeLike = async (x, y) => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/mark?x=${x}&y=${y}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("좋아요 해제 실패");
  }
};
