import './App.css'
import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useReducer,
} from 'react'

// #region useContext
// useContext - це механізм для передачі даних вниз по дереву компонентів без необхідності передавати пропси на кожному рівні. Це може полегшити передачу даних, таких як мова, авторизація або тема, через ваше додаток, яка може користуватися в будь-якому дочірньому компоненті.

// const MyContext = createContext(defaultValue);
// defaultValue - це значення, яке буде використовуватися тоді, коли немає співпадінь для Provider в дереві компонентів, можна використовувати null. Значення за замовчуванням ніколи змінюється. Provider - це компонент, який приймає значення і передає його вниз по дереву компонентів. Якщо ви використовуєте React Redux, ви вже використовуєте Provider.
// <MyContext.Provider value={/* some value */}>
//   <MyComponent />
// </MyContext.Provider>
// value - це значення, яке буде доступне для споживачів в дереві компонентів, які підписалися на цей контекст. Вони отримають поточне значення контексту, коли вони рендеряться. Поточне значення контексту залежить від найближчого <MyContext.Provider> в дереві компонентів.
// -----------------------------------------
// const value = useContext(MyContext);
// useContext - це хук, який приймає контекст і повертає поточне значення контексту для цього контексту. Він дозволяє компонентам читати значення контексту і підписуватися на зміни контексту.
// #endregion

const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
}

const ThemeContext = createContext(null)

const THEME_ACTION_TYPE = {
  TOGGLE: 'toggle',
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTION_TYPE.TOGGLE:
      return state === THEME_TYPE.LIGHT ? THEME_TYPE.DARK : THEME_TYPE.LIGHT
    default:
      return state
  }
}

function App() {
  const [currentTheme, setTheme] = useState(THEME_TYPE.LIGHT)

  const [state, dispatch] = useReducer(themeReducer, THEME_TYPE.LIGHT)

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === THEME_TYPE.LIGHT) {
        return THEME_TYPE.DARK
      } else {
        return THEME_TYPE.LIGHT
      }
    })
  }

  const theme = useMemo(
    () => ({
      value: currentTheme,
      toggle: handleChangeTheme,
    }),
    [currentTheme],
  )

  const changeTheme = useMemo(
    () => ({
      value: state,
      toggle: () => dispatch({ type: THEME_ACTION_TYPE.TOGGLE }),
    }),
    [state],
  )

  // const themeChange = useContext(ThemeContext) - це пишеться в компоненті, де ми хочемо використати контекст, якомусь дочірньому компоненті, який знаходиться в дереві компонентів вище, ніж ThemeContext.Provider

  console.log('Theme', theme)

  return (
    <div className='App'>
      <ThemeContext.Provider value={changeTheme}>
        <header
          className='App-header'
          style={{
            background:
              changeTheme.value === THEME_TYPE.DARK ? 'black' : 'white',
            color: changeTheme.value === THEME_TYPE.DARK ? 'white' : 'black',
          }}
        >
          <h1>useContext</h1>
          <button onClick={changeTheme.toggle}>Change theme</button>
        </header>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
