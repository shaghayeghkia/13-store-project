import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";

import styles from "./Layout.module.css";


function Layout({children}) {
  const state = useSelector((store) => store.cart);
  return (
   <>
   <header className={styles.header}>
    <Link to="/products">BotoShop</Link>
    <Link to="/checkout">
    <div>
    <PiShoppingCartBold />
    {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
    </div>
    </Link>
   </header>
   {children}
   <footer className={styles.footer}>
    <p>Developed by Milad with ❤️</p>
   </footer>
   </>
  )
}

export default Layout