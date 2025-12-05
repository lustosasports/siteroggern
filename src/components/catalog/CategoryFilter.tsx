import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CATEGORIES = [
  { id: "campo", label: "CAMPO" },
  { id: "futsal", label: "FUTSAL" },
  { id: "society", label: "SOCIETY" },
  { id: "caneleiras", label: "CANELEIRAS" },
  { id: "bolsas", label: "BOLSAS" },
];

export const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  const selectedLabel = CATEGORIES.find(c => c.id === selectedCategory)?.label;

  return (
    <div className="bg-card rounded-xl p-4 sm:p-6 shadow-lg ring-1 ring-border/50">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          Filtrar por Categoria
        </h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategorySelect(null)}
            className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground min-h-[40px] px-2 sm:px-3"
          >
            <X className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Limpar</span>
          </Button>
        )}
      </div>
      
      {/* Mobile: scrollable horizontal, Desktop: wrap */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap -mx-1 px-1 sm:mx-0 sm:px-0 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(selectedCategory === category.id ? null : category.id)}
            className="font-medium transition-all duration-200 active:scale-95 sm:hover:scale-105 min-h-[44px] px-4 whitespace-nowrap flex-shrink-0 text-sm"
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      {selectedCategory && selectedLabel && (
        <div className="mt-3 sm:mt-4 flex items-center gap-2">
          <span className="text-xs sm:text-sm text-muted-foreground">Filtrando por:</span>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm py-1">
            {selectedLabel}
            <button
              onClick={() => onCategorySelect(null)}
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
