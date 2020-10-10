import React, { useState, useEffect} from 'react';
import FlagQuestion, { QuestionStates } from './FlagQuestion.js';
import shuffle from 'shuffle-array';

const Game = () =>  {

    const [countries, setCountries] = useState([])
    const [options, setOptions] = useState([])
    const [correctOption, setCorrectOption] = useState(undefined)
    const [questionState, setQuestionState] = useState(undefined)
    // this.state = {
    //   countries: [],
    //   options: [],
    //   correctOption: undefined,
    //   questionState: undefined
    // };

  useEffect(
    () => {
      fetch('https://restcountries.eu/rest/v2/all')
        .then(resp => resp.json())
        .then(countries => {
          const correctOption = Math.floor(Math.random() * countries.length);
          const options = _getOptions(correctOption, countries);
          setCountries(countries)
          setCorrectOption(correctOption)
          setOptions(options)
          setQuestionState(QuestionStates.QUESTION)
          // this.setState({
          //   countries,
          //   correctOption,
          //   options,
          //   questionState: QuestionStates.QUESTION
          // });
        })
        .catch(console.warn);
    }, []
  )

  const onGuess = (answer)=> {
    // const { correctOption } = this.state;
    const questionState = answer === correctOption
      ? QuestionStates.ANSWER_CORRECT
      : QuestionStates.ANSWER_WRONG;
    setCorrectOption({ questionState });
  }

  const nextQuestion = () =>{
    // const { countries } = this.state;
    const correctOption = Math.floor(Math.random() * countries.length);
    const options = _getOptions(correctOption, countries);
    setCorrectOption(correctOption)
    setOptions(options)
    setQuestionState(QuestionStates.QUESTION)
    // this.setState({
    //   correctOption,
    //   options,
    //   questionState: QuestionStates.QUESTION
    // });
  }

  const _getOptions = (correctOption, countries) => {
    const options = [correctOption];
    let tries = 0;
    while (options.length < 4 && tries < 15) {
      const option = Math.floor(Math.random() * countries.length);
      if (options.indexOf(option) === -1) {
        options.push(option);
      } else {
        tries++;
      }
    }
    return shuffle(options);
  }


    // const {
    //   countries,
    //   correctOption,
    //   options,
    //   questionState
    // } = this.state;

    let output = <div>Loading...</div>;
    if (correctOption !== undefined) {
      const { flag, name } = countries[correctOption];
      const opts = options.map(opt => {
        return {
          id: opt,
          name: countries[opt].name
        };
      });
      output = (
        <FlagQuestion
          answerText={name}
          onGuess={onGuess}
          onNext={nextQuestion}
          options={opts}
          questionState={questionState}
          flag={flag}
        />
      );
    }
    return (
      <div style={{ marginTop: '15px' }}>
        {output}
      </div>
    );
 
}

export default Game;