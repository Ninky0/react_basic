import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props.title)
  return (
    <header>
      <h1><a href="/" onClick={(event) => {

        //<a>태그를 클릭하면 페이지가 이동되는데, 페이지가 이동되지 않도록 하기 위해 preventDefault()처리.
        event.preventDefault();

        props.onChangeMode();

      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const lis = []

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {

        event.preventDefault();

        // 현재 a 태그 안에 있다. 태그의 속성으로 넘기는 값은 문자이다.
        // 숫자를 입력했다더라도 id값은 문자로 취급되므로,
        // 숫자로 형변환을 해줘야 한다.
        props.onChangeMod(Number(event.target.id));

      }}>
        {t.title}</a>
    </li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}


function App() {

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is...' }
  ]

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>
  } else if (mode === "READ") {

    let title, body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Article title={title} body={body}></Article>

  }

  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>

      <Nav topics={topics} onChangeMod={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>

      {content}

    </div>
  );
}

export default App;
