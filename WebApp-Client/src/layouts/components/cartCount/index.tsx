export default function CartCount({ count }: { count: number }) {
  return (
    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-xs bg-error rounded-full text-white">
      {count}
    </span>
  );
}
