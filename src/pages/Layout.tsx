import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <>
        <NavBar/>
        <Outlet/> {/*在 React Router 里是一个 占位符组件，用来渲染 嵌套路由（子路由）对应的组件。  */}
    </>
  )
}

export default Layout