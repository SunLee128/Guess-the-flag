import React, { useState, useEffect} from 'react';
import FlagQuestion, { QuestionStates } from './FlagQuestion.js';
import shuffle from 'shuffle-array';

const Game = () =>  {

    const [countries, setCountries] = useState([])
    const [options, setOptions] = useState([])
    const [correctOption, setCorrectOption] = useState(undefined)
    const [questionState, setQuestionState] = useState(undefined)

  useEffect(
    () => {
      fetch('https://restcountries.eu/rest/v2/all')
        .then(resp => resp.json())
        .then(countries => {
// console.log(fetchedCountries)
          //the answer of the question
          let correctOption = Math.floor(Math.random() * countries.length);
          //get 4 options 
          let options = _getOptions(correctOption, countries);//array
          
          setCountries(()=> countries)
          setCorrectOption(()=>correctOption)
          setOptions(()=>options)
          setQuestionState(()=> QuestionStates.QUESTION)
          console.log(countries)
          console.log(correctOption)
          console.log(options)
          console.log(questionState)
          // this.setState({
          //   countries,
          //   correctOption,
          //   options,
          //   questionState: QuestionStates.QUESTION
          // });
          // console.log(countries)
        })
        .catch(console.warn);
    }, []
  )

  const onGuess = (answer)=> {
    // const { correctOption } = this.state;
    let questionState = answer === correctOption
      ? QuestionStates.ANSWER_CORRECT
      : QuestionStates.ANSWER_WRONG;
    setCorrectOption({ questionState });
  }

  const nextQuestion = () =>{
    // const { countries } = this.state;
    let correctOption = Math.floor(Math.random() * countries.length);
    let options = _getOptions(correctOption, countries);
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
    let options = [correctOption];
    let tries = 0;
    while (options.length < 4 && tries < 15) {
      let option = Math.floor(Math.random() * countries.length);
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