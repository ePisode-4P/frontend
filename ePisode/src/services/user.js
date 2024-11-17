const API_BASE_URL = "https://episode4p.shop";

export const getUserInfo = async () => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  return data || [];
};

export const removeUser = async () => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.setItem("isLoggedIn", false);
  } else {
    throw new Error("탈퇴 실패");
  }
};

export const updateUser = async (userData) => {
  const token = localStorage.getItem("access-token");

  const response = await fetch(`${API_BASE_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("사용자 정보 업데이트에 실패했습니다.");
  }
};
