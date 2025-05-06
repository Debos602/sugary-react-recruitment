import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const AnimationWrapper = ({ children, animationType, delay = 0 }) => {
    const ref = useRef(null);

    useEffect(() => {
        gsap.set(ref.current, { opacity: 0 });

        switch (animationType) {
            case "slideLeft":
                gsap.to(ref.current, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.2 + delay,
                });
                break;
            case "slideRight":
                gsap.to(ref.current, {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.4 + delay,
                });
                break;
            case "fadeUp":
            default:
                gsap.from(ref.current, {
                    y: 20,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.8 + delay,
                    ease: "back.out(1.7)",
                });
                break;
        }
    }, [animationType, delay]);

    return React.cloneElement(children, { ref });
};
