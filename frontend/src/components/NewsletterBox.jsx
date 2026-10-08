import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="newsletter-container">
      <h3 className="newsletter-title">Subscribe now & get 20% off</h3>
      <p className="newsletter-text">
        Stay updated with our latest collections and exclusive promotional
        offers.
      </p>
      <form onSubmit={onSubmitHandler} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="form-input"
          required
        />
        <button type="submit" className="btn btn-primary">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
