import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export const StaggeredAnimationWrapper = ({
    children,
    selector,
    delay = 0,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            gsap.from(ref.current.querySelectorAll(selector), {
                y: 20,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 1.2 + delay,
                ease: "power2.out",
            });
        }
    }, [selector, delay]);

    return <div ref={ref}>{children}</div>;
};
