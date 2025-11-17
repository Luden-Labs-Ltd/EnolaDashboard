import { Input } from "@components/shadowCDN/input";
import { Label } from "@components/shadowCDN/label";
import { useState } from "react";

interface InputFileProp {
  id: string;
  name: string;
  accept?: string; // New prop for specifying allowed file types
  multiType?: boolean; // New prop for specifying allowed file types
  onFileChange?: (file: File | null) => void; // Callback for file changes
  value?: string;
}

export const InputFile: React.FC<InputFileProp> = ({
  id,
  name,
  accept = ".xls,.xlsx,.csv", // Default to common spreadsheet formats
  multiType,
  onFileChange,
  value,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      // Validate file type
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const allowedExtensions = accept.split(',').map(ext => ext.trim().replace('.', ''));

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        setError(`Invalid file type. Allowed types: ${accept}`);
        onFileChange?.(null);
        event.target.value = ''; // Clear the input
        return;
      }

      setError(null);
      onFileChange?.(file);
    } else {
      onFileChange?.(null);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id}>{name}</Label>
      <Input
        id={id}
        multiple={multiType}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        value={value}
      />
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};