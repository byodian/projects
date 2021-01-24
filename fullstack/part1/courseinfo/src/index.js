import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
);

const Part = (props) => (
  <>
    <p>{props.part} {props.exercise}</p>
  </>
)

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.part1} exercise={props.exercise1}/>
      <Part part={props.part2} exercise={props.exercise2}/>
      <Part part={props.part3} exercise={props.exercise3}/>
    </>
  )
}

const Total = (props) => (
  <p>Number of exercise {props.exercise1 + props.exercise2 + props.exercise3}</p>
);

const App = () => {
  const course = 'Half stack application development';
  const part1 = 'Fundamentals of React';
  const exercise1 = 10;
  const part2 = 'Using props to pass data';
  const exercise2 = 7;
  const part3 = 'State of a component';
  const exercise3 = 14;

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1}
        part2={part2}
        part3={part3}
        exercise1={exercise1}
        exercise2={exercise2}
        exercise3={exercise3}
      />
      <Total 
        exercise1={exercise1}
        exercise2={exercise2}
        exercise3={exercise3}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));