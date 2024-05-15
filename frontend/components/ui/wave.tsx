import React from "react";

/**
 * WavesContainer component renders the header with waves.
 * @returns {JSX.Element} The WavesContainer component.
 */
const WavesContainer: React.FC = (): JSX.Element => {
  return (
    <div>
      <div className="header">
        <div className="inner-header flex">
          <img
            src="/vector/logo.svg"
            alt="Logo"
            className="w-[116px] pt-8 lg:w-[132px]"
          />
        </div>

        <div>
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#f7f8fe" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WavesContainer;
