import {useState} from "react";
import {BiSolidShow} from "react-icons/bi";
import {BiSolidHide} from "react-icons/bi";

export const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(true)
  const styles = {
    container: 'min-h-screen flex items-center justify-center bg-gray-100',
    card: 'max-w-md w-full space-y-8 z-10',
    title: 'mb-6 text-center text-3xl font-semibold text-gray-900',
    input: 'appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm duration-150',
    button: 'group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    hideShowIcon: 'absolute top-4 right-4 text-[1.5rem] hover:cursor-pointer opacity-60 hover:opacity-90 duration-150 z-40'
  };

  const handleSubmit = (event): void => {
    event.preventDefault()
    let data = {
      username, password
    }
    console.log(data.username, data.password)
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign In</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='my-10'>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                name="username"
                type="text"
                autoComplete="username"
                required
                className={styles.input}
                placeholder="Username"/>
            </div>
            <div className='my-10 relative'>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                type={`${show ? 'password' : 'text'}`}
                autoComplete="current-password"
                required
                className={`${styles.input}`}
                placeholder="Password"/>
              {show
                ? <BiSolidShow onClick={() => setShow(false)} className={styles.hideShowIcon}/>
                : <BiSolidHide onClick={() => setShow(true)} className={styles.hideShowIcon}/>
              }
            </div>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
