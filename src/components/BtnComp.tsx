import React from 'react'; // we need this to make JSX compile

// import '../style.module.css'
// import cs from '../style.module.css'

type BtnProps = {
  name: string,
  url: string
}

export const Btn = ({ name, url }: BtnProps) => <aside className="button-container">
  <a href={ url } className="btn">{ name }</a>
</aside>

// const el = <Card title="Welcome!" paragraph="To this example" />