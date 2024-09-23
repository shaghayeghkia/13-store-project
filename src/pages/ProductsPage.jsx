import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { fetchProducts } from "../features/product/productSlice";
import { useProducts } from "../context/ProductContext";

import { filterproducts, getInitialQuery, searchProducts } from "../helpers/helper";
import styles from "./productsPage.module.css";


function ProductsPage() {
  // const products=useProducts();
  const dispatch= useDispatch();
  const {products, loading} = useSelector(store => store.product);
  // const store = useSelector(store => store.product);
  // console.log(store);
  // const products=[];

  const [displayed, setDisplayed]=useState([]);
const [search, setSearch]=useState("");
const [query, setQuery]=useState({});

const [searchParams, setSearchParams]=useSearchParams();

useEffect(() => {
dispatch(fetchProducts());
},[]);

useEffect(()=> {
setDisplayed(products);
setQuery(getInitialQuery(searchParams));
// setQuery(query);
},[products]);

useEffect(()=>{
  setSearchParams(query);
  setSearch(query.search|| "");
  let finalProducts=searchProducts(products, query.search);
  finalProducts=filterproducts(finalProducts, query.category);
  setDisplayed(finalProducts);
},[query]);

  return ( 
 <>
 <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
    <div className={styles.container}>
      <div className={styles.products}>
        {loading && <Loader />}
        {displayed.map((p) => (
         <Card key={p.id} data={p} />
        ))}
      </div>
<Sidebar query={query} setQuery={setQuery} />
    </div>
 </>
  )
}

export default ProductsPage