import { useEffect, useState } from "react";

/**
 * Hook to detect mobile devices and disable animations
 * Returns isMobile boolean that can be used to conditionally render animations
 */
export function useMobileOptimization() {
  // Keep SSR and first client render identical; resolve viewport only after mount.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
}

/**
 * Returns mobile-safe animation props
 * On mobile: returns props with instant transitions
 * On desktop: returns original props
 */
export function getMobileAnimation(isMobile: boolean, props: Record<string, unknown>) {
  if (isMobile) {
    return {
      ...props,
      animate: undefined,
      transition: { duration: 0 },
      whileHover: undefined,
      whileTap: undefined,
      whileInView: undefined,
    };
  }
  return props;
}
