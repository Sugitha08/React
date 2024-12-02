import React from 'react'

//button content
export const Example={
  Component:{
    title:'Components',
    description:  'Components are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
  },
  JSX:{
    title:'JSX',
    description:  'JSX are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
  },
  Props:{
    title:'props',
    description:  'props are the building blocks of React applications. A component is a self-contained module (HTML + optional CSS + JS) that renders some output.',
  }
}

function TabButton({children,onselect,isSelected}) {
  return (
    <>
    <button onClick={onselect} className={isSelected ? 'active' : undefined} id='button'>{children}</button>
    </>
  )
}

export default TabButton