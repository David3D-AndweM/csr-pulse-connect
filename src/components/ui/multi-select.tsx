import * as React from "react"
import { X } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Option = {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Option[]>(() => {
    return options.filter(option => value.includes(option.value))
  })

  React.useEffect(() => {
    setSelected(options.filter(option => value.includes(option.value)))
  }, [value, options])
  
  const handleSelect = (selectedOption: Option) => {
    const isSelected = selected.some(item => item.value === selectedOption.value)
    
    let updated: Option[]
    if (isSelected) {
      updated = selected.filter(item => item.value !== selectedOption.value)
    } else {
      updated = [...selected, selectedOption]
    }
    
    setSelected(updated)
    onChange(updated.map(option => option.value))
  }
  
  const handleRemove = (optionValue: string) => {
    const updated = selected.filter(item => item.value !== optionValue)
    setSelected(updated)
    onChange(updated.map(option => option.value))
  }
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && selected.length > 0) {
      const lastSelected = selected[selected.length - 1]
      handleRemove(lastSelected.value)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between h-auto min-h-10 ${selected.length > 0 ? "h-auto" : ""} ${className}`}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map(option => (
                <Badge variant="secondary" key={option.value} className="mr-1 mb-1">
                  {option.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemove(option.value)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search options..." onKeyDown={handleKeyDown} />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map(option => {
              const isSelected = selected.some(item => item.value === option.value)
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option)}
                >
                  <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${isSelected ? "bg-primary text-primary-foreground" : ""}`}>
                    {isSelected && "✓"}
                  </div>
                  {option.label}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
