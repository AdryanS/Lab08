'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import data from '@/data.json'

interface ManualRowProps {
  label: string
  categoryKey: string
  value: string
  onSelect: (key: string, value: string) => void
}

export function ManualRow({ label, categoryKey, value, onSelect }: ManualRowProps) {
  const options = (data as Record<string, string[]>)[categoryKey] || []

  return (
    <div className="flex h-11 items-center justify-between border border-[#2A2A2A] bg-[#1A1A1A] px-4">
      <span className="font-[Geist_Mono] text-[10px] tracking-[2px] text-[#666666]">{label}</span>
      <Select value={value} onValueChange={(v) => onSelect(categoryKey, v)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
