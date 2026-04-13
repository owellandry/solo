export function ModeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="24"
      fill="none"
      viewBox="0 0 34 24"
      className="mode-switch__logo"
      aria-hidden="true"
    >
      <g fill="currentColor" clipPath="url(#mode-switch-logo)">
        <path d="M.002 0H0v19.549h4.454V4.454h24.864v15.092H4.454V24h29.318V0z" />
        <path d="m13.43 8.776-3.149 3.15 3.15 3.149 3.149-3.15zM23.204 8.775l-3.15 3.149 3.15 3.149 3.15-3.15z" />
      </g>
      <defs>
        <clipPath id="mode-switch-logo">
          <path fill="#fff" d="M0 0h33.772v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
