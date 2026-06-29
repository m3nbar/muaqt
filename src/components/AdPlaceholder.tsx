export default function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass rounded-xl flex items-center justify-center ${className}`}
      style={{ minHeight: "90px" }}
    >
    </div>
  );
}
