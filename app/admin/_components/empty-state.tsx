type EmptyStateProps = {
  colSpan?: number;
};

export function EmptyState({ colSpan = 4 }: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center text-muted-foreground">
        Belum ada component.
      </td>
    </tr>
  );
}
