import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { items } from "@/constants/forms"
import { Check, ChevronDown } from "lucide-react"
import { EditorBubbleItem, useEditor } from "novel"
import React from "react"

type Props = {
    open: boolean
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

const NodeSelector = ({ onOpenChange, open }: Props) => {
    const { editor } = useEditor()
    if (!editor) return null
    const activeItem = items.filter((i) => i.isActive(editor)).pop() ?? {
        name: "Multiple",
    }
    return (
        <Popover modal={true} open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger
            asChild
            className='gap-2 rounded-none border-none hover:bg-accent focus:ring-0'>
            <Button variant='ghost' className='gap-2'>
              <span className='whitespace-nowrap text-sm'>{activeItem.name}</span>
              <ChevronDown className='h-4 w-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={5} align='start' className='w-48 p-1'>
            {items.map((item, index) => (
              <EditorBubbleItem
                key={index}
                onSelect={(editor) => {
                  item.command(editor);
                  onOpenChange(false);
                }}
                className='flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent'>
                <div className='flex items-center space-x-2'>
                  <div className='rounded-sm border p-1'>
                    <item.icon className='h-3 w-3' />
                  </div>
                  <span>{item.name}</span>
                </div>
                {activeItem.name === item.name && <Check className='h-4 w-4' />}
              </EditorBubbleItem>
            ))}
          </PopoverContent>
        </Popover>
      );
}

export default NodeSelector
