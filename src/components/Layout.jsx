import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">ホーム</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">お問い合わせ</Link>
          </li>
          <li>
            <Link to="/card-game">カードゲーム</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}