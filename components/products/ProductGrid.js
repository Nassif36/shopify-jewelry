"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, title, showControls = true }) {
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);

  const types = ["all", ...new Set(products.map((product) => product.productType.toLowerCase()))];
  const shown = useMemo(() => {
    const filtered = type === "all"
      ? [...products]
      : products.filter((product) => product.productType.toLowerCase() === type);
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "new") filtered.sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
    return filtered;
  }, [products, type, sort]);

  return (
    <section className="catalogSection">
      {title && (
        <div className="sectionHeading">
          <div><p className="eyebrow">Objects of affection</p><h2>{title}</h2></div>
          <p>{shown.length} pieces</p>
        </div>
      )}
      {showControls && (
        <div className="catalogControls">
          <div className="filterTabs" role="group" aria-label="Filter products">
            {types.map((item) => (
              <button className={item === type ? "active" : ""} onClick={() => { setType(item); setVisible(8); }} key={item}>
                {item}
              </button>
            ))}
          </div>
          <label>
            <span className="srOnly">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
            </select>
          </label>
        </div>
      )}
      {shown.length ? (
        <>
          <div className="productGrid">
            {shown.slice(0, visible).map((product, index) => (
              <ProductCard product={product} priority={index < 4} key={product.id} />
            ))}
          </div>
          {visible < shown.length && (
            <button className="loadMore" onClick={() => setVisible(visible + 8)}>
              Load more <span>{visible} of {shown.length}</span>
            </button>
          )}
        </>
      ) : (
        <div className="emptyState"><h3>No pieces found</h3><p>Try another collection or filter.</p></div>
      )}
    </section>
  );
}
