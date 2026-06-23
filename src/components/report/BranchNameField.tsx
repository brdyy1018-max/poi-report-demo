import { useState } from 'react';
import { FieldLabel, TextInput } from '../ui/FormFields';

interface BranchNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
}

/** Optional branch name — collapsed as a subtle "+ Add branch name" link */
export function BranchNameField({ value, onChange, inputClassName }: BranchNameFieldProps) {
  const [expanded, setExpanded] = useState(value.trim().length > 0);

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="text-[14px] text-neutral-400 active:text-neutral-600"
      >
        + Add branch name
      </button>
    );
  }

  return (
    <div>
      <FieldLabel label="Branch name" hint="e.g. Beijing Sanlitun, Shanghai Jing'an" />
      <TextInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          if (!value.trim()) setExpanded(false);
        }}
        placeholder="Enter branch name (optional)"
        className={inputClassName}
        autoFocus
      />
    </div>
  );
}
