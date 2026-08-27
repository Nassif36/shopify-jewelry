import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const groups = {
  Shop: [
    ["New arrivals", "/shop?sort=new"],
    ["Rings", "/collections/rings"],
    ["Necklaces", "/collections/necklaces"],
    ["Earrings", "/collections/earrings"],
    ["Bracelets", "/collections/bracelets"]
  ],
  Help: [
    ["Shipping", "/pages/shipping"],
    ["Returns", "/pages/returns"],
    ["Contact", "/pages/contact"],
    ["FAQ", "/pages/faq"]
  ]
};

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerIntro">
        <p className="eyebrow">Stay a little longer</p>
        <h2>Jewelry notes,<br /><em>occasionally.</em></h2>
        <NewsletterForm />
      </div>
      <div className="footerGrid">
        <div className="footerBrand">
          <Link className="wordmark" href="/">Maison Lune</Link>
          <p>Quiet objects to mark<br />the moments in between.</p>
        </div>
        {Object.entries(groups).map(([title, links]) => (
          <div className="footerLinks" key={title}>
            <h3>{title}</h3>
            {links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
        ))}
        <div className="footerLinks">
          <h3>Follow</h3>
          <a href="https://instagram.com">Instagram</a>
          <a href="https://pinterest.com">Pinterest</a>
          <a href="https://tiktok.com">TikTok</a>
        </div>
      </div>
      <div className="footerBottom">
        <span>© {new Date().getFullYear()} Maison Lune</span>
        <span>USD · Visa · Mastercard · Amex</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
