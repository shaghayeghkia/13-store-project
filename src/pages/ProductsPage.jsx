import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import { useProducts } from "../context/ProductContext";

import { filterproducts, getInitialQuery, searchProducts } from "../helpers/helper";
import styles from "./productsPage.module.css";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/Sidebar";



function ProductsPage() {
  const products=useProducts();

  const [displayed, setDisplayed]=useState([]);
const [search, setSearch]=useState("");
const [query, setQuery]=useState({});

const [searchParams, setSearchParams]=useSearchParams();

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
        {!displayed.length && <Loader />}
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