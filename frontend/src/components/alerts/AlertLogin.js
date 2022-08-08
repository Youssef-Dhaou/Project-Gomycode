import React from 'react'
import "./alertLogin.css"

const AlertLogin = () => {
  return (  
    <div>
<section id="fail">
  <div className="icon">
    <i className="fa fa-frown-o" aria-hidden="true" />
  </div>
  <h1>Oh! Something went wrong!</h1>
  <p>Go back and refresh the page.</p>
  <p>Contact us if this still apear.</p>
  <i className="fa fa-times fail" aria-hidden="true" />
</section>

</div>
  )
}

export default AlertLogin