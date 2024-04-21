const getCookieValue = (name) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name.trim()) {
        return cookieValue.trim();
      }
    }
    return null;
};

export default getCookieValue