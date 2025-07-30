import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorMessageProps {
  title?: string
  message: string
  variant?: "default" | "destructive"
}

export default function ErrorMessage({ title = "Error", message, variant = "destructive" }: ErrorMessageProps) {
  return (
    <Alert variant={variant} className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
