import React from 'react'
import { Card, Button, } from "react-bootstrap";
import CardFlip from "react-card-flip";
import { getFormattedDate } from '../../utils/helpers';


const Index = ({ item, flippedCards = [], handleCardClick, handleDeleteProfile }) => {

  const renderCardContent = () => {
    const isFlipped = flippedCards.includes(item.email);
    return (
      <div data-testid="user-card" >
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
          <div className="card-back">
            <Card.Body>
              <Card.Text><span className='fs-5'>Gender:</span>{` ${item.gender ?? "N/A"}`}</Card.Text>
              <Card.Text><span className='fs-5'>Phone:</span>{`${item.phone}` ?? "N/A"}</Card.Text>
              <Card.Text><span className='fs-5'>Email:</span>{` ${item.email}` ?? "N/A"}</Card.Text>
              <Card.Text><span className='fs-5'>Date of Birth:</span>{` ${getFormattedDate(item?.dob?.date)}`}</Card.Text>
              <Card.Text><span className='fs-5'>Address:</span>{` ${`${item?.location?.city}, ${item?.location?.country}` ?? "N/A"}`}</Card.Text>
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
    <Card className={`${flippedCards.includes(item.email) ? "selected" : "mb-5"}`}  >
      {renderCardContent()}
    </Card>
  )
}

export default Index