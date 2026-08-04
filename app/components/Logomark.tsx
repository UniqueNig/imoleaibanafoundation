import Image from "next/image";

export default function Logomark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.png"
      alt=""
      width={256}
      height={256}
      className={`${className} shrink-0 object-contain`}
    />
  );
}
