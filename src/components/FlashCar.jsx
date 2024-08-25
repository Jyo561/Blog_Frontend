import React from 'react';

function FlashcardUI() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Flashcards for Revision</h1>
      </div>

      <div style={styles.content}>
        <h2>Why should I use Flashcards for revision?</h2>
        <p>
          There are several steps in the revision process when it comes to preparing for your exams. Flashcards offer a structured way of testing your knowledge on each subject.
        </p>

        <h2>How to use Save My Exams Flashcards?</h2>
        <p>
          You can start using Save My Exams Flashcards by clicking on the topic of interest from the menu or board link.
        </p>

        <h2>Are there other ways to use Flashcards to aid my revision?</h2>
        <p>
          There are many ways to use Flashcards to support your revision. Flashcards can be used to identify gaps in knowledge, test yourself under timed conditions, or share them with friends.
        </p>

        <h2>Conclusion</h2>
        <p>
          Remember that the key to successful revision is consistency and understanding. Flashcards are a great tool to assist in this process.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  },
  content: {
    marginTop: '20px',
  }
};

export default FlashcardUI;
