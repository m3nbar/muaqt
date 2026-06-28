export default function AdPlaceholder({ className = "", label = "Advertisement" }: { className?: string; label?: string }) {
  return (
    <div
      className={`glass rounded-xl flex items-center justify-center text-text-muted text-sm ${className}`}
      style={{ minHeight: "90px" }}
    >
      <div className="text-center p-4">
        <div className="text-xs uppercase tracking-wider opacity-40 mb-1">{label}</div>
        <div className="text-xs opacity-20">AdSense Placeholder</div>
      </div>
    </div>
  );
}
