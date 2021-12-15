const primary = "#F36A3E"
const secondary = "#FFB30B"

export default function Logo() {
  return (
    <svg viewBox="0 0 81 81" version="1.1" className="inline-block w-8 h-8">
      <g transform="matrix(0.449977,-0.449977,0.449977,0.449977,-2128.39,1925.9)">
        <g transform="matrix(1,0,0,1,3940,-1120.56)">
          <path
            d="M520,1390.57L560,1390.57L560,1400.57L530,1400.57L530,1420.57L560,1420.57L560,1430.57L520,1430.57L520,1390.57Z"
            style={{ fill: primary }}
          />
        </g>
        <g transform="matrix(1,0,0,1,3930,-1120.56)">
          <path
            d="M620,1390.57L620,1430.57L610,1430.57L610,1400.57L590,1400.57L590,1430.57L580,1430.57L580,1390.57L620,1390.57Z"
            style={{ fill: primary }}
          />
        </g>
        <g transform="matrix(1,0,0,1,3940,-1120.56)">
          <path
            d="M520,1440.57L560,1440.57L560,1480.57L550,1480.57L550,1450.57L520,1450.57L520,1440.57Z"
            style={{ fill: secondary }}
          />
        </g>
        <g transform="matrix(1,0,0,1,3930,-1120.56)">
          <path
            d="M590,1470.57L610,1470.57L610,1450.57L590,1450.57L590,1470.57ZM580,1440.57L620,1440.57L620,1480.57L580,1480.57L580,1440.57Z"
            style={{ fill: primary }}
          />
        </g>
      </g>
    </svg>
  )
}
