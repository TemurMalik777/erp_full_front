import { useEffect } from "react";
import "./star-night.css";

const StarryNight = () => {
  useEffect(() => {
    const starsContainer = document.querySelector(".stars");
    const shootingStarsContainer = document.querySelector(".shooting-stars");

    if (starsContainer) {
      for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        starsContainer.appendChild(star);
      }
    }

    const createShootingStar = () => {
      if (!shootingStarsContainer) return;
      const shootingStar = document.createElement("div");
      shootingStar.className = "shooting-star";
      const isShortTrail = Math.random() < 0.01;
      shootingStar.classList.add(isShortTrail ? "short-trail" : "long-trail");
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 110}%`;
      const angle = Math.random() * 1480;
      shootingStar.style.transform = `rotate(${angle}deg)`;
      shootingStar.style.animation = `shoot 1s linear forwards`;
      shootingStarsContainer.appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, 1000);
    };

    const interval = setInterval(createShootingStar, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="starry-body">
      <div className="stars"></div>
      <div className="shooting-stars"></div>
    </div>
  );
};

export default StarryNight;
