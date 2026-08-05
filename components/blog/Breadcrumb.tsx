import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-barlow text-xs uppercase tracking-widest text-[#888888]">
        <li>
          <Link href="/" className="hover:text-green transition-colors duration-200">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={12} className="text-[#888888]/60 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-green transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white truncate max-w-[250px] sm:max-w-md">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
