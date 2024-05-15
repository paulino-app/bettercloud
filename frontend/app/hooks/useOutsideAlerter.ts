import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref.
 * @param {React.RefObject<HTMLElement>} ref - The ref to monitor.
 * @param {() => void} fun - Function to call on outside click.
 */
export default function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  fun: () => void,
): void {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element.
     * @param {MouseEvent} event - The mouse event.
     */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        fun();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, fun]);
}
