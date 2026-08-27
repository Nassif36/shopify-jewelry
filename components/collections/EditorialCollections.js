import Image from "next/image";
import Link from "next/link";
import { collectionEditorial } from "@/data/fallback-products";

export function EditorialCollections() {
  return (
    <section className="editorialCollections">
      <header className="editorialHeader">
        <p className="eyebrow">Find your piece</p>
        <h2>Made for the<br /><em>everyday ritual.</em></h2>
        <p>Small treasures designed to be worn often, loved deeply, and kept close.</p>
      </header>
      <div className="collectionMosaic">
        {collectionEditorial.map((collection, index) => (
          <Link className={`collectionTile tile${index + 1}`} href={`/collections/${collection.handle}`} key={collection.handle}>
            <Image src={collection.image} alt="" fill sizes="(max-width: 767px) 85vw, 50vw" />
            <span className="collectionNumber">0{index + 1}</span>
            <div>
              <p>{collection.eyebrow}</p>
              <h3>{collection.title}</h3>
              <span>Discover <i>→</i></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
