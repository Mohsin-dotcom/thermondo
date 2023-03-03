import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { getRandomUsers } from "../../utils/API";
import Card from "../Card";

const Index = () => {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [activeAction, setActiveAction] = useState('')
  const [flippedCards, setFlippedCards] = useState([]);
  const [profilesToAdd, setProfilesToAdd] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setActiveAction("loading...")
    getRandomUsers()
      .then((res) => {
        setUsersList(res?.data?.results)
        setLoading(false);
      })
      .catch((error) => {
        setError("Something went wrong!")
        setLoading(false);
      })
  }

  const handleAddProfiles = () => {
    setLoading(true);
    setActiveAction(`Adding ${profilesToAdd} more profile(s)...`)
    setProfilesToAdd((prevProfilesToAdd) => prevProfilesToAdd + 1)
    //api call
    getRandomUsers(profilesToAdd)
      .then((res) => {
        setUsersList(prevUsers => [...res.data.results, ...prevUsers]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setLoading(false);
      })
  }

  const handleDeleteProfile = (userEmail) => {
    const updatedList = usersList.filter((x) => x.email !== userEmail);
    setUsersList(updatedList);
  }

  const handleCardClick = (id) => {
    const newFlippedCards = [...flippedCards];
    if (newFlippedCards.includes(id)) {
      const indexToRemove = newFlippedCards.indexOf(id);
      newFlippedCards.splice(indexToRemove, 1);
    } else {
      newFlippedCards.push(id);
    }
    setFlippedCards(newFlippedCards);
  };

  if (error) return <div>{error}</div>
  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100" >{activeAction}</div>

  return (
    <div className="container mt-md-3 pt-5 ">
      <div className="d-flex flex-row justify-content-between ">
        <span>Users Count: {usersList?.length}</span>
        <div className="d-flex gap-2 mb-2">
          <Button
            onClick={handleAddProfiles}
            className="btn btn-warning"
          >
            Add profile(s)
          </Button>
          <Button
            onClick={fetchData}
            className="btn btn-warning"
          >
            Renew profiles
          </Button>
        </div>
      </div>
      <Row className="justify-content-center ">
        {usersList?.length > 0 ? (
          usersList.map((item) => (
            <Col lg={4} md={6} key={`user-card-${item.email}`} className="mb-4 " >
              <Card
                item={item}
                flippedCards={flippedCards}
                handleCardClick={handleCardClick}
                handleAddProfiles={handleAddProfiles}
                handleDeleteProfile={handleDeleteProfile}
              />
            </Col>
          ))) : (
          <div className="d-flex justify-content-center align-items-center min-vh-100">No users found</div>
        )}
      </Row>

    </div>
  );
};

export default Index