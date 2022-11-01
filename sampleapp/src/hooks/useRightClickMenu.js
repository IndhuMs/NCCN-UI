import { useState, useEffect } from "react";

export default function useRightClickMenu() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.pageX + 150 > window.innerWidth
      ? setX(`${window.innerWidth - 180}px`)
      : setX(e.pageX);
    e.pageY + 200 > window.innerHeight
      ? setY(`${window.innerHeight - 230}px`)
      : setY(e.pageY);

    setShowMenu(true);
  };

  const handleClick = () => {
    showMenu && setShowMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { x, y, showMenu };
}