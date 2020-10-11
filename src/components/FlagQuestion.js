import React, {useState} from 'react';
import FlagChoices from './FlagChoices'
import FlagAnswer from './FlagAnswer';
import './FlagQuestion.css';

const QuestionStates = {
  QUESTION: 1,
  ANSWER_WRONG: 2,
  ANSWER_CORRECT: 3
};

const FlagQuestion = ({flag,
      onGuess,
      questionState,
      options,
      answerText,
      onNext}) => {

  const [userChoice, setUserChoice] = useState(undefined)

  const handleChange = (e) => {
    setUserChoice({userChoice: Number(e.target.value)});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(userChoice);
  }

    // const {
    //   flag,
    //   questionState,
    //   options,
    //   answerText,
    //   onNext
    // } = this.props;
    // const {userChoice} = this.state;
    let opts = options.map(opt => ({
      ...opt,
      checked: userChoice === opt.id
    }));
    let output = questionState === QuestionStates.QUESTION ?
      (<FlagChoices handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    options={opts} />) :
      (<FlagAnswer
        correct={questionState === QuestionStates.ANSWER_CORRECT}
        answer={answerText}
        onNext={onNext} />);

    return (
      <div>
        {output}
        <img
            className="flag-img"
            src={flag}
            alt="Guess the flag"
         />
      </div>
    );
  
}
FlagQuestion.defaultProps = {
    options: []
  }
export default FlagQuestion;
export { QuestionStates };