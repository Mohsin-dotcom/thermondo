import React from 'react'
import { Card, Button, } from "react-bootstrap";
import CardFlip from "react-card-flip";
import { getFormattedDate } from '../../utils/helpers';


const Index = ({ item, flippedCards = [], handleCardClick, handleDeleteProfile }) => {

  const renderCardContent = () => {
    const isFlipped = flippedCards.includes(item.email);
    return (
      <div data-testid="user-card" className='d-flex flex-column justify-content-between' style={{ minHeight: "380px" }}>
        <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div>
            <Card.Img
              variant="top"
              src={item?.picture?.large}
              className="mx-auto d-block mt-3 rounded-circle w-50"
            />
            <Card.Body className="text-center">
              <Card.Title>{`${item?.name?.first} ${item?.name?.last}`}</Card.Title>
            </Card.Body>
          </div>
          <div className="card-back p-3">
            <Card.Body>
              <Card.Text><span className='fs-7'>Gender:</span>{` ${item.gender ?? "N/A"}`}</Card.Text>
              <Card.Text><span className='fs-7'>Phone:</span>{`${item.phone}` ?? "N/A"}</Card.Text>
              <Card.Text><span className='fs-7'>Email:</span>{` ${item.email}` ?? "N/A"}</Card.Text>
              <Card.Text><span className='fs-7'>Date of Birth:</span>{` ${getFormattedDate(item?.dob?.date)}`}</Card.Text>
              <Card.Text><span className='fs-7'>Address:</span>{` ${`${item?.location?.city}, ${item?.location?.country}` ?? "N/A"}`}</Card.Text>
            </Card.Body>
          </div>
        </CardFlip>
        <div className='d-flex flex-row  justify-content-center gap-2 mb-2'>
          <Button className="mt-4" onClick={() => handleCardClick(item.email)}>
            {` ${isFlipped ? "Hide" : "Show"} details`}
          </Button>
          <Button
            className="mt-4"
            variant="danger"
            onClick={() => handleDeleteProfile(item.email)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className={`${flippedCards.includes(item.email) ? "selected" : ""}`}  >
      {renderCardContent()}
    </Card>
  )
}

export default Index