// src/pages/ReviewScreen.jsx
import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Star, StarFill, SendFill } from 'react-bootstrap-icons';
import './../assets/css/ReviewScreen.css';

const ratingData = {
  1: { emoji: '😞', text: 'Yaxşılaşdırılmalıdır 😕' },
  2: { emoji: '😐', text: 'Orta' },
  3: { emoji: '🙂', text: 'Normal idi' },
  4: { emoji: '😄', text: 'Yaxşı təcrübə' },
  5: { emoji: '🤩', text: 'Əla!' },
};

const ReviewScreen = () => {
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // URL-dən ?r=... parametrini götürürük
  const searchParams = new URLSearchParams(location.search);
  const businessName = searchParams.get("r");
  console.log(businessName)

  const currentDisplayRating = hoverRating || rating;
  const currentEmoji = ratingData[currentDisplayRating].emoji;
  const currentText = ratingData[currentDisplayRating].text;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      business: businessName,
      rating: rating,
      comment: comment
    };

    try {
      const response = await fetch("https://tamteam.net/api/v1/create_review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.text();
      console.log("Server response:", result);

      navigate('/');
    } catch (error) {
      console.error("POST error:", error);
    }
  };

  return (
    <Container fluid className="p-3 review-screen">
      <div className="review-header d-flex align-items-center mb-4">
        <Link to="/" className="text-dark me-3">
          <ArrowLeft size={24} />
        </Link>
        <h5 className="mb-0 flex-grow-1 text-center" style={{ marginRight: '24px' }}>
          Qiymətləndirmə
        </h5>
      </div>

      <div className="review-body text-center">
        <div className="emoji-display">{currentEmoji}</div>

        <h3 className="fw-bold my-3">Təcrübənizi qiymətləndirin</h3>

        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`star-icon ${currentDisplayRating >= index ? 'filled' : ''}`}
              onMouseEnter={() => setHoverRating(index)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(index)}
            >
              {currentDisplayRating >= index ? <StarFill /> : <Star />}
            </span>
          ))}
        </div>

        <p className="rating-text mt-2">{currentText}</p>

        <Form onSubmit={handleSubmit} className="text-start mt-5">
          <Form.Group>
            <Form.Label className="fw-bold fs-5">Əlavə qeydlər</Form.Label>
            <p className="text-muted small">Təcrübəniz barədə daha ətraflı məlumat verin (istəyə görə)</p>

            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Fikirlərinizi bizimlə bölüşün..."
              className="review-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-4 btn-submit-review">
            <SendFill className="me-2" /> Rəyinizi göndərin
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ReviewScreen;
