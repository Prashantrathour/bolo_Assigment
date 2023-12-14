import React from 'react'
import { Audio, ProgressBar } from 'react-loader-spinner'

function Loader() {
  return (
<Audio
  height="150"
  width="150"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#eb1313'
/>
  )
}

export default Loader