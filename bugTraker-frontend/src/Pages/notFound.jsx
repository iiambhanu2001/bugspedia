import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <Card className="max-w-md w-full text-center shadow-xl">
        <CardContent className="pt-10 pb-8 space-y-6">
          <div className="text-6xl font-bold text-primary">404</div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>
          </div>

          <Button
            className="w-full"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}