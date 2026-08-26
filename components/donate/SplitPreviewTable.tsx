import type { Allocation } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatINR } from "@/lib/format";

interface SplitPreviewTableProps {
  splits: Allocation[];
}

export function SplitPreviewTable({ splits }: SplitPreviewTableProps) {
  if (splits.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-100 bg-white p-8 text-center text-sm text-muted-foreground shadow-sm">
        Select an index and enter an amount to preview the split.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
      <div className="border-b border-stone-100 bg-stone-50 px-5 py-3">
        <h3 className="text-sm font-semibold text-foreground">Split Preview</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">NGO</TableHead>
            <TableHead className="text-right text-xs">Share</TableHead>
            <TableHead className="text-right text-xs">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splits.map((split) => (
            <TableRow key={split.ngo.id}>
              <TableCell>
                <p className="text-sm font-medium text-foreground">
                  {split.ngo.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {split.ngo.city}
                </p>
                <Progress
                  value={split.share * 100}
                  className="mt-1.5 h-1"
                  aria-label={`${split.ngo.name}: ${(split.share * 100).toFixed(1)}%`}
                />
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {(split.share * 100).toFixed(1)}%
              </TableCell>
              <TableCell className="text-right text-sm font-semibold text-foreground">
                {formatINR(split.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-stone-100 bg-stone-50 px-5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-sm font-bold text-foreground" aria-live="polite">
            {formatINR(splits.reduce((s, a) => s + a.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
