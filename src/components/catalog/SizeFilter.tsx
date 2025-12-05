import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type FilterType = "numeracao" | "tamanho";

interface SizeFilterProps {
  selectedSize: string | null;
  onSizeSelect: (size: string | null) => void;
  filterType: FilterType;
}

const SHOE_SIZES = ["37", "38", "39", "40", "41", "42", "43", "44"];
const SHIN_GUARD_SIZES = ["PEQUENA", "GRANDE"];

export const SizeFilter = ({ selectedSize, onSizeSelect, filterType }: SizeFilterProps) => {
  const sizes = filterType === "numeracao" ? SHOE_SIZES : SHIN_GUARD_SIZES;
  const title = filterType === "numeracao" ? "Filtrar por Numeração" : "Filtrar por Tamanho";
  const badgeLabel = filterType === "numeracao" ? `Tamanho ${selectedSize}` : selectedSize;

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 shadow-lg ring-1 ring-border/50">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          {title}
        </h3>
        {selectedSize && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSizeSelect(null)}
            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground min-h-[40px] px-2 sm:px-3"
          >
            <X className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Limpar</span>
          </Button>
        )}
      </div>
      
      {/* Mobile: scrollable horizontal for many items, Desktop: wrap */}
      <div className={`flex gap-2 ${filterType === "numeracao" ? "overflow-x-auto pb-2 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0 scrollbar-hide" : ""} sm:flex-wrap`}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeSelect(selectedSize === size ? null : size)}
            className="min-w-[48px] min-h-[44px] font-medium transition-all duration-200 active:scale-95 sm:hover:scale-105 flex-shrink-0 text-sm"
          >
            {size}
          </Button>
        ))}
      </div>
      
      {selectedSize && (
        <div className="mt-3 sm:mt-4 flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">Filtrando por:</span>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm py-1">
            {badgeLabel}
            <button
              onClick={() => onSizeSelect(null)}
              className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors min-w-[20px] min-h-[20px] flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
};
