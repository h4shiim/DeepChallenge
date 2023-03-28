import React, { useState } from 'react';
import "./Payment.css"
import BackgroundVideo from '../Header/Navigations/Home/backgroundVideo';

const PaymentComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pointsUsed, setPointsUsed] = useState(false);
  const [pointsAvailable, setPointsAvailable] = useState(0);
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePointsUse = (event) => {
    setPointsUsed(event.target.checked);
  };

  const handlePaymentFormChange = (event) => {
    const { name, value } = event.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value,
    });
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // TODO: handle payment processing and account update
  };

  return (
    <div className='payment-body'>
    <div className="payment-component">
        {/* <BackgroundVideo /> */}
      <h2 className="payment-component__title">Choose your plan</h2>
      <div className="payment-component__plans">
        <div className={`payment-component__plan ${selectedPlan === 'basic' ? 'selected' : ''}`}>
          <h3 className="payment-component__plan-title">Basic</h3>
          <p className="payment-component__plan-price">$10/month</p>
          <ul className="payment-component__plan-features">
            <li>Access to all basic courses</li>
            <li>No ads</li>
            <li>No limit on challenges</li>
          </ul>
          <button className="payment-component__plan-button" onClick={() => handlePlanSelect('basic')}>
            {selectedPlan === 'basic' ? 'Selected' : 'Select'}
          </button>
        </div>
        <div className={`payment-component__plan ${selectedPlan === 'premium' ? 'selected' : ''}`}>
          <h3 className="payment-component__plan-title">Premium</h3>
          <p className="payment-component__plan-price">$20/month</p>
          <ul className="payment-component__plan-features">
            <li>Access to all courses</li>
            <li>No ads</li>
            <li>No limit on challenges</li>
            <li>Exclusive content</li>
          </ul>
          <button className="payment-component__plan-button" onClick={() => handlePlanSelect('premium')}>
            {selectedPlan === 'premium' ? 'Selected' : 'Select'}
          </button>
        </div>
        <div className="payment-component__plan">
          <h3 className="payment-component__plan-title">Coming Soon</h3>
          <p className="payment-component__plan-price">Coming Soon</p>
          <ul className="payment-component__plan-features">
            <li>Upcoming courses</li>
            <li>Early access</li>
          </ul>
          <button className="payment-component__plan-button" disabled>Coming Soon</button>
        </div>
      </div>
      <h2 className="payment-component__title">Payment Information</h2>
      <div className="payment-component__payment-methods">
      <label className="payment-component__payment-method">
      <input
        type="radio"
        name="paymentMethod"
        value="creditCard"
        checked={!pointsUsed}
        onChange={handlePointsUse}
        className="payment-component__payment-method-input"
      />
      <span className="payment-component__payment-method-label">Credit Card</span>
    </label>
    <label className="payment-component__payment-method payment-component__payment-method--points">
  <input
    type="radio"
    name="paymentMethod"
    value="points"
    checked={pointsUsed}
    onChange={handlePointsUse}
    className="payment-component__payment-method-input"
    disabled={pointsAvailable <= 0}
  />
  <span className="payment-component__payment-method-label">
    {pointsAvailable > 0 ? `Points (${pointsAvailable})` : 'Pay with points'}
    <span className="payment-component__payment-method-hover">
        How to get points? <br></br>
        Simply you can complete each task for each lesson.
        </span>
</span>

</label>

  </div>
  <form className="payment-component__form" onSubmit={handlePaymentSubmit}>
    <label className="payment-component__form-label">
      <span>Name on Card</span>
      <input
        type="text"
        name="name"
        placeholder='John Doe'
        value={paymentForm.name}
        onChange={handlePaymentFormChange}
        className="payment-component__form-input"
      />
    </label>
    <label className="payment-component__form-label">
      <span>Email</span>
      <input
        type="email"
        name="email"
        placeholder='email@example.com'
        value={paymentForm.email}
        onChange={handlePaymentFormChange}
        className="payment-component__form-input"
      />
    </label>
    <label className="payment-component__form-label">
      <span>Card Number</span>
      <input
        type="text"
        name="cardNumber"
        placeholder='2342 2728 4400 4851'
        value={paymentForm.cardNumber}
        onChange={handlePaymentFormChange}
        className="payment-component__form-input"
      />
    </label>
    <div className="payment-component__form-row">
      <label className="payment-component__form-label">
      <span>Expiry Date</span>
      <input
        type="text"
        name="expiryDate"
        placeholder='05/25'
        value={paymentForm.expiryDate}
        onChange={handlePaymentFormChange}
        className="payment-component__form-input"
      />
      </label>
      </div>
    
    <label className="payment-component__form-label">
      CVV
      <input
        type="text"
        name="cvv"
        placeholder='000'
        value={paymentForm.cvv}
        onChange={handlePaymentFormChange}
        className="payment-component__form-input"
      />
    </label>
    <button type="submit" className="payment-component__form-button">Pay Now</button>
  </form>
</div>
</div>
);
};

export default PaymentComponent;