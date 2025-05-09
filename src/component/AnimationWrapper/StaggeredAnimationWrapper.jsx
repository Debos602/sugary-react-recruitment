import gsap from "gsap";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
                opacity: 1, // Changed from 1 to 0 for fade-in effect
                duration: 0.6,
                stagger: 0.1,
                delay: 1.2 + delay,
                ease: "power2.out",
            });
        }
    }, [selector, delay]);

    return <div ref={ref}>{children}</div>;
};

// Prop types validation
StaggeredAnimationWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    selector: PropTypes.string.isRequired,
    delay: PropTypes.number,
};
