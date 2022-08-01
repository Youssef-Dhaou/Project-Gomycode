import React, { useState } from 'react'
import './contact.css'
import { FcSms } from "react-icons/fc";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);


    const submit = () => {
      if (name && email && message) {
         // TODO - send mail
  
          setName('');
          setEmail('');
          setMessage('');
          setEmailSent(true);
      } else {
          alert('Please fill in all fields.');
      }
  }

    return (

      <div> 

<div className="continer">
  <h2 className="title">
  <span><FcSms/> </span>
    <span className="title-word title-word-2">CONTACT</span>
    <span className="title-word title-word-3">US</span>
    <span style={{marginLeft:"20px"}}><FcSms/> </span>
  </h2>
</div>


 <div id="contact-form">


            <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submit}>Send Message</button>
        </div>
      </div>
    );
};

export default Contact;