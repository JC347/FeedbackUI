import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: "This item is feedback item 1",
    },
    {
      id: 2,
      rating: 9,
      text: "This item is feedback item 2",
    },
    {
      id: 3,
      rating: 1,
      text: "This item is feedback item 3",
    },
  ]);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  //Add Feddback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };
  //delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm("You Sure ? ")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //Update

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };
  //Set Item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
