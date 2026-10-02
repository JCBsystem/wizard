import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function App() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 p-4">
      <Progress value={10} aria-label="Quiz progress" />
      <Card>
        <CardHeader>
          <CardTitle>Let's find your plan</CardTitle>
          <CardDescription>A few quick questions, then book a consult.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Quiz coming soon.
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">Start</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
