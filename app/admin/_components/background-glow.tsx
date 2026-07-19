export function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="
          absolute
          left-1/2
          top-[-200px]
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-3xl
          dark:bg-primary/20
        "
      />
    </div>
  );
}
