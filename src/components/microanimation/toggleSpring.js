import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import tw from 'tailwind.macro'

const ToggleSpring = () => {
  const [isToggled, setToggle] = useState(false)
  const fade = useSpring({
    color: isToggled ? 'tomato' : 'green',
    fontSize: isToggled ? '2rem' : '1rem',
  })

  return (
    <div>
      <pre css={tw`text-sm mb-2`}>toggleSpring.js</pre>
      <div css={tw`bg-gray-800 p-4 text-gray-200`}>
        <animated.p style={fade}>A 👏🏻 very 👏🏻 simple 👏🏻 toggle</animated.p>
        <button
          css={tw`mt-4 border py-1 px-4 border-gray-800 bg-gray-600 text-white text-sm uppercase`}
          onClick={() => setToggle(!isToggled)}
        >
          {isToggled ? 'Nice 🕶' : 'Push and see'}
        </button>
      </div>
    </div>
  )
}

export default ToggleSpring
