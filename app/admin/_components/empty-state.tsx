// app/admin/_components/empty-state.tsx
import { PackageX, SearchX } from "lucide-react";

export function EmptyState({ isSearching = false }: { isSearching?: boolean }) {
  return (
    <tr>
      <td colSpan={4} className="px-6 py-16">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          {isSearching ? (
            <>
              <SearchX className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Tidak ada hasil yang cocok</p>
              <p className="text-xs text-muted-foreground">
                Coba kata kunci lain atau ubah filter sort.
              </p>
            </>
          ) : (
            <>
              <PackageX className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Belum ada component</p>
              <p className="text-xs text-muted-foreground">
                Tambahkan component pertama Anda.
              </p>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
