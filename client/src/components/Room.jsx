import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Room = ({ room }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card mb-4 bs border-0 overflow-hidden card-height">
      {/* Mobile Layout (Full Width Image) */}
      <div className="d-md-none h-100">
        <div className="position-relative h-50">
          <img
            src={room.imageurls[0]}
            className="w-100 h-100 object-fit-cover"
            alt={`${room.name} preview`}
          />
          <div className="position-absolute top-0 start-0 p-3 d-flex gap-2">
            <span className="badge bg-black">{room.type}</span>
            {room.availability === "available" && (
              <span className="badge bg-success">Available</span>
            )}
          </div>
        </div>

        <div className="card-body h-50 d-flex flex-column">
          <h2 className="card-title h5 text-truncate mb-2">{room.name}</h2>

          <div className="d-flex flex-column gap-2 mb-auto">
            <div className="d-flex align-items-center">
              <i className="bi bi-people-fill me-2 text-black"></i>
              <span className="small">Max Guests: {room.maxcount}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-telephone-fill me-2 text-black"></i>
              <span className="small">{room.phonenumber}</span>
            </div>
          </div>

          <div className="d-flex gap-2 mt-2">
            <div className="d-flex gap-2 flex-grow-1">
              <button
                className="btn btn-dark d-flex align-items-center justify-content-center"
                onClick={handleShow}
              >
                View Details
                <i className="bi bi-arrow-right ms-2"></i>
              </button>

              <Link
                to={`/app/room-booking/${room._id}`}
                className="btn btn-dark d-flex align-items-center"
              >
                Book Room
              </Link>
            </div>
            <button
              className="btn btn-outline-secondary"
              title="Add to favorites"
            >
              <i className="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout (Side by Side) */}
      <div className="d-none d-md-block h-100">
        <div className="row g-0 h-100">
          {/* Image Container - Fixed width and full height */}
          <div className="col-md-4 h-100 position-relative overflow-hidden">
            <img
              src={room.imageurls[0]}
              className="w-100 h-100 object-fit-cover transition-transform"
              alt={`${room.name} preview`}
            />
            <div className="position-absolute top-0 start-0 p-3 d-flex gap-2">
              <span className="badge bg-black">{room.type}</span>
              {room.availability === "available" && (
                <span className="badge bg-success">Available</span>
              )}
            </div>
          </div>

          {/* Content Container */}
          <div className="col-md-8 h-100">
            <div className="card-body h-100 d-flex flex-column">
              <div className="mb-auto">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h2
                    className="card-title h4 mb-0 text-truncate"
                    title={room.name}
                  >
                    {room.name}
                  </h2>
                  <div className="rating-badge ms-2 small">
                    <i className="bi bi-star-fill text-warning me-1"></i>
                    <span>{room.rating || "4.5"}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-people-fill me-2 text-black"></i>
                    <span>Max Guests: {room.maxcount}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone-fill me-2 text-black"></i>
                    <span>{room.phonenumber}</span>
                  </div>
                  {room.amenities && (
                    <div className="d-flex gap-2 flex-wrap mt-2">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="badge bg-light text-dark">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-dark d-flex align-items-center"
                    onClick={handleShow}
                  >
                    View Details
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  <Link
                    to={`/app/room-booking/${room._id}`}
                    className="btn btn-dark d-flex align-items-center"
                  >
                    Book Room
                  </Link>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary"
                    title="Share room"
                  >
                    <i className="bi bi-share"></i>
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    title="Add to favorites"
                  >
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item key={url}>
                  <div className="carousel-image-wrapper">
                    <img src={url} alt="room-pic" className="carousel-image" />
                  </div>
                  <Carousel.Caption></Carousel.Caption>
                  <div className="mt-1 mb-5 text-center">
                    <p>{room.description}</p>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Room;
