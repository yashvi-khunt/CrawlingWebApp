import { useEffect, useRef } from "react";

const compoenentDidMount = (callback: () => void, dependencies = []) => {
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (mounted.current) {
      callback();
    } else {
      mounted.current = true;
    }
  }, dependencies);
};

export default compoenentDidMount;
