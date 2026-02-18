import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const logo = { url: "/", src: "/logo.png", alt: "logo", title: "MEDI STORE" };

  return (
    <Link
      href={logo.url}
      className="flex items-center gap-2 group transition-opacity hover:opacity-90"
    >
      <Image
        src={logo.src}
        className="dark:invert"
        width={32}
        height={32}
        alt={logo.alt}
      />
      <span className="text-lg font-black tracking-tighter bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        {logo.title}
      </span>
    </Link>
  );
}
