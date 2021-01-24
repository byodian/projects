import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
);

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.part.name} {props.part.exercise}</p>
    </>
  );
}

const Content = (props) => {
  console.log(props);
  console.log(props.course.parts[0])
  return (
    <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </>
  )
}

const Total = (props) => (
  <p>Number of exercise {props.course.parts[0].exercise + props.course.parts[1].exercise + props.course.parts[2].exercise}</p>
);

const App = () => {
  const course = {
    name: 'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      
      {
        name: 'Using props to pass data',
        exercise: 7
      },
  
      {
        name: 'State of a component',
        exercise: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));