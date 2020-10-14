import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();

        // call action creater to submit form

        setName(""); //clear inputs
        setEmail("");

    }

    return (
      <div className="form__container">
        <h3>We'll email this amazing snap to you!</h3>
        <form className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form__name"
            placeholder="Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form__email"
            placeholder="Email"
          />
          <button onClick={onFormSubmit} type="submit">Send it to me!</button>
        </form>
      </div>
    );
}

export default Form;
