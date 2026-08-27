import Link from "next/link";

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        {items.map((item, index) => (
          <li key={item.label}>
            <span aria-hidden="true">/</span>
            {item.href && index < items.length - 1
              ? <Link href={item.href}>{item.label}</Link>
              : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
