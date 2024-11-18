const API_BASE_URL = "https://episode4p.shop";

export const addDiaryImage = async (imageFile) => {
  const token = localStorage.getItem("access-token");

  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(`${API_BASE_URL}/s3/upload/diary`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("이미지 등록 실패");
  }

  const data = await response.json();

  return data || [];
};

export const addProfileImage = async (imageFile) => {
  const token = localStorage.getItem("access-token");

  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(`${API_BASE_URL}/s3/upload/profile`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("프로필 이미지 등록 실패");
  }

  const data = await response.json();

  return data || [];
};
