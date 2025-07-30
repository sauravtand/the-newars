import { FileQuestion, Plus, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  type: "posts" | "works" | "general"
  title?: string
  description?: string
  showAction?: boolean
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  type,
  title,
  description,
  showAction = false,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const getDefaultContent = () => {
    switch (type) {
      case "posts":
        return {
          icon: <BookOpen className="h-16 w-16 text-red-300" />,
          title: title || "No Cultural Posts Yet",
          description:
            description ||
            "Start sharing the rich heritage of Newari culture! Create your first post to showcase festivals, traditions, food, and customs.",
          actionLabel: actionLabel || "Create First Post",
          actionHref: actionHref || "/admin",
        }
      case "works":
        return {
          icon: <Award className="h-16 w-16 text-orange-300" />,
          title: title || "No Works Documented",
          description:
            description ||
            "Showcase the amazing achievements and contributions of The Newars community. Add your first work to highlight your impact.",
          actionLabel: actionLabel || "Add First Work",
          actionHref: actionHref || "/admin",
        }
      default:
        return {
          icon: <FileQuestion className="h-16 w-16 text-gray-300" />,
          title: title || "No Content Available",
          description: description || "There's no content to display at the moment. Check back soon!",
          actionLabel: actionLabel || "Go Home",
          actionHref: actionHref || "/",
        }
    }
  }

  const content = getDefaultContent()

  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
      <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="mb-6">{content.icon}</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-3">{content.title}</h3>
        <p className="text-gray-500 mb-8 max-w-md leading-relaxed">{content.description}</p>
        {showAction && content.actionHref && (
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <a href={content.actionHref}>
              <Plus className="mr-2 h-4 w-4" />
              {content.actionLabel}
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
