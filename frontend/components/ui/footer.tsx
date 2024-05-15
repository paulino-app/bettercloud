import React from "react";

/**
 * Footer component to display a footer message.
 * @returns {JSX.Element} The Footer component.
 */
const Footer: React.FC = (): JSX.Element => {
  return (
    <div className="footer-container mt-40 flex h-[52px] w-full items-center justify-center text-lg">
      <div>Made with ❤ by Paulino Torres</div>
    </div>
  );
};

export default Footer;
