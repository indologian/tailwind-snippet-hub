export function Footer() {
  return (
    <footer className="border-t">
      <div
        className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        gap-3
        px-4
        py-8
        text-sm
        text-muted-foreground
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-6
        lg:px-8
      "
      >
        <p>© {new Date().getFullYear()} Tailwind Snippet</p>

        <p>Built with Next.js + Tailwind CSS</p>
      </div>
    </footer>
  );
}
