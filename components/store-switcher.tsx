"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@/lib/generated/prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon, PlusIcon, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
type PopoverTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps{
  items: Store[];
}

export default function StoreSwitcher({ className, items = []}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find((item)=> item.value === params.storeId)

  const [open,setOpen] = useState(false);
  
  const onStoreSelect = (store: {value: string, label: string}) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" role='combobox' aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between", className)}>
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label || "Select a store"}
          <ChevronsUpDownIcon className="w-4 h-4 ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command> 
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem key={item.value} value={item.value} className="text-sm">
                  <StoreIcon className="w-4 h-4 mr-2" />
                  {item.label}
                  <CheckIcon className={cn("w-4 h-4 ml-auto", currentStore?.value === item.value ? "opactity-100" : "opactity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No store found.</CommandEmpty>
          </CommandList>
          <CommandSeparator />
          <CommandList>
          <CommandGroup>
            <CommandItem onSelect={() => {setOpen(false); storeModal.onOpen()}}>
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Create Store
            </CommandItem>
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}