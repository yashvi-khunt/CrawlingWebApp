// import { useState, useEffect } from "react";

// const useScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState<boolean>(false);

//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 100,
//   });

//   const handleClick = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     setIsVisible(trigger);
//   }, [trigger]);

//   return { isVisible, handleClick };
// };

// export default useScrollToTop;
