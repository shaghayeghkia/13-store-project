import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";

import { shortenText } from "../helpers/helper";
import { useCart } from "../context/CartContext";

import styles from "./Card.module.css";

function card({data}) {
 const {id, title, image, price} = data;

const [state, dispatch]= useCart();
// console.log(result);

const clickHandler = () => {
  dispatch({type: "add", payload:data});
}

  return (
    <div className={styles.card}>
    <img src={image} alt={title} />
    <h3>{shortenText(title)}</h3>
    <p>{price}$</p>
    <div className={styles.actions}>
      <Link to={`/products/${id}`}>
      <TbListDetails />
      </Link>
      <div>
      <button onClick={clickHandler}>
        <TbShoppingBagCheck />
        </button>
      </div>
    </div>
    </div>
  )
}

export default card